import { useState } from 'preact/hooks';
import { classNames } from '@blockcode/ui';
import ArcadePlayer from '../arcade-player/arcade-player';
import Toolbar from './toolbar';
import styles from './stage.module.css';

export default function Stage({ playing, size, onSizeToggle, onPlay }) {
  const handlePlay = () => onPlay(true);
  const handleStop = () => onPlay(false);

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
        <ArcadePlayer
          stageSize={size}
          playing={playing}
          onRequestStop={handleStop}
        />
      </div>
    </div>
  );
}
