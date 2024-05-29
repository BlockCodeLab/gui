import { useLocale, useEditor } from '@blockcode/core';
import { classNames, Button, Label, BufferedInput } from '@blockcode/ui';
import { ScratchBlocks } from '@blockcode/blocks-editor';
import { pythonGenerator } from '@blockcode/workspace-blocks/app';

import styles from './sprite-info.module.css';
import iconHide from './icon-hide.svg';
import iconShow from './icon-show.svg';

export default function SpriteInfo({ stageSize }) {
  const { getText } = useLocale();
  const { fileList, selectedIndex, modifyFile } = useEditor();

  const disabled = selectedIndex < 1;

  const sprite = disabled
    ? {
        name: '',
        x: '',
        y: '',
        size: '',
        direction: '',
      }
    : fileList[selectedIndex];

  const handleChangeInfo = (key, value) => {
    if (key === 'name') {
      value = value.trim();
      if (value.length === 0) {
        value = getText('popsicle.blocks.spriteInfo.sprite', 'Sprite');
      }
      const re = new RegExp(`^${value}\\d*$`, 'i');
      const sameNameSprites = fileList.filter((file) => file.id !== sprite.id && file.name && re.test(file.name));
      if (sameNameSprites.length > 0) {
        value = `${value}${sameNameSprites.length + 1}`;
      }
    }
    if (key === 'size' && value < 5) {
      value = 5;
    }

    setTimeout(() => {
      const workspace = ScratchBlocks.getMainWorkspace();
      if (workspace) {
        const content = pythonGenerator.workspaceToCode(workspace);
        modifyFile({ content });
      }
    });
    modifyFile({ [key]: value });
  };

  const nameInput = (
    <BufferedInput
      disabled={disabled}
      className={stageSize === 'small' ? styles.fullInput : styles.nameInput}
      placeholder={getText('popsicle.blocks.spriteInfo.name', 'Name')}
      onSubmit={(value) => handleChangeInfo('name', value)}
      value={sprite.name}
    />
  );

  const xInput = (
    <Label text={getText('popsicle.blocks.spriteInfo.x', 'x')}>
      <BufferedInput
        small
        disabled={disabled}
        placeholder={getText('popsicle.blocks.spriteInfo.x', 'x')}
        onSubmit={(value) => handleChangeInfo('x', value)}
        value={Math.round(sprite.x)}
      />
    </Label>
  );

  const yInput = (
    <Label text={getText('popsicle.blocks.spriteInfo.y', 'y')}>
      <BufferedInput
        small
        disabled={disabled}
        placeholder={getText('popsicle.blocks.spriteInfo.y', 'y')}
        onSubmit={(value) => handleChangeInfo('y', value)}
        value={Math.round(sprite.y)}
      />
    </Label>
  );

  if (stageSize === 'small') {
    return (
      <div className={styles.spriteInfoWrapper}>
        <div className={classNames(styles.row, styles.rowPrimary)}>{nameInput}</div>
        <div className={styles.row}>
          <Button
            className={classNames(styles.button, {
              [styles.groupButtonToggledOff]: disabled || sprite.hidden,
            })}
            onClick={() => handleChangeInfo('hidden', !sprite.hidden)}
          >
            <img
              src={sprite.hidden ? iconHide : iconShow}
              className={styles.buttonIcon}
              title={
                sprite.hidden
                  ? getText('popsicle.blocks.spriteInfo.hide', 'Hide')
                  : getText('popsicle.blocks.spriteInfo.show', 'Show')
              }
            />
          </Button>
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
              [styles.groupButtonToggledOff]: disabled || sprite.hidden,
            })}
            onClick={() => handleChangeInfo('hidden', false)}
          >
            <img
              src={iconShow}
              className={styles.buttonIcon}
              title={getText('popsicle.blocks.spriteInfo.show', 'Show')}
            />
          </Button>
          <Button
            className={classNames(styles.button, styles.groupButtonLast, {
              [styles.groupButtonToggledOff]: disabled || !sprite.hidden,
            })}
            onClick={() => handleChangeInfo('hidden', true)}
          >
            <img
              src={iconHide}
              className={styles.buttonIcon}
              title={getText('popsicle.blocks.spriteInfo.hide', 'Hide')}
            />
          </Button>
        </Label>
        <Label
          secondary
          text={getText('popsicle.blocks.spriteInfo.size', 'Size')}
        >
          <BufferedInput
            small
            disabled={disabled}
            onSubmit={(value) => handleChangeInfo('size', value)}
            value={Math.round(sprite.size)}
          />
        </Label>
        <Label
          secondary
          text={getText('popsicle.blocks.spriteInfo.direction', 'Direction')}
        >
          <BufferedInput
            small
            disabled={disabled}
            onSubmit={(value) => handleChangeInfo('direction', value)}
            value={Math.round(sprite.direction)}
          />
        </Label>
      </div>
    </div>
  );
}
