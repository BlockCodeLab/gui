import { useLocale, useEditor } from '@blockcode/core';
import { classNames, Text, ActionButton } from '@blockcode/ui';
import uid from '../../lib/uid';

import loadImage from '../../lib/load-image';

import styles from './stage-selector.module.css';
import backdropIcon from './icon-backdrop.svg';
import surpriseIcon from '../sprite-selector/icon-surprise.svg';
import searchIcon from '../sprite-selector/icon-search.svg';
import paintIcon from '../sprite-selector/icon-paint.svg';
import fileUploadIcon from '../sprite-selector/icon-file-upload.svg';

const DEFAULT_BACKDROP_THUMB =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC';

export default function StageSelector({ playing, onSelectTab, onAlert, onRemoveAlert }) {
  const { getText } = useLocale();
  const { fileList, assetList, selectedIndex, openFile, addAsset, modifyFile } = useEditor();

  let backdropIds, thumb, count;
  const stage = fileList[0];

  if (stage) {
    backdropIds = stage.assets;
    const image = assetList.find((asset) => asset.id === backdropIds[stage.frame]);
    if (image) {
      thumb = `data:${image.type};base64,${image.data}`;
      count = backdropIds.length;
    }
  }

  const handleUploadFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.multiple = true;
    fileInput.click();
    fileInput.addEventListener('change', async (e) => {
      const alertId = uid();
      onAlert('importing', { id: alertId });

      for (const file of e.target.files) {
        const imageId = uid();
        const imageName = file.name.slice(0, file.name.lastIndexOf('.'));
        const image = await loadImage(file);
        addAsset({
          id: imageId,
          type: file.type,
          name: imageName,
          data: image.src.slice(`data:${file.type};base64,`.length),
          width: image.width,
          height: image.height,
          centerX: Math.floor(image.width / 2),
          centerY: Math.floor(image.height / 2),
        });
        backdropIds.push(imageId);
      }
      onRemoveAlert(alertId);

      modifyFile({
        id: stage.id,
        assets: backdropIds,
        frame: backdropIds.length - 1,
      });
      openFile(0);
    });
  };

  const handlePaintImage = () => {
    openFile(0);
    const imageId = uid();
    addAsset({
      id: imageId,
      type: 'image/png',
      name: getText(`arcade.defaultProject.backdropName`, 'backdrop'),
      data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC',
      width: 1,
      height: 1,
      centerX: 1,
      centerY: 1,
    });
    modifyFile({
      assets: backdropIds.concat(imageId),
      frame: count,
    });
    onSelectTab(1);
  };

  return (
    <div
      className={classNames(styles.stageSelector, {
        [styles.isSelected]: selectedIndex === 0,
      })}
      onClick={() => openFile(0)}
    >
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Text
            id="arcade.stageSelector.title"
            defaultMessage="Stage"
          />
        </div>
      </div>
      <img
        className={styles.backdropImage}
        src={thumb || DEFAULT_BACKDROP_THUMB}
      />
      <div className={styles.label}>
        <Text
          id="arcade.stageSelector.backdrops"
          defaultMessage="Backdrops"
        />
      </div>
      <div className={styles.count}>{count || 0}</div>

      <ActionButton
        disabled={playing}
        className={styles.addButton}
        icon={backdropIcon}
        tooltip={getText('arcade.actionButton.backdrop', 'Choose a Backdrop')}
        onClick={() => {}}
        moreButtons={[
          {
            icon: fileUploadIcon,
            tooltip: getText('arcade.actionButton.uploadBackdrop', 'Upload Backdrop'),
            onClick: handleUploadFile,
          },
          {
            icon: surpriseIcon,
            tooltip: getText('arcade.actionButton.surprise', 'Surprise'),
            onClick: () => {},
          },
          {
            icon: paintIcon,
            tooltip: getText('arcade.actionButton.paint', 'Paint'),
            onClick: handlePaintImage,
          },
          {
            icon: searchIcon,
            tooltip: getText('arcade.actionButton.backdrop', 'Choose a Backdrop'),
            onClick: () => {},
          },
        ]}
      />
    </div>
  );
}
