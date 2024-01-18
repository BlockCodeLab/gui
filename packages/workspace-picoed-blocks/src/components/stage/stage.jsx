import { useState } from 'preact/hooks';
import { classNames } from '@blockcode/ui';
import { PicoedPlayer } from '../picoed-player/picoed-player';
import Toolbar from './toolbar';
import styles from './stage.module.css';

export default function Stage() {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => setPlaying(true);
  const handleStop = () => setPlaying(false);

  return (
    <div className={styles.stageWrapper}>
      <Toolbar
        playing={playing}
        onPlay={handlePlay}
        onStop={handleStop}
      />

      <div className={classNames(styles.stage)}>
        <PicoedPlayer
          playing={playing}
          onRequestStop={handleStop}
        />
      </div>
    </div>
  );
}
