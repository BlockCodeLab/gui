import { useLocale } from '@blockcode/core';
import { classNames, Button } from '@blockcode/ui';

import styles from './toolbar.module.css';
import iconGreenFlag from './icon-green-flag.svg';
import iconStopAll from './icon-stop-all.svg';
import iconSmallStage from './icon-small-stage.svg';
import iconLargeStage from './icon-large-stage.svg';

export default function Toolbar({ stageSize, playing, onPlay, onStop, onSizeToggle }) {
  const { getText } = useLocale();

  const handleSmallStage = () => onSizeToggle('small');
  const handleLargeStage = () => onSizeToggle('large');

  return (
    <div className={styles.toolbarWrapper}>
      <div className={styles.toolbarButtonsGroup}>
        <img
          className={classNames(styles.greenFlag, {
            [styles.actived]: playing,
          })}
          src={iconGreenFlag}
          title={getText('arcade.greenFlag', 'Go')}
          onClick={onPlay}
        />
        <img
          className={classNames(styles.stopAll, {
            [styles.actived]: playing,
          })}
          src={iconStopAll}
          title={getText('arcade.stopAll', 'Stop')}
          onClick={onStop}
        />
      </div>
      <div className={styles.toolbarButtonsGroup}>
        <Button
          className={classNames(styles.toolbarButton, styles.groupButtonFirst, {
            [styles.groupButtonToggledOff]: stageSize !== 'small',
          })}
          onClick={handleSmallStage}
        >
          <img
            src={iconSmallStage}
            title={getText('arcade.smallStage', 'Switch to small stage')}
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
            title={getText('arcade.largeStage', 'Switch to large stage')}
          />
        </Button>
      </div>
    </div>
  );
}
