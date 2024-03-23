/* inspired by scratch-gui */
import classNames from 'classnames';
import { useRef, useState } from 'preact/hooks';
import { Tooltip } from '../tooltip/tooltip';
import styles from './action-button.module.css';

const CLOSE_DELAY = 300; // ms

export function ActionButton({
  className,
  disabled,
  icon: mailIcon,
  tooltip: mainTooltip,
  tooltipPlacement,
  moreButtons,
  onClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [forceHide, setForceHide] = useState(false);

  let closeTimeoutId;

  const handleToggleOpenState = () => {
    // Mouse enter back in after timeout was started prevents it from closing.
    if (closeTimeoutId) {
      clearTimeout(closeTimeoutId);
      closeTimeoutId = null;
    } else if (!isOpen) {
      setIsOpen(true);
      setForceHide(false);
    }
  };

  const handleClosePopover = () => {
    closeTimeoutId = setTimeout(() => {
      setIsOpen(false);
      closeTimeoutId = null;
    }, CLOSE_DELAY);
  };

  return disabled ? (
    <div className={classNames(styles.actionButtonWrapper, className)}>
      <button className={classNames(styles.button, styles.mainButton, styles.disabled)}>
        <img
          className={styles.mainIcon}
          draggable={false}
          src={mailIcon}
        />
      </button>
    </div>
  ) : (
    <div
      className={classNames(styles.actionButtonWrapper, className, {
        [styles.expanded]: isOpen,
        [styles.forceHidden]: forceHide,
      })}
      onMouseEnter={handleToggleOpenState}
      onMouseLeave={handleClosePopover}
      onClick={onClick}
    >
      <div className={styles.moreButtonsOuter}>
        <div
          className={styles.moreButtons}
          onClick={(e) => e.stopPropagation()}
        >
          {moreButtons &&
            moreButtons.map((item, index) => (
              <Tooltip
                className={styles.tooltip}
                content={item.tooltip}
                key={index}
                placement={tooltipPlacement || 'left'}
                offset={[0, 12]}
              >
                <button
                  className={classNames(styles.button, styles.moreButton)}
                  onClick={item.onClick}
                >
                  <img
                    className={styles.moreIcon}
                    draggable={false}
                    src={item.icon}
                  />
                </button>
              </Tooltip>
            ))}
        </div>
      </div>
      <Tooltip
        className={styles.tooltip}
        content={mainTooltip}
        placement={tooltipPlacement || 'left'}
        offset={[0, 14]}
      >
        <button className={classNames(styles.button, styles.mainButton)}>
          <img
            className={styles.mainIcon}
            draggable={false}
            src={mailIcon}
          />
        </button>
      </Tooltip>
    </div>
  );
}
