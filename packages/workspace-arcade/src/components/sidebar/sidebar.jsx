import { useState } from 'preact/hooks';

import Stage from '../stage/stage';
import SpriteSelector from '../sprite-selector/sprite-selector';
import StageSelector from '../stage-selector/stage-selector';

import styles from './sidebar.module.css';

export default function Sidebar({ onPaint }) {
  const [playing, setPlaying] = useState(false);
  const [stageSize, setStageSize] = useState(window.innerWidth < 1280 ? 'small' : 'large');

  const handleStop = () => setPlaying(false);

  return (
    <div className={styles.sidebarWrapper}>
      <Stage
        className={styles.stageWrapper}
        playing={playing}
        size={stageSize}
        onSizeToggle={setStageSize}
        onPlay={setPlaying}
      />

      <div className={styles.selectorWrapper}>
        <SpriteSelector
          playing={playing}
          stageSize={stageSize}
          onPaint={onPaint}
          onStop={handleStop}
        />
        <StageSelector
          onPaint={onPaint}
          onStop={handleStop}
        />
      </div>
    </div>
  );
}
