import classNames from 'classnames';
import styles from './button.module.css';

export function Button({ className, disabled, onClick, children }) {
  const handleClick = disabled ? () => {} : onClick;
  return (
    <button
      className={classNames(styles.outlined, className, {
        [styles.disabled]: disabled,
      })}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className={styles.content}>{children}</div>
    </button>
  );
}
