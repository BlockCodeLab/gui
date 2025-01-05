import { useCallback } from 'preact/hooks';
import { batch } from '@preact/signals';
import { isMac, putProject, openProjectFromComputer, saveProjectToComputer } from '@blockcode/utils';
import { useProjectContext, setAlert, openPromptModal, openUserStorage, setFile, Keys } from '@blockcode/core';

import { Text, MenuSection, MenuItem } from '@blockcode/core';
import styles from './menu-bar.module.css';

const savedAlert = () =>
  setAlert(
    {
      message: (
        <Text
          id="gui.menubar.saved"
          defaultMessage="Saved to local storage."
        />
      ),
    },
    2000,
  );

export function FileMenu({ onNew, onOpen, onSave, onThumb, children }) {
  const { meta, key, name, files, assets, modified } = useProjectContext();

  const getProjectData = useCallback(async () => {
    const data = await onSave(files.value, assets.value);
    data.meta = Object.assign(data.meta ?? {}, {
      editor: meta.value.editor,
      version: meta.value.version,
    });
    data.name = name.value;
    return data;
  }, [onSave]);

  // 保存到浏览器 IndexedDB
  // TODO: 保存到服务器，获取 ID
  const handleSave = useCallback(async () => {
    const data = await getProjectData();
    data.key = key.value;
    const newKey = await putProject(data, onThumb);

    batch(() => {
      // 保存成功后如果本地 Key 不一致则更新
      if (data.key !== newKey) {
        setFile({ key: newKey });
      }

      modified.value = 0;
    });

    savedAlert();
  }, []);

  // 保存项目到计算机本地文件夹
  const handleSaveToComputer = useCallback(async () => {
    const data = await getProjectData();
    console.log(data);
    await saveProjectToComputer(data);

    modified.value = 0;

    // Electron 上不需要提示已保存
    if (window.electron) return;
    savedAlert();
  }, []);

  // 从计算机打开项目
  // TODO: 从服务器获取项目
  const handleOpenFromComputer = useCallback(async () => {
    const data = await openProjectFromComputer();
    await onOpen(data);
  }, []);

  return (
    <>
      <MenuSection>
        <MenuItem
          className={styles.menuItem}
          label={
            <Text
              id="gui.menubar.file.newProject"
              defaultMessage="New"
            />
          }
          hotkey={[isMac ? Keys.COMMAND : Keys.CONTROL, Keys.N]}
          onClick={onNew}
        />
      </MenuSection>

      <MenuSection>
        <MenuItem
          className={styles.menuItem}
          label={
            <Text
              id="gui.menubar.file.openProject"
              defaultMessage="Open"
            />
          }
          hotkey={[isMac ? Keys.COMMAND : Keys.CONTROL, Keys.O]}
          onClick={openUserStorage}
        />

        <MenuItem
          className={styles.menuItem}
          label={
            <Text
              id="gui.menubar.file.saveProject"
              defaultMessage="Save"
            />
          }
          hotkey={[isMac ? Keys.COMMAND : Keys.CONTROL, Keys.S]}
          onClick={handleSave}
        />
      </MenuSection>

      <MenuSection>
        <MenuItem
          className={styles.menuItem}
          label={
            <Text
              id="gui.menubar.file.uploadProject"
              defaultMessage="Load from your computer"
            />
          }
          onClick={handleOpenFromComputer}
        />

        <MenuItem
          className={styles.menuItem}
          label={
            <Text
              id="gui.menubar.file.downloadProject"
              defaultMessage="save to your computer"
            />
          }
          onClick={handleSaveToComputer}
        />
      </MenuSection>

      {children}
    </>
  );
}