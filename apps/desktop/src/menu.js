const { app, Menu } = require('electron');

const isMac = process.platform === 'darwin';

Menu.setApplicationMenu(null);
