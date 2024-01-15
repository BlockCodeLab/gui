import classNames from 'classnames';
import { useState } from 'preact/hooks';
import { TankwarPlayer } from '../tankwar-player/tankwar-player';
import Toolbar from './toolbar';
import styles from './stage.module.css';

export default function Stage({ enemies }) {
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
        <TankwarPlayer
          enemies={enemies}
          playing={playing}
          onRequestStop={handleStop}
        />
      </div>
    </div>
  );
}
