import { Text } from '@blockcode/ui';

import FileMenu from './file-menu';
import EditMenu from './edit-menu';
import DeviceMenu from './device-menu';

import fileIcon from './icons/icon-file.svg';
import editIcon from './icons/icon-edit.svg';
import deviceIcon from './icons/icon-device.svg';

export default function makeMainMenu({
  deviceFilters,
  createDefaultProject,
  saveCurrentProject,
  downloadProjectToDevice,
}) {
  return [
    {
      icon: fileIcon,
      label: (
        <Text
          id="blocks.menu.file"
          defaultMessage="File"
        />
      ),
      Menu: ({ itemClassName, children }) => (
        <FileMenu
          itemClassName={itemClassName}
          onNew={createDefaultProject}
          onSave={saveCurrentProject}
        >
          {children}
        </FileMenu>
      ),
    },
    {
      icon: editIcon,
      label: (
        <Text
          id="blocks.menu.edit"
          defaultMessage="Edit"
        />
      ),
      Menu: ({ itemClassName, children }) => <EditMenu itemClassName={itemClassName}>{children}</EditMenu>,
    },
    {
      icon: deviceIcon,
      label: (
        <Text
          id="blocks.menu.device"
          defaultMessage="Device"
        />
      ),
      Menu: ({ itemClassName, children }) => (
        <DeviceMenu
          itemClassName={itemClassName}
          deviceFilters={deviceFilters}
          onDownload={downloadProjectToDevice}
        >
          {children}
        </DeviceMenu>
      ),
    },
  ];
}
