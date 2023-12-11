import classNames from 'classnames';
import { useLocale } from '@blockcode/core';
import { Text, ActionButton } from '@blockcode/ui';

import styles from './stage-selector.module.css';
import backdropIcon from './icon-backdrop.svg';
import surpriseIcon from '../sprite-selector/icon-surprise.svg';
import searchIcon from '../sprite-selector/icon-search.svg';
import paintIcon from '../sprite-selector/icon-paint.svg';
import fileUploadIcon from '../sprite-selector/icon-file-upload.svg';

const DEFAULT_BACKDROP_THUMB =
  'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIHZpZXdCb3g9Ii0xIC0xIDIgMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPCEtLSBFeHBvcnRlZCBieSBTY3JhdGNoIC0gaHR0cDovL3NjcmF0Y2gubWl0LmVkdS8gLS0+Cjwvc3ZnPg==';

export default function StageSelector({ thumb, count, selected, onSelect }) {
  const { getText } = useLocale();

  return (
    <div
      className={classNames(styles.stageSelector, {
        [styles.isSelected]: selected,
      })}
      onClick={onSelect}
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
      <div className={styles.count}>{count || 1}</div>

      <ActionButton
        className={styles.addButton}
        icon={backdropIcon}
        tooltip={getText('popsicle.blocks.actionButton.backdrop', 'Choose a Backdrop')}
        onClick={() => {}}
        moreButtons={[
          {
            icon: fileUploadIcon,
            tooltip: getText('popsicle.blocks.actionButton.uploadBackdrop', 'Upload Backdrop'),
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
            tooltip: getText('popsicle.blocks.actionButton.backdrop', 'Choose a Backdrop'),
            onClick: () => {},
          },
        ]}
      />
    </div>
  );
}
