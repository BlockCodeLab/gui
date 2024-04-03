import { useState } from 'preact/hooks';

import Stage from '../stage/stage';
import SpriteSelector from '../sprite-selector/sprite-selector';
import StageSelector from '../stage-selector/stage-selector';

import styles from './sidebar.module.css';

export default function Sidebar({ onSelectTab, onShowPrompt, onShowAlert, onHideAlert }) {
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
          onSelectTab={onSelectTab}
          onShowPrompt={onShowPrompt}
          onShowAlert={onShowAlert}
          onHideAlert={onHideAlert}
          onStop={handleStop}
        />
        <StageSelector
          onSelectTab={onSelectTab}
          onShowAlert={onShowAlert}
          onHideAlert={onHideAlert}
          onStop={handleStop}
        />
      </div>
    </div>
  );
}
