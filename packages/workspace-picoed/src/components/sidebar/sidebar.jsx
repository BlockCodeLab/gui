import { useState } from 'preact/hooks';

import Stage from '../stage/stage';

import styles from './sidebar.module.css';

export default function Sidebar() {
  const [stageSize, setStageSize] = useState('large');

  const handleStageSizeToggle = (size) => setStageSize(size);

  return (
    <div className={styles.sidebarWrapper}>
      <Stage
        className={styles.stageWrapper}
        size={stageSize}
        onSizeToggle={handleStageSizeToggle}
      />
    </div>
  );
}
