import { useLocale, useEditor } from '@blockcode/core';
import { IconSelector, ActionButton } from '@blockcode/ui';

import styles from './selector.module.css';
import spriteIcon from './icon-sprite.svg';
import backdropIcon from './icon-backdrop.svg';
import surpriseIcon from './icon-surprise.svg';
import searchIcon from './icon-search.svg';
import paintIcon from './icon-paint.svg';
import fileUploadIcon from './icon-file-upload.svg';

export default function Selector({ filters, onSelect }) {
  const { getText } = useLocale();
  const { assetList, selectedIndex } = useEditor();

  const getActionButtonText = (defaultText, costumeText, backdropText) => {
    if (!filters) return defaultText;
    if (selectedIndex === -1) return defaultText;
    if (selectedIndex === 0) return backdropText;
    return costumeText;
  };

  const images = assetList.filter((asset, index) => {
    if (index === 0) return false;
    if (filters) {
      return filters.find((filter) => filter === asset.id);
    }
    return /^image\//.test(asset.type);
  });

  const getAssetIcon = (asset) => `data:${asset.type};base64,${asset.data}`;

  const handleSelect = (index) => onSelect(images[index].id);

  return (
    <div className={styles.selectorWrapper}>
      <IconSelector
        id="paint-selector"
        className={styles.selectorItemsWrapper}
        items={images.map((image, index) => ({
          ...image,
          details: `${image.width}×${image.height}`,
          icon: getAssetIcon(image),
          order: index,
          className: styles.selectorItem,
          contextMenu: [
            [
              {
                label: getText('pixelPaint.contextMenu.duplicate', 'duplicate'),
                onClick: () => {},
              },
              {
                label: getText('pixelPaint.contextMenu.export', 'export'),
                onClick: () => {},
              },
            ],
            [
              {
                label: getText('pixelPaint.contextMenu.delete', 'delete'),
                className: styles.deleteMenuItem,
                disabled: images.length <= 1,
                onClick: images.length > 1 && (() => {}),
              },
            ],
          ],
        }))}
        selectedIndex={0}
        onSelect={handleSelect}
        onDelete={images.length > 1 && (() => {})}
      />

      <div className={styles.addButtonWrapper}>
        <ActionButton
          className={styles.addButton}
          icon={selectedIndex > 0 ? spriteIcon : backdropIcon}
          tooltip={getActionButtonText(
            getText('pixelPaint.actionButton.image', 'Choose a Image'),
            getText('pixelPaint.actionButton.costume', 'Choose a Costume'),
            getText('pixelPaint.actionButton.backdrop', 'Choose a Backdrop'),
          )}
          onClick={() => {}}
          moreButtons={[
            {
              icon: fileUploadIcon,
              tooltip: getActionButtonText(
                getText('pixelPaint.actionButton.upload', 'Upload Image'),
                getText('pixelPaint.actionButton.uploadCostume', 'Upload Costume'),
                getText('pixelPaint.actionButton.uploadBackdrop', 'Upload Backdrop'),
              ),
              fileAccept: 'image/*',
              fileMultiple: true,
              onFileChange: () => {},
            },
            {
              icon: surpriseIcon,
              tooltip: getText('pixelPaint.actionButton.surprise', 'Surprise'),
              onClick: () => {},
            },
            {
              icon: paintIcon,
              tooltip: getText('pixelPaint.actionButton.paint', 'Paint'),
              onClick: () => {},
            },
            {
              icon: searchIcon,
              tooltip: getActionButtonText(
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
