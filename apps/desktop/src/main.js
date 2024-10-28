import { app, BrowserWindow, ipcMain } from 'electron';
import { resolve } from 'node:path';
import { serial } from './serial';
import './menu';

const isMac = process.platform === 'darwin';

// run this as early in the main process as possible
if (require('electron-squirrel-startup')) app.quit();

const appDirname = 'apps/desktop/dist';
const winConfig = {
  width: 1360,
  height: 860,
  webPreferences: {
    preload: resolve(appDirname, 'preload.js'),
  },
};

if (isMac) {
  winConfig.titleBarStyle = 'hidden';
  winConfig.trafficLightPosition = { x: 8, y: 16 };
}

const createWindow = () => {
  const mainWindow = new BrowserWindow(winConfig);

  serial.setBrowserWindow(mainWindow);

  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.send('window:fullscreen', true);
  });
  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.send('window:fullscreen', false);
  });

  if (DEVELOPMENT) {
    mainWindow.loadFile(resolve(appDirname, '../../web/dist/index.html'));
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(resolve(appDirname, 'packaged/index.html'));
  }
};

app.whenReady().then(() => {
  ipcMain.on('serial:cancel', () => serial.cancel());
  ipcMain.on('serial:connect', (event, portId) => serial.connect(portId));

  createWindow();
});

app.on('window-all-closed', () => app.quit());
