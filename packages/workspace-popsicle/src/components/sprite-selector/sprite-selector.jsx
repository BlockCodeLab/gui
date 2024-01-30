import { useEditor, useLocale, exportFile } from '@blockcode/core';
import { IconSelector, ActionButton } from '@blockcode/ui';
import SpriteInfo from '../sprite-info/sprite-info';

import uid from '../../lib/uid';
import loadImage from '../../lib/load-image';
import RotationStyle from '../../lib/rotation-style';

import styles from './sprite-selector.module.css';
import spriteIcon from './icon-sprite.svg';
import surpriseIcon from './icon-surprise.svg';
import searchIcon from './icon-search.svg';
import paintIcon from './icon-paint.svg';
import fileUploadIcon from './icon-file-upload.svg';

export default function SpriteSelector({ stageSize }) {
  const { getText } = useLocale();
  const { fileList, assetList, selectedIndex, addFile, openFile, deleteFile, addAsset, deleteAsset, modifyAsset } =
    useEditor();

  const generateMainFile = (fileId, deleteMode = false) => {
    const mainContent = [];
    mainContent.push('from popsicle.scratch import *');
    fileList.forEach((file, i) => {
      if (deleteMode && file.id === fileId) return;
      if (i === 0) {
        mainContent.push(`from ${file.id} import stage`);
      } else {
        mainContent.push(`import ${file.id}`);
      }
    });
    if (!deleteMode) {
      mainContent.push(`import ${fileId}`);
    }
    mainContent.push('run(stage.render)');
    modifyAsset({
      id: 'main',
      content: mainContent.join('\n'),
    });
  };

  const handleFileChange = async ({ target }) => {
    for (const file of target.files) {
      const fileId = uid();
      const assetId = uid();
      const imageName = file.name.slice(0, file.name.lastIndexOf('.'));
      const image = await loadImage(file);
      addAsset({
        id: assetId,
        type: file.type,
        name: imageName,
        data: image.src.slice(`data:${file.type};base64,`.length),
        width: image.width,
        height: image.height,
        centerX: Math.floor(image.width / 2),
        centerY: Math.floor(image.height / 2),
      });
      addFile({
        id: fileId,
        type: 'text/x-python',
        name: imageName,
        assets: [assetId],
        costume: 0,
        x: 0,
        y: 0,
        size: 100,
        direction: 90,
        rotationStyle: RotationStyle.ALL_AROUND,
      });
      generateMainFile(fileId);
    }
    target.value = '';
  };

  const handleDelete = (index) => {
    const { id, assets } = fileList[index];
    deleteFile(index);
    generateMainFile(id, true);
    assets.forEach((assetId) => {
      for (const file of fileList) {
        if (file.id !== id && file.assets.includes(assetId)) return;
      }
      deleteAsset(assetId);
    });
  };

  const getFileIcon = (id) => {
    const asset = assetList.find((asset) => asset.id === id);
    if (asset) {
      return `data:${asset.type};base64,${asset.data}`;
    }
  };

  return (
    <div className={styles.spriteSelector}>
      <SpriteInfo
        stageSize={stageSize}
        targetInfo={null}
      />

      <IconSelector
        items={fileList.map((sprite, index) =>
          index === 0
            ? { __hidden__: true }
            : {
                ...sprite,
                icon: getFileIcon(sprite.assets[sprite.costume]),
                order: sprite.order || index,
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
                      disabled: fileList.length <= 2,
                      onClick: fileList.length > 2 && (() => handleDelete(index)),
                    },
                  ],
                ],
              }
        )}
        selectedIndex={selectedIndex}
        onSelect={openFile}
        onDelete={fileList.length > 2 && handleDelete}
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
            fileAccept: 'image/*', // TODO: add .sprite file
            fileMultiple: true,
            onFileChange: handleFileChange,
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
