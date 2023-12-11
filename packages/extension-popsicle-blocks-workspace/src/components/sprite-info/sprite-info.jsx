import classNames from 'classnames';
import { useLocale, useEdit } from '@blockcode/core';
import { Button, Label, BufferedInput, Input } from '@blockcode/ui';

import styles from './sprite-info.module.css';
import iconHide from './icon-hide.svg';
import iconShow from './icon-show.svg';

export default function SpriteInfo({ stageSize }) {
  const { getText } = useLocale();

  const disabled = false;

  const nameInput = (
    <BufferedInput
      disabled={disabled}
      className={stageSize === 'small' ? styles.fullInput : styles.nameInput}
      placeholder={getText('popsicle.blocks.spriteInfo.name', 'Name')}
      // onSubmit={() => {}}
      // value={name}
    />
  );

  const xInput = (
    <Label text={getText('popsicle.blocks.spriteInfo.x', 'x')}>
      <BufferedInput
        small
        disabled={disabled}
        placeholder={getText('popsicle.blocks.spriteInfo.x', 'x')}
        // onSubmit={(value) => handleChangeName(`${name}.${value}`)}
        // value={type}
      />
    </Label>
  );

  const yInput = (
    <Label text={getText('popsicle.blocks.spriteInfo.y', 'y')}>
      <BufferedInput
        small
        disabled={disabled}
        placeholder={getText('popsicle.blocks.spriteInfo.y', 'y')}
        // value={file ? getSizeText(file.buffer ? file.buffer.byteLength : file.content.length) : ''}
      />
    </Label>
  );

  if (stageSize === 'small') {
    return (
      <div className={styles.spriteInfoWrapper}>
        <div className={classNames(styles.row, styles.rowPrimary)}>{nameInput}</div>
        <div className={styles.row}>
          {xInput}
          {yInput}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.spriteInfoWrapper}>
      <div className={classNames(styles.row, styles.rowPrimary)}>
        <Label text={getText('popsicle.blocks.spriteInfo.sprite', 'Sprite')}>{nameInput}</Label>
        {xInput}
        {yInput}
      </div>
      <div className={styles.row}>
        <Label
          secondary
          text={getText('popsicle.blocks.spriteInfo.show', 'Show')}
        >
          <Button
            className={classNames(styles.button, styles.groupButtonFirst, {
              [styles.groupButtonToggledOff]: disabled || false,
            })}
            // onClick={handleShowSprite}
          >
            <img
              src={iconShow}
              className={styles.buttonIcon}
              alt={getText('popsicle.blocks.spriteInfo.show', 'Show')}
            />
          </Button>
          <Button
            className={classNames(styles.button, styles.groupButtonLast, {
              [styles.groupButtonToggledOff]: disabled || true,
            })}
            // onClick={handleHideSprite}
          >
            <img
              src={iconHide}
              className={styles.buttonIcon}
              alt={getText('popsicle.blocks.spriteInfo.hide', 'Hide')}
            />
          </Button>
        </Label>
        <Label
          secondary
          text={getText('popsicle.blocks.spriteInfo.size', 'Size')}
        >
          <Input
            small
            disabled={disabled}
          />
        </Label>
        <Label
          secondary
          text={getText('popsicle.blocks.spriteInfo.direction', 'Direction')}
        >
          <Input
            small
            disabled={disabled}
          />
        </Label>
      </div>
    </div>
  );
}
