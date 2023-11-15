/* inspired by scratch-gui */
import classNames from 'classnames';
import { useRef, useState } from 'preact/hooks';
import { Tooltip } from '../tooltip/tooltip';
import styles from './action-button.module.css';

const CLOSE_DELAY = 300; // ms

export function ActionButton({
  className,
  icon: mailIcon,
  tooltip: mainTooltip,
  tooltipPlacement,
  moreButtons,
  onClick: handleClick,
}) {
  const fileInputRef = useRef(null);
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

  const uploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={classNames(styles.actionButtonContainer, className, {
        [styles.expanded]: isOpen,
        [styles.forceHidden]: forceHide,
      })}
      onMouseEnter={handleToggleOpenState}
      onMouseLeave={handleClosePopover}
      onClick={handleClick}
    >
      <div className={styles.moreButtonsOuter}>
        <div
          className={styles.moreButtons}
          onClick={(e) => e.stopPropagation()}
        >
          {moreButtons &&
            moreButtons.map(
              (
                { icon, tooltip, onClick: handleClick, fileAccept, fileMultiple, onFileChange: handleFileChange },
                index
              ) => (
                <Tooltip
                  className={styles.tooltip}
                  content={tooltip}
                  key={index}
                  placement={tooltipPlacement || 'left'}
                  offset={[0, 16]}
                >
                  <button
                    className={classNames(styles.button, styles.moreButton)}
                    onClick={handleFileChange ? uploadFile : handleClick}
                  >
                    <img
                      className={styles.moreIcon}
                      draggable={false}
                      src={icon}
                    />
                    {handleFileChange && (
                      <input
                        accept={fileAccept}
                        className={styles.fileInput}
                        multiple={fileMultiple || false}
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                      />
                    )}
                  </button>
                </Tooltip>
              )
            )}
        </div>
      </div>
      <Tooltip
        className={styles.tooltip}
        content={mainTooltip}
        placement={tooltipPlacement || 'left'}
        offset={[0, 16]}
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
