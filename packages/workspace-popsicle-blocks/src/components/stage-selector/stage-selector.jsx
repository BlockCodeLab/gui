import { useLocale, useEditor } from '@blockcode/core';
import { classNames, Text, ActionButton } from '@blockcode/ui';

import loadImage from '../../lib/load-image';

import styles from './stage-selector.module.css';
import backdropIcon from './icon-backdrop.svg';
import surpriseIcon from '../sprite-selector/icon-surprise.svg';
import searchIcon from '../sprite-selector/icon-search.svg';
import paintIcon from '../sprite-selector/icon-paint.svg';
import fileUploadIcon from '../sprite-selector/icon-file-upload.svg';

const DEFAULT_BACKDROP_THUMB =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC';

export default function StageSelector() {
  const { getText } = useLocale();
  const { fileList, assetList, selectedIndex, openFile, addAsset, modifyFile } = useEditor();

  let thumb, count;
  const stage = fileList[0];
  if (stage) {
    const asset = assetList.find((asset) => asset.id === stage.assets[stage.backdrop]);
    if (asset) {
      thumb = `data:${asset.type};base64,${asset.data}`;
      count = stage.assets.length;
    }
  }

  const handleFileChange = async ({ target }) => {
    for (const file of target.files) {
      const imageName = file.name.slice(0, file.name.lastIndexOf('.'));
      const image = await loadImage(file);
      addAsset({
        id: imageName,
        type: file.type,
        name: imageName,
        data: image.src.slice(`data:${file.type};base64,`.length),
        width: image.width,
        height: image.height,
        centerX: Math.floor(image.width / 2),
        centerY: Math.floor(image.height / 2),
      });
      modifyFile({
        id: stage.id,
        assets: [].concat(stage.assets, imageName),
        backdrop: stage.backdrop + 1,
      });
      openFile(0);
    }
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
            id="popsicle.blocks.stageSelector.title"
            defaultMessage="Stage"
          />
        </div>
      </div>
      <img
        className={styles.costumeCanvas}
        src={thumb || DEFAULT_BACKDROP_THUMB}
      />
      <div className={styles.label}>
        <Text
          id="popsicle.blocks.stageSelector.backdrops"
          defaultMessage="Backdrops"
        />
      </div>
      <div className={styles.count}>{count || 0}</div>

      <ActionButton
        className={styles.addButton}
        icon={backdropIcon}
        tooltip={getText('popsicle.blocks.actionButton.backdrop', 'Choose a Backdrop')}
        onClick={() => {}}
        moreButtons={[
          {
            icon: fileUploadIcon,
            tooltip: getText('popsicle.blocks.actionButton.uploadBackdrop', 'Upload Backdrop'),
            fileAccept: 'image/*',
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
            tooltip: getText('popsicle.blocks.actionButton.backdrop', 'Choose a Backdrop'),
            onClick: () => {},
          },
        ]}
      />
    </div>
  );
}
