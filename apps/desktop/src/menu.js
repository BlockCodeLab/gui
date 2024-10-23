const { Menu } = require('electron');

const isMac = process.platform === 'darwin';

let menu = null;

if (isMac) {
  menu = Menu.buildFromTemplate([{ role: 'appMenu' }, { role: 'editMenu' }]);
}

Menu.setApplicationMenu(menu);
