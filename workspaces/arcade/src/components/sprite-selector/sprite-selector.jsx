import { useState } from 'preact/hooks';
import { useLocale, useLayout, useEditor, exportFile } from '@blockcode/core';
import { classNames, IconSelector, ActionButton } from '@blockcode/ui';
import SpriteInfo from '../sprite-info/sprite-info';

import uid from '../../lib/uid';
import { uploadImage, loadImageWithDataURL } from '../../lib/load-image';
import RotationStyle from '../../lib/rotation-style';

import styles from './sprite-selector.module.css';
import spriteIcon from './icon-sprite.svg';
import surpriseIcon from './icon-surprise.svg';
import searchIcon from './icon-search.svg';
import paintIcon from './icon-paint.svg';
import fileUploadIcon from './icon-file-upload.svg';
import SpritesLibrary from '../libraries/sprites-library';

export default function SpriteSelector({ playing, stageSize, onStop, onPaint }) {
  const [spritesLibrary, setSpritesLibrary] = useState(false);
  const { getText } = useLocale();
  const { createAlert, removeAlert, createPrompt } = useLayout();
  const { fileList, assetList, selectedIndex, addFile, openFile, deleteFile, addAsset, deleteAsset } = useEditor();

  const handleShowLibrary = () => {
    onStop();
    setSpritesLibrary(true);
  };
  const handleCloseLibrary = () => setSpritesLibrary(false);

  const handleSelectSprite = async (sprite) => {
    const spriteId = uid();
    createAlert('importing', { id: spriteId });

    const assetIdList = [];
    for (const costume of sprite.costumes) {
      const costumeId = uid();
      const image = await loadImageWithDataURL(`./assets/${costume.id}.png`);
      addAsset({
        ...costume,
        id: costumeId,
        type: 'image/png',
        data: image.dataset.url.slice(`data:image/png;base64,`.length),
        width: image.width,
        height: image.height,
      });
      assetIdList.push(costumeId);
    }

    addFile({
      id: spriteId,
      type: 'text/x-python',
      name: sprite.name,
      assets: assetIdList,
      frame: 0,
      x: 0,
      y: 0,
      size: 100,
      direction: 90,
      rotationStyle: RotationStyle.ALL_AROUND,
    });
    removeAlert(spriteId);
  };

  const handleUploadFile = () => {
    onStop();

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // TODO: .sprite file
    fileInput.multiple = true;
    fileInput.click();
    fileInput.addEventListener('change', async (e) => {
      const alertId = uid();
      createAlert('importing', { id: alertId });

      for (const file of e.target.files) {
        const spriteId = uid();
        const imageId = uid();
        const imageName = file.name.slice(0, file.name.lastIndexOf('.'));
        const image = await uploadImage(file);
        addAsset({
          id: imageId,
          type: file.type,
          name: imageName,
          data: image.dataset.url.slice(`data:${file.type};base64,`.length),
          width: image.width,
          height: image.height,
          centerX: Math.floor(image.width / 2),
          centerY: Math.floor(image.height / 2),
        });
        addFile({
          id: spriteId,
          type: 'text/x-python',
          name: imageName,
          assets: [imageId],
          frame: 0,
          x: 0,
          y: 0,
          size: 100,
          direction: 90,
          rotationStyle: RotationStyle.ALL_AROUND,
        });
      }
      removeAlert(alertId);
    });
  };

  const handlePaintImage = () => {
    onStop();

    const spriteId = uid();
    const imageId = uid();
    addAsset({
      id: imageId,
      type: 'image/png',
      name: getText(`arcade.defaultProject.costumeName`, 'costume'),
      data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC',
      width: 1,
      height: 1,
      centerX: 1,
      centerY: 1,
    });
    addFile({
      id: spriteId,
      type: 'text/x-python',
      name: getText(`arcade.defaultProject.spriteName`, 'Sprite'),
      assets: [imageId],
      frame: 0,
      x: 0,
      y: 0,
      size: 100,
      direction: 90,
      rotationStyle: RotationStyle.ALL_AROUND,
    });
    onPaint();
  };

  const handleSurprise = () => {
    onStop();
    handleSelectSprite(SpritesLibrary.surprise());
  };

  const handleDuplicate = (index) => {
    onStop();

    const spriteId = uid();
    const sprite = fileList[index];
    addFile({
      ...sprite,
      id: spriteId,
      assets: sprite.assets.map((assetId) => {
        const image = assetList.find((asset) => asset.id === assetId);
        const imageId = uid();
        addAsset({
          ...image,
          id: imageId,
        });
        return imageId;
      }),
      x: Math.floor(Math.random() * (240 + 1)) - 120,
      y: Math.floor(Math.random() * (160 + 1)) - 80,
      content: '',
    });
  };

  const handleDelete = (index) => {
    const { name, assets } = fileList[index];
    createPrompt({
      title: getText('arcade.deletePrompt.title', 'Delete {name}', { name }),
      label: getText('arcade.deletePrompt.label', 'Do you want to delete the sprite?'),
      onSubmit: () => {
        onStop();
        deleteAsset(assets);
        deleteFile(index);
      },
    });
  };

  const getFileIcon = (id) => {
    const asset = assetList.find((asset) => asset.id === id);
    if (asset) {
      return `data:${asset.type};base64,${asset.data}`;
    }
  };

  return (
    <>
      <div className={styles.spriteSelector}>
        <SpriteInfo
          playing={playing}
          stageSize={stageSize}
        />

        <IconSelector
          id="sprite-selector"
          className={classNames(styles.selectorItemsWrapper, {
            [styles.small]: stageSize === 'small',
          })}
          items={fileList.map((sprite, index) =>
            index === 0
              ? { __hidden__: true }
              : {
                  ...sprite,
                  icon: getFileIcon(sprite.assets[sprite.frame]),
                  order: sprite.order || index,
                  contextMenu: [
                    [
                      {
                        label: getText('arcade.contextMenu.duplicate', 'duplicate'),
                        onClick: () => handleDuplicate(index),
                      },
                      {
                        label: getText('arcade.contextMenu.export', 'export'),
                        disabled: true,
                        onClick: () => {},
                      },
                    ],
                    [
                      {
                        label: getText('arcade.contextMenu.delete', 'delete'),
                        className: styles.deleteMenuItem,
                        onClick: () => handleDelete(index),
                      },
                    ],
                  ],
                },
          )}
          selectedIndex={selectedIndex}
          onSelect={openFile}
          onDelete={handleDelete}
        />

        <ActionButton
          className={styles.addButton}
          icon={spriteIcon}
          tooltip={getText('arcade.actionButton.sprite', 'Choose a Sprite')}
          onClick={handleShowLibrary}
          moreButtons={[
            {
              icon: fileUploadIcon,
              tooltip: getText('arcade.actionButton.uploadSprite', 'Upload Sprite'),
              onClick: handleUploadFile,
            },
            {
              icon: surpriseIcon,
              tooltip: getText('arcade.actionButton.surprise', 'Surprise'),
              onClick: handleSurprise,
            },
            {
              icon: paintIcon,
              tooltip: getText('arcade.actionButton.paint', 'Paint'),
              onClick: handlePaintImage,
            },
            {
              icon: searchIcon,
              tooltip: getText('arcade.actionButton.sprite', 'Choose a Sprite'),
              onClick: handleShowLibrary,
            },
          ]}
        />
      </div>

      {spritesLibrary && (
        <SpritesLibrary
          onClose={handleCloseLibrary}
          onSelect={handleSelectSprite}
        />
      )}
    </>
  );
}
