import classNames from 'classnames';
import { useEffect, useRef } from 'preact/hooks';
import { createPopper } from '@popperjs/core';
import { Menu, MenuItem, MenuSection } from '../menu/menu';
import styles from './context-menu.module.css';

const mapMenuItems = (menuItems) =>
  menuItems &&
  menuItems.map((menu, index) =>
    Array.isArray(menu) ? (
      <MenuSection key={index}>{mapMenuItems(menu)}</MenuSection>
    ) : (
      <MenuItem
        key={index}
        disabled={menu.disabled}
        className={menu.className}
        onClick={menu.onClick}
      >
        {menu.label}
      </MenuItem>
    )
  );

const generateGetBoundingClientRect =
  (x = 0, y = 0) =>
  () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
  });

export function ContextMenu({ menuItems, className, children }) {
  const contextRef = useRef(null);

  const contextId = `${Math.random().toString(36).slice(2)}_context`;

  useEffect(() => {
    if (contextRef.current) {
      const contextForElement = contextRef.current.previousElementSibling;

      const virtualElement = {
        getBoundingClientRect: generateGetBoundingClientRect(),
      };

      const popper = createPopper(virtualElement, contextRef.current, {
        placement: 'bottom-end',
      });

      const hide = (e) => {
        const handler = () => {
          if (contextRef.current) {
            delete contextRef.current.dataset.show;
            popper.setOptions((options) => ({
              ...options,
              modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
            }));
          }
          globalThis.document.removeEventListener('mousedown', handler);
          globalThis.document.removeEventListener('mouseup', hide);
        };
        globalThis.document.addEventListener('mousedown', handler);
      };

      const show = (e) => {
        e.preventDefault();

        virtualElement.getBoundingClientRect = generateGetBoundingClientRect(e.clientX, e.clientY);

        contextRef.current.dataset.show = true;
        popper.setOptions((options) => ({
          ...options,
          modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
        }));
        popper.update();
        globalThis.document.addEventListener('mouseup', hide);
      };

      contextForElement.addEventListener('contextmenu', show);
    }
    return () => {};
  }, [contextRef]);

  return (
    <>
      {children}
      <div
        ref={contextRef}
        id={contextId}
        className={styles.contextMenuWrapper}
        role="context"
      >
        {menuItems && menuItems.length && (
          <Menu
            name={contextId}
            className={classNames(styles.contextMenu, className)}
          >
            {mapMenuItems(menuItems)}
          </Menu>
        )}
      </div>
    </>
  );
}
