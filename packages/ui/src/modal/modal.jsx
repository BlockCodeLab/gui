import classNames from 'classnames';
import { Text } from '@blockcode/core';
import { Button } from '../button/button';

import styles from './modal.module.css';
import backIcon from './icon-back.svg';
import closeIcon from './icon-close.svg';
import helpIcon from './icon-help.svg';

export function Modal({ title, fullScreen: isFullScreen, onClose, className, children }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={classNames(styles.modalContent, className, { [styles.fullScreen]: isFullScreen })}>
        <div className={styles.modalHeader}>
          <div className={classNames(styles.headerItem, styles.headerItemTitle)}>{title}</div>
          <div
            className={classNames(styles.headerItem, styles.headerItemClose, { [styles.headerItemBack]: isFullScreen })}
          >
            {isFullScreen ? (
              <Button
                className={styles.backButton}
                onClick={onClose}
              >
                <img src={backIcon} />
                <Text
                  id="gui.modal.back"
                  defaultMessage="Back"
                />
              </Button>
            ) : (
              <Button
                className={styles.closeButton}
                onClick={onClose}
              >
                <img src={closeIcon} />
              </Button>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
