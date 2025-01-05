import { Text, MenuSection, MenuItem } from '@blockcode/core';
import { FileMenu } from './file-menu';
import { EditMenu } from './edit-menu';
import styles from './menu-bar.module.css';

import fileIcon from './icons/icon-file.svg';
import editIcon from './icons/icon-edit.svg';

const mapMenuItems = (menu) => {
  if (menu?.menuItems) {
    return (
      <MenuSection>
        {menu.menuItems.map((item) => (
          <MenuItem
            className={styles.menuItem}
            label={item.label}
            onClick={item.onClick}
          />
        ))}
      </MenuSection>
    );
  }
  if (menu?.Menu) {
    const Menu = menu.Menu;
    return <Menu itemClassName={styles.menuItem} />;
  }
};

export function mergeMenus(editor, meta, onOpen) {
  const handleOpen = (projData) => onOpen(projData, meta.editor);

  const handelNew = async () => {
    const projData = JSON.parse(JSON.stringify(await editor.onNew()));
    if (!projData.meta) {
      projData.meta = meta;
    }
    if (!projData.meta.editor) {
      projData.meta.editor = meta.editor;
      projData.meta.version = meta.version;
    }
    handleOpen(projData, meta.editor);
  };

  return [
    {
      icon: fileIcon,
      label: (
        <Text
          id="gui.menubar.file"
          defaultMessage="File"
        />
      ),
      Menu: () => (
        <FileMenu
          onNew={handelNew}
          onOpen={handleOpen}
          onSave={editor.onSave}
          onThumb={editor.onThumb}
        >
          {mapMenuItems(editor.menuItems?.find?.((item) => item.id === 'file'))}
        </FileMenu>
      ),
    },
    {
      icon: editIcon,
      label: (
        <Text
          id="gui.menubar.edit"
          defaultMessage="Edit"
        />
      ),
      Menu: () => (
        <EditMenu
          onUndo={editor.onUndo}
          onRedo={editor.onRedo}
          onEnableUndo={editor.onEnableUndo}
          onEnableRedo={editor.onEnableRedo}
        >
          {mapMenuItems(editor.menuItems?.find?.((item) => item.id === 'edit'))}
        </EditMenu>
      ),
    },
  ].concat(editor.menuItems?.filter?.((item) => item.id !== 'file' && item.id !== 'edit') ?? []);
}
