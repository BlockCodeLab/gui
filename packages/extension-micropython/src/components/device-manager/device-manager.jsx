import { useLocale, useEdit } from '@blockcode/core';
import { MicroPythonBoard } from '../../lib/pyboard';

import filters from './filters.yaml';

import styles from './device-manager.module.css';
import iconNotReady from './status-not-ready.svg';
import iconReady from './status-ready.svg';

export default function DeviceManager() {
  const { getText } = useLocale();
  const { device, connectDevice } = useEdit();

  const deviceMessage = device
    ? getText('micropython.deviceManager.ready', 'Ready')
    : getText('micropython.deviceManager.notReady', 'Not Ready');

  const handleConnect = async () => {
    if (device) {
      try {
        await device.disconnect();
      } catch (err) {
        console.error(err);
      }
      connectDevice(null);
    } else {
      const board = new MicroPythonBoard();
      try {
        await board.requestPort(filters);
        await board.connect();
        await board.stop();
        connectDevice(board);
      } catch (err) {
        console.error(err);
      }

      // Check if the board is connected
      const checkBoard = () =>
        setTimeout(async () => {
          if (board.connected) {
            checkBoard();
          } else {
            connectDevice(null);
          }
        }, 1000);
      checkBoard();
    }
  };

  return (
    <img
      className={styles.statusIcon}
      src={device ? iconReady : iconNotReady}
      alt={deviceMessage}
      title={deviceMessage}
      onClick={handleConnect}
    />
  );
}
