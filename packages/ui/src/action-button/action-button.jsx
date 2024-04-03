/* inspired by scratch-gui */
import classNames from 'classnames';
import { useState } from 'preact/hooks';
import { Tooltip } from '../tooltip/tooltip';
import styles from './action-button.module.css';

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

  const handleToggleOpenState = () => setIsOpen(true);
  const handleClosePopover = () => setIsOpen(false);

  return (
    <div
      className={classNames(styles.actionButtonWrapper, className, {
        [styles.expanded]: isOpen,
        [styles.forceHidden]: forceHide,
      })}
      disabled={disabled}
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
                  disabled={disabled}
                  onClick={(e) => {
                    setForceHide(true);
                    setIsOpen(false);
                    item.onClick(e);
                    setTimeout(() => setForceHide(false), 0);
                  }}
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
        <button
          disabled={disabled}
          className={classNames(styles.button, styles.mainButton)}
        >
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
