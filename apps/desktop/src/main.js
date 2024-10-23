import { app, BrowserWindow, ipcMain } from 'electron';
import { resolve } from 'node:path';
import { serial } from './serial';
import './menu';

const appDirname = 'apps/desktop/dist';

// run this as early in the main process as possible
if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    webPreferences: {
      preload: resolve(appDirname, 'preload.js'),
    },
  });

  serial.setBrowserWindow(mainWindow);

  mainWindow.loadFile(resolve(appDirname, 'packaged/index.html'));

  if (DEVELOPMENT) {
    mainWindow.webContents.openDevTools();
  } else {
  }
};

app.whenReady().then(() => {
  ipcMain.on('serial:cancel', () => serial.cancel());
  ipcMain.on('serial:connect', (event, portId) => serial.connect(portId));

  createWindow();
});

app.on('window-all-closed', () => app.quit());
