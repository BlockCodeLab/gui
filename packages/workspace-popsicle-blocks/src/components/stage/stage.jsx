import { useState } from 'preact/hooks';
import { classNames } from '@blockcode/ui';
import { PopsiclePlayer } from '@blockcode/popsicle-player';
import Toolbar from './toolbar';
import styles from './stage.module.css';

export default function Stage({ size, onSizeToggle }) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => setPlaying(true);
  const handleStop = () => setPlaying(false);

  return (
    <div className={styles.stageWrapper}>
      <Toolbar
        onSizeToggle={onSizeToggle}
        stageSize={size}
        playing={playing}
        onPlay={handlePlay}
        onStop={handleStop}
      />

      <div className={classNames(styles.stage, { [styles.smallStage]: size === 'small' })}>
        <PopsiclePlayer
          stageSize={size}
          playing={playing}
          onRequestStop={handleStop}
        />
      </div>
    </div>
  );
}
