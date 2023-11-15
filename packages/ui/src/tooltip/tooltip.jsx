import classNames from 'classnames';
import { useEffect, useRef } from 'preact/hooks';
import { createPopper } from '@popperjs/core';
import styles from './tooltip.module.css';

export function Tooltip({ content, className, placement, offset, children }) {
  const tooltipRef = useRef(null);

  const tooltipId = `${Math.random().toString(36).slice(2)}_tooltip`;

  useEffect(() => {
    if (tooltipRef.current) {
      const tooltipForElement = tooltipRef.current.previousElementSibling;
      tooltipForElement.setAttribute('aria-describedby', tooltipId);

      const popper = createPopper(tooltipForElement, tooltipRef.current, {
        placement: placement || 'auto',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: offset || [0, 8],
            },
          },
        ],
      });

      const show = () => {
        tooltipRef.current.dataset.show = true;
        popper.setOptions((options) => ({
          ...options,
          modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
        }));
        popper.update();
      };

      const hide = () => {
        delete tooltipRef.current.dataset.show;
        popper.setOptions((options) => ({
          ...options,
          modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
        }));
      };

      ['mouseenter', 'focus'].forEach((event) => tooltipForElement.addEventListener(event, show));
      ['mouseleave', 'blur'].forEach((event) => tooltipForElement.addEventListener(event, hide));
    }
    return () => {};
  }, [tooltipRef]);

  return (
    <>
      {children}
      <div
        ref={tooltipRef}
        id={tooltipId}
        className={classNames(styles.tooltip, className)}
        role="tooltip"
      >
        {content}
        <div
          className={styles.arrow}
          data-popper-arrow
        ></div>
      </div>
    </>
  );
}
