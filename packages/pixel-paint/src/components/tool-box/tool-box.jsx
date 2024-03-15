import { useLocale } from '@blockcode/core';
import { classNames, Button } from '@blockcode/ui';

import styles from './tool-box.module.css';
import penIcon from './icons/icon-pen.svg';
import eraserIcon from './icons/icon-eraser.svg';
import fillIcon from './icons/icon-fill.svg';
import textIcon from './icons/icon-text.svg';
import lineIcon from './icons/icon-line.svg';
import rectangleIcon from './icons/icon-rectangle.svg';
import circleIcon from './icons/icon-circle.svg';
import selectIcon from './icons/icon-select.svg';

export default function ToolBox({ selectedTool, onSelect }) {
  const { getText } = useLocale();

  return (
    <div className={styles.toolBoxWrapper}>
      <Button
        className={classNames(styles.toolButton, {
          [styles.selected]: selectedTool === 'pen',
        })}
        onClick={() => onSelect('pen')}
      >
        <img
          src={penIcon}
          className={styles.toolIcon}
          title={getText('pixelPaint.painter.pen', 'Pen')}
        />
      </Button>
      <Button
        className={classNames(styles.toolButton, {
          [styles.selected]: selectedTool === 'eraser',
        })}
        onClick={() => onSelect('eraser')}
      >
        <img
          src={eraserIcon}
          className={styles.toolIcon}
          title={getText('pixelPaint.painter.eraser', 'Eraser')}
        />
      </Button>
      <Button
        className={classNames(styles.toolButton, {
          [styles.selected]: selectedTool === 'fill',
        })}
        onClick={() => onSelect('fill')}
      >
        <img
          src={fillIcon}
          className={styles.toolIcon}
          title={getText('pixelPaint.painter.fill', 'Fill')}
        />
      </Button>
      <Button
        disabled
        className={classNames(styles.toolButton, {
          [styles.selected]: selectedTool === 'text',
        })}
        onClick={() => onSelect('text')}
      >
        <img
          src={textIcon}
          className={styles.toolIcon}
          title={getText('pixelPaint.painter.text', 'Text')}
        />
      </Button>
      <Button
        disabled
        className={classNames(styles.toolButton, {
          [styles.selected]: selectedTool === 'line',
        })}
        onClick={() => onSelect('line')}
      >
        <img
          src={lineIcon}
          className={styles.toolIcon}
          title={getText('pixelPaint.painter.line', 'Line')}
        />
      </Button>
      <Button
        disabled
        className={classNames(styles.toolButton, {
          [styles.selected]: selectedTool === 'rectangle',
        })}
        onClick={() => onSelect('rectangle')}
      >
        <img
          src={rectangleIcon}
          className={styles.toolIcon}
          title={getText('pixelPaint.painter.rectangle', 'Rectangle')}
        />
      </Button>
      <Button
        disabled
        className={classNames(styles.toolButton, {
          [styles.selected]: selectedTool === 'circle',
        })}
        onClick={() => onSelect('circle')}
      >
        <img
          src={circleIcon}
          className={styles.toolIcon}
          title={getText('pixelPaint.painter.circle', 'Circle')}
        />
      </Button>
      <Button
        disabled
        className={classNames(styles.toolButton, {
          [styles.selected]: selectedTool === 'select',
        })}
        onClick={() => onSelect('select')}
      >
        <img
          src={selectIcon}
          className={styles.toolIcon}
          title={getText('pixelPaint.painter.select', 'Select')}
        />
      </Button>
    </div>
  );
}
