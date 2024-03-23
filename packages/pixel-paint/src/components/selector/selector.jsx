import { useLocale, useEditor } from '@blockcode/core';
import { IconSelector, ActionButton } from '@blockcode/ui';
import loadImage from '../../lib/load-image';
import uid from '../../lib/uid';

import styles from './selector.module.css';
import spriteIcon from './icon-sprite.svg';
import backdropIcon from './icon-backdrop.svg';
import surpriseIcon from './icon-surprise.svg';
import searchIcon from './icon-search.svg';
import paintIcon from './icon-paint.svg';
import fileUploadIcon from './icon-file-upload.svg';

export default function Selector({ mode, imageList, imageIndex, onSelect, onAlert, onRemoveAlert }) {
  const { getText } = useLocale();
  const { addAsset, deleteAsset, modifyFile } = useEditor();

  const imageIdList = imageList.map((image) => image.id);

  const getTextByMode = (defaultText, costumeText, backdropText) => {
    if (mode === 'costume') return costumeText;
    if (mode === 'backdrop') return backdropText;
    return defaultText;
  };

  const getImageIcon = (image) => `data:${image.type};base64,${image.data}`;

  const handleSelect = (index) => {
    modifyFile({ frame: index });
    onSelect(imageIdList[index]);
  };

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
        imageIdList.push(imageId);
      }
      onRemoveAlert(alertId);

      modifyFile({
        assets: imageIdList,
        frame: imageIdList.length - 1,
      });
    });
  };

  const handlePaintImage = () => {
    const imageId = uid();
    addAsset({
      id: imageId,
      type: 'image/png',
      name: getText(`pixelPaint.painter.${mode}`, mode),
      data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC',
      width: 1,
      height: 1,
      centerX: 1,
      centerY: 1,
    });
    imageIdList.push(imageId);
    modifyFile({
      assets: imageIdList,
      frame: imageIdList.length - 1,
    });
  };

  const handleDeleteImage = (index) => {
    deleteAsset(imageIdList[index]);
    imageIdList.splice(index, 1);
    modifyFile({
      assets: imageIdList,
      frame: imageIndex === 0 ? 0 : index > imageIndex ? imageIndex : imageIndex - 1,
    });
  };

  const handleDuplicateImage = (index) => {
    const image = imageList[index];
    const imageId = uid();
    addAsset({
      ...image,
      id: imageId,
    });
    imageIdList.push(imageId);
    modifyFile({
      assets: imageIdList,
      frame: imageIdList.length - 1,
    });
  };

  return (
    <div className={styles.selectorWrapper}>
      <IconSelector
        displayOrder
        id="paint-selector"
        className={styles.selectorItemsWrapper}
        items={imageList.map((image, index) => ({
          ...image,
          details: `${image.width}×${image.height}`,
          icon: getImageIcon(image),
          order: index,
          className: styles.selectorItem,
          contextMenu: [
            [
              {
                label: getText('pixelPaint.contextMenu.duplicate', 'duplicate'),
                onClick: () => handleDuplicateImage(index),
              },
              {
                label: getText('pixelPaint.contextMenu.export', 'export'),
                disabled: true,
              },
            ],
            [
              {
                label: getText('pixelPaint.contextMenu.delete', 'delete'),
                className: styles.deleteMenuItem,
                disabled: imageList.length <= 1,
                onClick: () => handleDeleteImage(index),
              },
            ],
          ],
        }))}
        selectedIndex={imageIndex}
        onSelect={handleSelect}
        onDelete={imageList.length > 1 && handleDeleteImage}
      />

      <div className={styles.addButtonWrapper}>
        <ActionButton
          tooltipPlacement="right"
          className={styles.addButton}
          icon={mode === 'costume' ? spriteIcon : backdropIcon}
          tooltip={getTextByMode(
            getText('pixelPaint.actionButton.image', 'Choose a Image'),
            getText('pixelPaint.actionButton.costume', 'Choose a Costume'),
            getText('pixelPaint.actionButton.backdrop', 'Choose a Backdrop'),
          )}
          onClick={() => {}}
          moreButtons={[
            {
              icon: fileUploadIcon,
              tooltip: getTextByMode(
                getText('pixelPaint.actionButton.upload', 'Upload Image'),
                getText('pixelPaint.actionButton.uploadCostume', 'Upload Costume'),
                getText('pixelPaint.actionButton.uploadBackdrop', 'Upload Backdrop'),
              ),
              onClick: handleUploadFile,
            },
            {
              icon: surpriseIcon,
              tooltip: getText('pixelPaint.actionButton.surprise', 'Surprise'),
              onClick: () => {},
            },
            {
              icon: paintIcon,
              tooltip: getText('pixelPaint.actionButton.paint', 'Paint'),
              onClick: handlePaintImage,
            },
            {
              icon: searchIcon,
              tooltip: getTextByMode(
                getText('pixelPaint.actionButton.image', 'Choose a Image'),
                getText('pixelPaint.actionButton.costume', 'Choose a Costume'),
                getText('pixelPaint.actionButton.backdrop', 'Choose a Backdrop'),
              ),
              onClick: () => {},
            },
          ]}
        />
      </div>
    </div>
  );
}
