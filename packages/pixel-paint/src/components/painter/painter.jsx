import { useState } from 'preact/hooks';
import { useLocale, useEditor } from '@blockcode/core';
import { classNames, Label, BufferedInput, Input, Button } from '@blockcode/ui';
import { Color } from '../../lib/color';

import ColorPicker from '../color-picker/color-picker';
import ToolBox from '../tool-box/tool-box';
import DrawBox from '../draw-box/draw-box';

import styles from './painter.module.css';
import undoIcon from './icons/icon-undo.svg';
import redoIcon from './icons/icon-redo.svg';
import centerIcon from './icons/icon-center.svg';
import zoomInIcon from './icons/icon-zoom-in.svg';
import zoomOutIcon from './icons/icon-zoom-out.svg';
import zoomResetIcon from './icons/icon-zoom-reset.svg';
import penIcon from '../tool-box/icons/icon-pen.svg';
import eraserIcon from '../tool-box/icons/icon-eraser.svg';
import fillIcon from '../tool-box/icons/icon-fill.svg';
import textIcon from '../tool-box/icons/icon-text.svg';
import lineIcon from '../tool-box/icons/icon-line.svg';
import rectangleIcon from '../tool-box/icons/icon-rectangle.svg';
import circleIcon from '../tool-box/icons/icon-circle.svg';
import selectIcon from '../tool-box/icons/icon-select.svg';

export default function Painter({ filters, assetId }) {
  const { getText } = useLocale();
  const { assetList, selectedIndex } = useEditor();

  const [zoom, setZoom] = useState(1);
  const [paintMode, setPaintMode] = useState('draw');
  const [selectedTool, setSelectedTool] = useState('pen');
  const [penSize, setPenSize] = useState(10);
  const [outlineSize, setOutlineSize] = useState(2);
  const [fillColor, setFillColor] = useState(new Color([260, 0.6, 1]));
  const [outlineColor, setOutlineColor] = useState(new Color([0, 1, 0]));

  const disabled = !assetId;
  const image = assetList[assetId];

  const getPainterText = (defaultText, costumeText, backdropText) => {
    if (!filters) return defaultText;
    if (selectedIndex === -1) return defaultText;
    if (selectedIndex === 0) return backdropText;
    return costumeText;
  };

  const handleChange = (key, value) => {};

  const handleChangeColor = (newColor) => {
    if (paintMode === 'picker-fill') {
      setFillColor(newColor);
    }
    if (paintMode === 'picker-outline') {
      setOutlineColor(newColor);
    }
  };

  return (
    <div className={styles.painterWrapper}>
      <div className={styles.row}>
        <div className={styles.group}>
          <Label
            text={getPainterText(
              getText('pixelPaint.painter.image', 'Image'),
              getText('pixelPaint.painter.costume', 'Costume'),
              getText('pixelPaint.painter.backdrop', 'Backdrop'),
            )}
          >
            <BufferedInput
              disabled={disabled}
              className={styles.nameInput}
              placeholder={getText('pixelPaint.painter.name', 'name')}
              onSubmit={(value) => handleChange('name', value)}
              value={
                image
                  ? image.name
                  : getPainterText(
                      getText('pixelPaint.painter.image', 'Image'),
                      getText('pixelPaint.painter.costume', 'Costume'),
                      getText('pixelPaint.painter.backdrop', 'Backdrop'),
                    )
              }
            />
          </Label>
        </div>

        <div className={styles.group}>
          <Button
            disabled
            className={classNames(styles.button, styles.groupButtonFirst, {
              [styles.groupButtonToggledOff]: disabled,
            })}
            onClick={() => {}}
          >
            <img
              src={undoIcon}
              className={styles.buttonIcon}
              title={getText('pixelPaint.painter.undo', 'Undo')}
            />
          </Button>
          <Button
            disabled
            className={classNames(styles.button, styles.groupButtonLast, {
              [styles.groupButtonToggledOff]: disabled,
            })}
            onClick={() => {}}
          >
            <img
              src={redoIcon}
              className={styles.buttonIcon}
              title={getText('pixelPaint.painter.redo', 'Redo')}
            />
          </Button>
        </div>

        <div className={styles.group}>
          <Button
            vertical
            className={classNames(styles.labelButton, {
              [styles.selected]: paintMode === 'center',
            })}
            onClick={() => (paintMode !== 'center' ? setPaintMode('center') : setPaintMode('draw'))}
          >
            <img
              src={centerIcon}
              className={styles.buttonIcon}
              title={getText('pixelPaint.painter.center', 'Center')}
            />
            <span>{getText('pixelPaint.painter.center', 'Center')}</span>
          </Button>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <Label text={getText('pixelPaint.painter.fill', 'Fill')}>
            <ColorPicker
              picking={paintMode.startsWith('picker-')}
              color={fillColor}
              onChange={setFillColor}
              onPickColor={(picking) => setPaintMode(picking === false ? 'draw' : 'picker-fill')}
            />
          </Label>
        </div>

        <div className={classNames(styles.group, styles.dashedBorder)}>
          <Label
            className={classNames({
              [styles.disabled]: true,
            })}
            text={getText('pixelPaint.painter.outline', 'Outline')}
          >
            <ColorPicker
              outline
              picking={paintMode.startsWith('picker-')}
              color={outlineColor}
              onChange={setOutlineColor}
              onPickColor={(picking) => setPaintMode(picking === false ? 'draw' : 'picker-outline')}
            />
          </Label>

          <Input
            small
            type="number"
            min={0}
            max={100}
            step={1}
            className={classNames(styles.largeInput, {
              [styles.disabled]: true,
            })}
            value={outlineSize}
            onChange={(e) => setOutlineSize(e.target.valueAsNumber)}
          />
        </div>

        <div className={styles.group}>
          {selectedTool === 'pen' || selectedTool === 'eraser' ? (
            <>
              <img
                src={selectedTool === 'pen' ? penIcon : eraserIcon}
                className={styles.toolIcon}
              />
              <Input
                small
                type="number"
                min={1}
                max={100}
                step={1}
                className={styles.largeInput}
                value={penSize}
                onChange={(e) => setPenSize(e.target.valueAsNumber)}
              />
            </>
          ) : null}
        </div>
      </div>

      <div className={classNames(styles.row, styles.rowFill)}>
        <ToolBox
          selectedTool={selectedTool}
          onSelect={setSelectedTool}
        />

        <DrawBox
          assetId={assetId}
          zoom={zoom}
          selectedTool={{
            fillColor,
            outlineColor,
            penSize,
            outlineSize,
            type: paintMode === 'draw' ? selectedTool : paintMode,
          }}
          onChange={(image) => handleChange('data', image)}
          onChangeColor={handleChangeColor}
        />
      </div>

      <div className={classNames(styles.row, styles.rowRight)}>
        <Button
          className={classNames(styles.button, styles.groupButtonFirst)}
          onClick={() => zoom - 1 > 0 && setZoom(zoom - 1)}
        >
          <img
            src={zoomOutIcon}
            className={styles.buttonIcon}
          />
        </Button>
        <Button
          className={classNames(styles.button, styles.groupButton)}
          onClick={() => setZoom(1)}
        >
          <img
            src={zoomResetIcon}
            className={styles.buttonIcon}
          />
        </Button>
        <Button
          className={classNames(styles.button, styles.groupButtonLast)}
          onClick={() => zoom + 1 < 20 && setZoom(zoom + 1)}
        >
          <img
            src={zoomInIcon}
            className={styles.buttonIcon}
          />
        </Button>
      </div>
    </div>
  );
}
