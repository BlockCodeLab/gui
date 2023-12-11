import classNames from 'classnames';
import Toolbar from './toolbar';
import styles from './stage.module.css';

export default function Stage({ onSizeToggle, size }) {
  return (
    <div className={styles.stageWrapper}>
      <Toolbar
        onSizeToggle={onSizeToggle}
        stageSize={size}
      />

      <div className={classNames(styles.stage, { [styles.smallStage]: size === 'small' })}></div>
    </div>
  );
}
