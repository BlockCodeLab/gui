import classNames from 'classnames';
import { cloneElement } from 'preact';
import { flatChildren } from '@blockcode/core';
import { Menu } from '@blockcode/ui';
import { injectStyle } from '../../lib/inject-style';

/* components */
import MenuLabel from './menu-label';

/* styles */
import styles from './menu-bar.module.css';

const defaultID = styles.mainMenu.split('_')[0];

export default function MainMenu({ id, className, children }) {
  const menus = flatChildren(children).map((child) => child && cloneElement(child, { id: id || defaultID }));
  return (
    <div className={classNames(styles.mainMenu, className)}>
      {menus.filter((child) => child.type === MenuLabel)}
      {menus
        .filter((child) => child.type === Menu)
        .map((child) => {
          const labelId = `${id || defaultID}-label-${child.props.name}`;
          const menuId = `${id || defaultID}-menu-${child.props.name}`;
          injectStyle({
            [`#${labelId}:checked~#${menuId}`]: {
              display: 'block',
            },
          });
          return child;
        })}
    </div>
  );
}
