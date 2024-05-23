import { useEffect, useState } from 'preact/hooks';
import { useLocale, useEditor } from '@blockcode/core';
import { classNames, Label, BufferedInput, Input, Button } from '@blockcode/ui';
import { Color } from '../../lib/color';
import { createImage } from '../../lib/create-image';

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

export default function Painter({ mode, imageList, imageIndex }) {
  const { getText, maybeLocaleText } = useLocale();
  const { modifyAsset } = useEditor();

  const [zoom, setZoom] = useState(1);
  const [paintMode, setPaintMode] = useState('draw');
  const [selectedTool, setSelectedTool] = useState('pen');
  const [penSize, setPenSize] = useState(10);
  const [outlineSize, setOutlineSize] = useState(2);
  const [fillColor, setFillColor] = useState(new Color([260, 0.6, 1]));
  const [outlineColor, setOutlineColor] = useState(new Color([0, 1, 0]));
  const [undoList, setUndoList] = useState([]);
  const [redoList, setRedoList] = useState([]);

  const imageAsset = imageList[imageIndex];
  const imageId = imageAsset && imageAsset.id;
  const disabled = !imageId;

  const getTextByMode = (defaultText, costumeText, backdropText) => {
    if (mode === 'costume') return costumeText;
    if (mode === 'backdrop') return backdropText;
    return defaultText;
  };

  const modifyImage = (image) => {
    image.id = imageId;

    if (image.data) {
      const newImage = createImage(image.data);
      image.type = newImage.type;
      image.data = newImage.data;
      image.width = newImage.width;
      image.height = newImage.height;
      image.centerX = newImage.centerX;
      image.centerY = newImage.centerY;
    }
    modifyAsset(image);
  };

  const handleChange = (key, value) => {
    const image = {};

    if (key === 'name') {
      image.name = value;
    }
    if (key === 'data') {
      image.data = value;

      if (undoList.length > 20) {
        undoList.splice(1, 1);
      }
      setUndoList(undoList.concat(image.data));
      setRedoList([]);

      if (undoList.length === 0) return;
    }

    modifyImage(image);

    if (paintMode !== 'draw') {
      setPaintMode('draw');
    }
  };

  const handleChangeColor = (newColor) => {
    if (paintMode === 'picker-fill') {
      setFillColor(newColor);
    }
    if (paintMode === 'picker-outline') {
      setOutlineColor(newColor);
    }
  };

  const handleUndo = () => {
    const imageData = undoList.pop();
    setUndoList(undoList);
    setRedoList(redoList.concat(imageData));
    modifyImage({ data: undoList.at(-1) });
  };

  const handleRedo = () => {
    const imageData = redoList.pop();
    setUndoList(undoList.concat(imageData));
    setRedoList(redoList);
    modifyImage({ data: imageData });
  };

  useEffect(() => {
    setUndoList([]);
    setRedoList([]);
    setPaintMode('draw');
    return () => {};
  }, [imageId]);

  return (
    <div className={styles.painterWrapper}>
      <div className={styles.row}>
        <div className={styles.group}>
          <Label
            text={getTextByMode(
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
                imageAsset
                  ? maybeLocaleText(imageAsset.name)
                  : getTextByMode(
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
            disabled={undoList.length <= 1}
            className={classNames(styles.button, styles.groupButtonFirst, {
              [styles.groupButtonToggledOff]: disabled,
            })}
            onClick={handleUndo}
          >
            <img
              src={undoIcon}
              className={styles.buttonIcon}
              title={getText('pixelPaint.painter.undo', 'Undo')}
            />
          </Button>
          <Button
            disabled={redoList.length === 0}
            className={classNames(styles.button, styles.groupButtonLast, {
              [styles.groupButtonToggledOff]: disabled,
            })}
            onClick={handleRedo}
          >
            <img
              src={redoIcon}
              className={styles.buttonIcon}
              title={getText('pixelPaint.painter.redo', 'Redo')}
            />
          </Button>
        </div>

        <div className={styles.group}>
          {mode === 'costume' && (
            <Button
              vertical
              className={classNames(styles.labelButton, {
                [styles.selected]: paintMode === 'center',
              })}
              onClick={() => setPaintMode(paintMode !== 'center' ? 'center' : 'draw')}
            >
              <img
                src={centerIcon}
                className={styles.buttonIcon}
                title={getText('pixelPaint.painter.center', 'Center')}
              />
              <span>{getText('pixelPaint.painter.center', 'Center')}</span>
            </Button>
          )}
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

        <div className={styles.drawBoxWrapper}>
          <DrawBox
            image={imageAsset}
            zoom={zoom}
            selectedTool={{
              fillColor,
              outlineColor,
              penSize,
              outlineSize,
              type: paintMode === 'draw' ? selectedTool : paintMode,
            }}
            undoList={undoList}
            onChange={(imageData) => handleChange('data', imageData)}
            onChangeColor={handleChangeColor}
          />
        </div>
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
