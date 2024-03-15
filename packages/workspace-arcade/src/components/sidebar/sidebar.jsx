import { useState } from 'preact/hooks';

import Stage from '../stage/stage';
import SpriteSelector from '../sprite-selector/sprite-selector';
import StageSelector from '../stage-selector/stage-selector';

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

      <div className={styles.selectorWrapper}>
        <SpriteSelector stageSize={stageSize} />
        <StageSelector />
      </div>
    </div>
  );
}
