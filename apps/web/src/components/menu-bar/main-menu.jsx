import { cloneElement } from 'preact';
import { flatChildren } from '@blockcode/core';
import { Menu } from '@blockcode/ui';
import { injectStyle } from '../../lib/inject-style';

/* components */
import MenuLabel from './menu-label';

/* styles */
import styles from './menu-bar.module.css';

export default function MainMenu({ id, children }) {
  const menus = flatChildren(children).map((child) => child && cloneElement(child, { id }));
  return (
    <>
      {menus.filter((child) => child.type === MenuLabel)}
      {menus
        .filter((child) => child.type === Menu)
        .map((child) => {
          const labelId = `${id}-label-${child.props.name}`;
          const menuId = `${id}-menu-${child.props.name}`;
          injectStyle({
            [`#${labelId}:checked~#${menuId}`]: {
              display: 'block',
            },
          });
          return child;
        })}
    </>
  );
}
