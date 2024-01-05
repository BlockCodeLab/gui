import MicroPythonBoard from './pyboard';
import image16 from './image16';

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
    let { id: name, content } = file;
    if (file.type === 'text/x-python') {
      name += '.py';
    } else if (file.type.startsWith('image/')) {
      content = await image16(file.type, file.data);
    }
    console.log(name);
    await board.put(content, name, reporter);
    finished += 1 / len;
  }
  progress(100);
  await board.reset();
};
