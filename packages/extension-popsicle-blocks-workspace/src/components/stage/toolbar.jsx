import classNames from 'classnames';
import { useLocale } from '@blockcode/core';
import { Button } from '@blockcode/ui';

import styles from './toolbar.module.css';
import iconGreenFlag from './icon-green-flag.svg';
import iconStopAll from './icon-stop-all.svg';
import iconSmallStage from './icon-small-stage.svg';
import iconLargeStage from './icon-large-stage.svg';

export default function Toolbar({ onSizeToggle, stageSize }) {
  const { getText } = useLocale();

  const handleSmallStage = () => onSizeToggle('small');
  const handleLargeStage = () => onSizeToggle('large');

  return (
    <div className={styles.toolbarWrapper}>
      <div className={styles.toolbarButtonGroup}>
        <img
          className={styles.greenFlag}
          src={iconGreenFlag}
          alt={getText('popsicle.blocks.greenFlag', 'Go')}
        />
        <img
          className={styles.stopAll}
          src={iconStopAll}
          alt={getText('popsicle.blocks.stopAll', 'Stop')}
        />
      </div>
      <div className={styles.toolbarButtonGroup}>
        <Button
          className={classNames(styles.toolbarButton, styles.groupButtonFirst, {
            [styles.groupButtonToggledOff]: stageSize !== 'small',
          })}
          onClick={handleSmallStage}
        >
          <img
            src={iconSmallStage}
            alt={getText('popsicle.blocks.smallStage', 'Switch to small stage')}
          />
        </Button>
        <Button
          className={classNames(styles.toolbarButton, styles.groupButtonLast, {
            [styles.groupButtonToggledOff]: stageSize === 'small',
          })}
          onClick={handleLargeStage}
        >
          <img
            src={iconLargeStage}
            alt={getText('popsicle.blocks.largeStage', 'Switch to large stage')}
          />
        </Button>
      </div>
    </div>
  );
}
