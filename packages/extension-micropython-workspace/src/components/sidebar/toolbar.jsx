import classNames from 'classnames';
import { useLocale, useEdit } from '@blockcode/core';
import { Button } from '@blockcode/ui';

import DeviceManager from '../device-manager/device-manager';

import styles from './toolbar.module.css';
import iconRunCode from './icon-run-code.svg';
import iconStopAll from './icon-stop-all.svg';

export default function Toolbar() {
  const { getText } = useLocale();
  const { device } = useEdit();

  const disabled = !device;

  return (
    <div className={styles.toolbarWrapper}>
      <div className={styles.toolbarButtonGroup}>
        <img
          className={classNames(styles.runCode, {
            [styles.disabled]: disabled,
          })}
          src={iconRunCode}
          alt={getText('micropython.runCode', 'Run')}
        />
        <img
          className={classNames(styles.stopAll, {
            [styles.disabled]: disabled,
          })}
          src={iconStopAll}
          alt={getText('micropython.stopAll', 'Stop')}
        />
      </div>
      <div className={styles.toolbarButtonGroup}>
        <DeviceManager />
      </div>
    </div>
  );
}
