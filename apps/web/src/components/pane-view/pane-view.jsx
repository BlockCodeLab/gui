import classNames from 'classnames';
import styles from './pane-view.module.css';

const defaultID = styles.paneWrapper.split('_')[0];

export default function PaneView({ className, id, title, left, right, children }) {
  return (
    <div
      className={classNames(styles.paneWrapper, className, {
        [styles.paneLeft]: left,
        [styles.paneRight]: right,
      })}
    >
      <input
        id={`${id || defaultID}-pane`}
        type="checkbox"
        className={styles.pane}
      />
      <label
        className={styles.paneHeader}
        for={`${id || defaultID}-pane`}
      >
        {title}
      </label>
      <div className={styles.paneContent}>{children}</div>
    </div>
  );
}
