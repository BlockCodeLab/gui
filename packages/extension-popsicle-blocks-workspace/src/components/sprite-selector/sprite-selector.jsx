import { useEdit, useLocale, exportFile } from '@blockcode/core';
import { IconSelector, ActionButton } from '@blockcode/ui';
import SpriteInfo from '../sprite-info/sprite-info';

import styles from './sprite-selector.module.css';
import spriteIcon from './icon-sprite.svg';
import surpriseIcon from './icon-surprise.svg';
import searchIcon from './icon-search.svg';
import paintIcon from './icon-paint.svg';
import fileUploadIcon from './icon-file-upload.svg';

export default function SpriteSelector({ stageSize }) {
  const { getText } = useLocale();
  const { fileList, selectedIndex, addFile, openFile, deleteFile } = useEdit();

  return (
    <div className={styles.spriteSelector}>
      <SpriteInfo stageSize={stageSize} />

      <IconSelector
        items={fileList.map((file, index) => ({
          ...file,
          icon: getFileType(file.name),
          order: file.order || index,
          contextMenu: [
            [
              {
                label: getText('popsicle.blocks.contextMenu.duplicate', 'duplicate'),
                onClick: () => {},
              },
              {
                label: getText('popsicle.blocks.contextMenu.export', 'export'),
                onClick: () => {},
              },
            ],
            [
              {
                label: getText('popsicle.blocks.contextMenu.delete', 'delete'),
                className: styles.deleteMenuItem,
                onClick: () => {},
              },
            ],
          ],
        }))}
        selectedIndex={selectedIndex}
        onSelect={openFile}
        onDelete={deleteFile}
      />

      <ActionButton
        className={styles.addButton}
        icon={spriteIcon}
        tooltip={getText('popsicle.blocks.actionButton.sprite', 'Choose a Sprite')}
        onClick={() => {}}
        moreButtons={[
          {
            icon: fileUploadIcon,
            tooltip: getText('popsicle.blocks.actionButton.uploadSprite', 'Upload Sprite'),
            fileAccept: 'image/*,audio/*,video/*,text/*',
            fileMultiple: true,
            onFileChange: () => {},
          },
          {
            icon: surpriseIcon,
            tooltip: getText('popsicle.blocks.actionButton.surprise', 'Surprise'),
            onClick: () => {},
          },
          {
            icon: paintIcon,
            tooltip: getText('popsicle.blocks.actionButton.paint', 'Paint'),
            onClick: () => {},
          },
          {
            icon: searchIcon,
            tooltip: getText('popsicle.blocks.actionButton.sprite', 'Choose a Sprite'),
            onClick: () => {},
          },
        ]}
      />
    </div>
  );
}
