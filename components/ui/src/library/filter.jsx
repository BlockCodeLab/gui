import classNames from 'classnames';

import filterIcon from './icons/icon-filter.svg';
import closeIcon from './icons/icon-close.svg';
import styles from './filter.module.css';

export function Filter({ className, onChange, onClear, placeholder, query, inputClassName }) {
  return (
    <div
      className={classNames(className, styles.filter, {
        [styles.isActive]: query.length > 0,
      })}
    >
      <img
        className={styles.filterIcon}
        src={filterIcon}
      />
      <input
        type="text"
        className={classNames(styles.filterInput, inputClassName)}
        placeholder={placeholder}
        data-value={query}
        value={query}
        onInput={onChange}
      />
      <div
        className={styles.closeIconWrapper}
        onClick={onClear}
      >
        <img
          className={styles.closeIcon}
          src={closeIcon}
        />
      </div>
    </div>
  );
}
