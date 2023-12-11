import classNames from 'classnames';
import styles from './pane-view.module.css';

export default function PaneView({ className, id, title, left, right, children }) {
  return (
    <div
      className={classNames(styles.paneWrapper, className, {
        [styles.paneLeft]: left,
        [styles.paneRight]: right,
      })}
    >
      <input
        id={`${id}-pane`}
        type="checkbox"
        className={styles.pane}
      />
      <label
        className={styles.paneHeader}
        for={`${id}-pane`}
      >
        {title}
      </label>
      <div className={styles.paneContent}>{children}</div>
    </div>
  );
}
