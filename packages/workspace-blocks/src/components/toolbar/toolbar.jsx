import { useLocale, useEditor } from '@blockcode/core';

import styles from './toolbar.module.css';
import iconDownload from './icon-download.svg';

export default function Toolbar({ onSnapshotDownloadFiles }) {
  const { getText } = useLocale();
  const { assetList, fileList } = useEditor();

  const handleDownload = () => {
    let files = [].concat(fileList, assetList).map((file) => {});
    if (onSnapshotDownloadFiles) {
      files = onSnapshotDownloadFiles(files);
    }
  };

  return (
    <div className={styles.toolbarButtonsGroup}>
      <img
        className={styles.toolbarButton}
        src={iconDownload}
        title={getText('blocks.downloadToDevice', 'Download')}
        onClick={handleDownload}
      />
    </div>
  );
}
