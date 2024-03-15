import { classNames, Text, Tooltip } from '@blockcode/ui';
import { Color } from '../../lib/color';

import styles from './color-picker.module.css';
import pickerIcon from './icon-picker.svg';
import clearIcon from './icon-clear.svg';

const HUE = [0, 0, 324, 288, 252, 216, 180, 144, 108, 72, 36, 0, 0];
const SLIDER_MAX_WIDTH = 124;

export default function ColorPicker({ picking, color: defaultColor, outline, onChange, onPickColor }) {
  const color = defaultColor.hsv.h;
  const saturation = defaultColor.hsv.s;
  const brightness = defaultColor.hsv.v;

  const getColorObject = (h, s, v, clear) => new Color({ h, s, v }, clear);

  const setColor = (value) => onChange(getColorObject(Math.round(value * 360), saturation, brightness));

  const setSaturation = (value) => onChange(getColorObject(color, value, brightness));

  const setBrightness = (value) => onChange(getColorObject(color, saturation, value));

  const setClear = () => onChange(getColorObject(color, saturation, brightness, true));

  const moveSliderHandler = (e, setValue) => {
    e.stopPropagation();
    const target = e.target;
    const left = target.offsetLeft;
    const cx = e.clientX;
    const mouseMove = (e) => {
      e.preventDefault();
      let x = e.clientX - cx + left;
      if (x >= SLIDER_MAX_WIDTH) x = SLIDER_MAX_WIDTH;
      if (x <= 0) x = 0;
      target.style.left = `${x}px`;
      setValue(x / SLIDER_MAX_WIDTH);
    };
    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };
  const handleColorMouseDown = (e) => moveSliderHandler(e, setColor);
  const handleSaturationMouseDown = (e) => moveSliderHandler(e, setSaturation);
  const handleBrightnessMouseDown = (e) => moveSliderHandler(e, setBrightness);

  const clickSlider = (e, setValue) => {
    const handler = e.target.children[0];
    let x = e.offsetX - 13;
    if (x >= SLIDER_MAX_WIDTH) x = SLIDER_MAX_WIDTH;
    if (x <= 0) x = 0;
    handler.style.left = `${x}px`;
    setValue(x / SLIDER_MAX_WIDTH);
  };
  const handleColorClick = (e) => clickSlider(e, setColor);
  const handleSaturationClick = (e) => clickSlider(e, setSaturation);
  const handleBrightnessClick = (e) => clickSlider(e, setBrightness);

  const hueBackgrounds = HUE.map((h) => getColorObject(h, saturation, brightness).hex);

  return (
    <Tooltip
      clickable
      placement="bottom"
      className={styles.colorTooltip}
      onHide={() => onPickColor(false)}
      content={
        <>
          <div className={styles.tooltipItem}>
            <span className={styles.tooltipItemLabel}>
              <Text
                id="pixelPaint.colorPicker.color"
                defaultMessage="Color"
              />
            </span>
            <span className={styles.tooltipItemReadout}>{Math.round((color / 360) * 100)}</span>
          </div>
          <div
            className={classNames(styles.tooltipItem, styles.tooltipItemSlider)}
            style={{
              background: `linear-gradient(to left, ${hueBackgrounds[0]} 0px, ${hueBackgrounds[1]} 13px, ${hueBackgrounds[2]}, ${hueBackgrounds[3]}, ${hueBackgrounds[4]}, ${hueBackgrounds[5]}, ${hueBackgrounds[6]}, ${hueBackgrounds[7]}, ${hueBackgrounds[8]}, ${hueBackgrounds[9]}, ${hueBackgrounds[10]}, ${hueBackgrounds[11]} 137px, ${hueBackgrounds[12]} 100%)`,
            }}
            onClick={handleColorClick}
          >
            <div
              className={styles.tooltipItemSliderHandler}
              style={{
                left: `${Math.round((color / 360) * SLIDER_MAX_WIDTH)}px`,
              }}
              onMouseDown={handleColorMouseDown}
              onClick={(e) => e.stopPropagation()}
            ></div>
          </div>

          <div className={styles.tooltipItem}>
            <span className={styles.tooltipItemLabel}>
              <Text
                id="pixelPaint.colorPicker.saturation"
                defaultMessage="Saturation"
              />
            </span>
            <span className={styles.tooltipItemReadout}>{Math.round(saturation * 100)}</span>
          </div>
          <div
            className={classNames(styles.tooltipItem, styles.tooltipItemSlider)}
            style={{
              background: `linear-gradient(to right, ${getColorObject(color, 0, brightness).hex} 0px, ${getColorObject(color, 1, brightness).hex} 100%)`,
            }}
            onClick={handleSaturationClick}
          >
            <div
              className={styles.tooltipItemSliderHandler}
              style={{
                left: `${Math.round(saturation * SLIDER_MAX_WIDTH)}px`,
              }}
              onMouseDown={handleSaturationMouseDown}
              onClick={(e) => e.stopPropagation()}
            ></div>
          </div>

          <div className={styles.tooltipItem}>
            <span className={styles.tooltipItemLabel}>
              <Text
                id="pixelPaint.colorPicker.brightness"
                defaultMessage="Brightness"
              />
            </span>
            <span className={styles.tooltipItemReadout}>{Math.round(brightness * 100)}</span>
          </div>
          <div
            className={classNames(styles.tooltipItem, styles.tooltipItemSlider)}
            style={{
              background: `linear-gradient(to right, ${getColorObject(color, saturation, 0).hex} 0px, ${getColorObject(color, saturation, 1).hex} 100%)`,
            }}
            onClick={handleBrightnessClick}
          >
            <div
              className={styles.tooltipItemSliderHandler}
              style={{
                left: `${Math.round(brightness * SLIDER_MAX_WIDTH)}px`,
              }}
              onMouseDown={handleBrightnessMouseDown}
              onClick={(e) => e.stopPropagation()}
            ></div>
          </div>

          <div className={classNames(styles.tooltipItem, styles.tooltipItemToolbar)}>
            <div
              className={classNames(styles.tooltipItemToolbarButton, {
                [styles.selected]: defaultColor.clear,
              })}
              onClick={setClear}
            >
              <img
                src={clearIcon}
                className={styles.buttonIcon}
              />
            </div>
            <div
              className={classNames(styles.tooltipItemToolbarButton, {
                [styles.selected]: picking,
              })}
              onClick={onPickColor}
            >
              <img
                src={pickerIcon}
                className={styles.buttonIcon}
              />
            </div>
          </div>
        </>
      }
    >
      <div className={styles.colorPickerWrapper}>
        <div
          className={classNames(styles.colorSwatch, { [styles.colorSwatchOutline]: outline })}
          style={{
            background: defaultColor.clear ? 'var(--ui-white)' : getColorObject(color, saturation, brightness).hex,
          }}
        >
          {defaultColor.clear && <img src={clearIcon} />}
        </div>
        <div className={styles.pickerArrow}>▾</div>
      </div>
    </Tooltip>
  );
}
