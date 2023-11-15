import classNames from 'classnames';
import { cloneElement } from 'preact';
import { flatChildren, setHotkey } from '@blockcode/core';

import styles from './menu.module.css';

const defaultID = styles.menu.split('_')[0];

export function Menu({ id, className, children, name }) {
  return (
    <ul
      className={classNames(styles.menu, className)}
      id={`${id || defaultID}-menu-${name}`}
    >
      {children}
    </ul>
  );
}

const notMobile = /Win|Mac|Linux/i.test(globalThis.navigator.platform || globalThis.navigator.userAgent);

export function MenuItem({ children, className, href, hotkey, onClick }) {
  const navigateToHref = () => href && window.open(href, '_blank');
  const handleClick = onClick ? onClick : navigateToHref;
  return (
    <li
      className={classNames(styles.menuItem, styles.hoverable, className)}
      onMouseDown={handleClick}
    >
      <div className={styles.content}>{children}</div>
      {notMobile && hotkey && <div className={styles.hotkey}>{setHotkey(hotkey, handleClick)}</div>}
    </li>
  );
}

export function MenuSection({ children }) {
  return (
    <>
      {flatChildren(children).map(
        (child, index) =>
          child &&
          cloneElement(child, {
            className: classNames(child.props.className, { [styles.menuSection]: index === 0 }),
            key: index,
          })
      )}
    </>
  );
}
