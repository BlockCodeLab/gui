import { useLocale, useEditor } from '@blockcode/core';
import { classNames } from '@blockcode/ui';

import DeviceManager from '../device-manager/device-manager';

import styles from './toolbar.module.css';
import iconRunCode from './icon-run-code.svg';
import iconStopAll from './icon-stop-all.svg';

export default function Toolbar() {
  const { getText } = useLocale();
  const { device } = useEditor();

  const disabled = !device;

  return (
    <div className={styles.toolbarWrapper}>
      <div className={styles.toolbarButtonGroup}>
        <img
          className={classNames(styles.runCode, {
            [styles.disabled]: disabled,
          })}
          src={iconRunCode}
          title={getText('micropython.runCode', 'Run')}
        />
        <img
          className={classNames(styles.stopAll, {
            [styles.disabled]: disabled,
          })}
          src={iconStopAll}
          title={getText('micropython.stopAll', 'Stop')}
        />
      </div>
      <div className={styles.toolbarButtonGroup}>
        <DeviceManager />
      </div>
    </div>
  );
}
