import MicroPythonBoard from './pyboard';
import imageBase64 from './image-base64';

export const connectDevice = async (filters, setDevice) => {
  const board = new MicroPythonBoard();
  await board.requestPort(filters);
  await board.connect();
  await board.stop();
  setDevice(board);

  // Check the device is connect state
  const checkDevice = () =>
    setTimeout(async () => {
      if (board.connected) {
        checkDevice();
      } else {
        setDevice(null);
      }
    }, 1000);
  checkDevice();

  return board;
};

export const disconnectDevice = async (board, setDevice) => {
  await board.disconnect();
  setDevice(null);
};

export const downloadDevice = async (board, files, progress) => {
  await board.stop();

  const len = files.length;
  let finished = 0;
  const reporter = (x) => {
    progress(parseInt((finished + (1 / len) * (x / 100)) * 100));
  };
  for (const file of files) {
    let { id: filePath, content } = file;
    if (file.type === 'text/x-python') {
      filePath += '.py';
    } else if (file.type.startsWith('image/') && !content) {
      content = await imageBase64(file.type, file.data);
    }
    await board.put(content || '', filePath, reporter);
    finished += 1 / len;
  }
  progress(100);
  await board.reset();
};
