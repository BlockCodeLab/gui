import { useRef, useEffect, useState } from 'preact/hooks';
import { classNames } from '@blockcode/ui';
import { Point } from '../../lib/point';
import { Color } from '../../lib/color';
import { loadImageFromData } from '../../lib/load-image';

import styles from './draw-box.module.css';
import centerIcon from '../painter/icons/icon-center.svg';

export default function DrawBox({ image: defaultImage, selectedTool, zoom, undoList, onChange, onChangeColor }) {
  const ref = useRef();
  const [context, setContext] = useState();

  const fillColor = selectedTool.fillColor || new Color([0, 0, 0]);
  const outlineColor = selectedTool.outlineColor || new Color([0, 0, 0]);

  let drawing, imageData;

  const getImageData = () => {
    imageData = context.getImageData(0, 0, Point.DrawWidth, Point.DrawHeight);
  };

  const putImageData = (x = 0, y = 0) => {
    context.clearRect(0, 0, Point.DrawWidth, Point.DrawHeight);
    context.putImageData(imageData, x, y);
  };

  const saveImageData = () => {
    onChange(imageData);
    imageData = null;
  };

  const restoreImageData = () => {
    let canvas = new OffscreenCanvas(Point.DrawWidth, Point.DrawHeight);
    let ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.imageSmoothingEnabled = false;
    ctx.putImageData(undoList.at(-1), 0, 0);
    imageData = ctx.getImageData(0, 0, Point.DrawWidth, Point.DrawHeight);
    ctx = null;
    canvas = null;
  };

  const pixel = (point, rgba) => {
    if (point.invalid) return;
    const index = point.index;
    imageData.data[index + 0] = rgba.r;
    imageData.data[index + 1] = rgba.g;
    imageData.data[index + 2] = rgba.b;
    imageData.data[index + 3] = rgba.a === 0 ? 0 : 255;
  };

  // for draw circle
  const pixel8 = (point0, dx, dy, rgba) => {
    pixel(new Point(point0.x - dx, point0.y + dy), rgba);
    pixel(new Point(point0.x + dx, point0.y + dy), rgba);
    pixel(new Point(point0.x + dx, point0.y - dy), rgba);
    pixel(new Point(point0.x - dx, point0.y - dy), rgba);
    pixel(new Point(point0.x - dy, point0.y + dx), rgba);
    pixel(new Point(point0.x + dy, point0.y + dx), rgba);
    pixel(new Point(point0.x + dy, point0.y - dx), rgba);
    pixel(new Point(point0.x - dy, point0.y - dx), rgba);
  };

  const pixelLine = (point1, point2, rgba) => {
    const dx = Math.abs(point2.x - point1.x);
    const dy = Math.abs(point2.y - point1.y);
    const sx = point1.x < point2.x ? 1 : -1;
    const sy = point1.y < point2.y ? 1 : -1;
    const point = new Point(point1.x, point1.y);

    let err = dx - dy;
    while (true) {
      pixel(point, rgba);
      if (point.x === point2.x && point.y === point2.y) break;

      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        point.x += sx;
      }
      if (e2 < dx) {
        err += dx;
        point.y += sy;
      }
    }
  };

  const pixelRectangle = (point1, point3, options) => {
    let x1 = point1.x;
    let x3 = point3.x;
    let y1 = point1.y;
    let y3 = point3.y;

    if (options.outline) {
      const point2 = new Point(x3, y1);
      const point4 = new Point(x1, y3);
      pixelLine(point1, point2, options.outline);
      pixelLine(point3, point4, options.outline);
      pixelLine(point2, point3, options.outline);
      pixelLine(point4, point1, options.outline);
      x1 += 1;
      x3 -= 1;
      y1 += 1;
      y3 -= 1;
    }
    if (options.fill) {
      for (let y = y1; y <= y3; y++) {
        pixelLine(new Point(x1, y), new Point(x3, y), options.fill);
      }
    }
  };

  const pixelCircle = (point0, radius, options) => {
    let x = 0;
    let y = radius;
    let d = 3 - 2 * radius;
    while (x <= y) {
      if (options.fill) {
        for (let yi = x; yi <= y; yi++) {
          pixel8(point0, x, yi, options.fill);
        }
      }
      if (options.outline) {
        pixel8(point0, x, y, options.outline);
      }
      if (d < 0) {
        d = d + 4 * x + 6;
      } else {
        d = d + 4 * (x - y);
        y--;
      }
      x++;
    }
  };

  const pen = (point) => {
    if (point.invalid) return;

    const options = {
      clear: fillColor.clear,
      fill: fillColor.rgb,
      outline: false,
    };
    if (options.clear || selectedTool.type === 'eraser') {
      options.fill.a = 0;
      if (!drawing) {
        options.fill = { r: 255, g: 255, b: 255 };
        options.outline = { r: 138, g: 187, b: 255 };
      }
    }
    if (selectedTool.penSize === 1) {
      pixel(point, !drawing && (options.clear || selectedTool.type === 'eraser') ? options.outline : options.fill);
    } else if (selectedTool.penSize === 3) {
      pixelRectangle(new Point(point.x - 1, point.y - 1), new Point(point.x + 1, point.y + 1), options);
    } else if (selectedTool.penSize < 5) {
      const d = selectedTool.penSize / 2;
      pixelRectangle(new Point(point.x - d, point.y - d), new Point(point.x + d - 1, point.y + d - 1), options);
    } else {
      pixelCircle(point, Math.floor((selectedTool.penSize - 1) / 2), options);
    }
  };

  const fill = (point) => {
    if (point.invalid) return;
    const repalceColor = new Color(Array.from(imageData.data.slice(point.index, point.index + 4)));

    const points = [];
    const checkPoint = (point) => {
      if (point.invalid) return;
      if (!points.includes(point.index)) {
        const color = new Color(Array.from(imageData.data.slice(point.index, point.index + 4)));
        if (color.equals(repalceColor) && color.notEquals(fillColor)) {
          points.push(point.index);
        }
      }
    };
    checkPoint(point);

    while (points.length > 0) {
      const index = points.shift();
      imageData.data[index + 0] = fillColor.rgb.r;
      imageData.data[index + 1] = fillColor.rgb.g;
      imageData.data[index + 2] = fillColor.rgb.b;
      imageData.data[index + 3] = fillColor.clear ? 0 : 255;

      point = Point.from(index);
      checkPoint(point.topPoint);
      checkPoint(point.leftPoint);
      checkPoint(point.rightPoint);
      checkPoint(point.bottomPoint);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!ref.current) return;
    drawing = true;

    const rect = ref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor((Point.DrawWidth * x) / ref.current.clientWidth);
    y = Math.floor((Point.DrawHeight * y) / ref.current.clientHeight);

    if (selectedTool.type === 'pen' || selectedTool.type === 'eraser' || selectedTool.type === 'fill') {
      const point = new Point(x, y);
      getImageData();
      if (selectedTool.type === 'pen' || selectedTool.type === 'eraser') {
        pen(point);
      } else if (selectedTool.type === 'fill') {
        fill(point);
      }
      putImageData();
    } else if (selectedTool.type.startsWith('picker-')) {
      e.stopPropagation();
    } else if (selectedTool.type.startsWith('center')) {
      const dx = Point.DrawWidth / 2 - x;
      const dy = Point.DrawHeight / 2 - y;
      putImageData(dx, dy);
      getImageData();
    }

    // mouse leave draw box
    const mouseUp = () => {
      if (drawing) {
        drawing = false;
        saveImageData();
      }
      document.removeEventListener('mouseup', mouseUp);
    };
    document.addEventListener('mouseup', mouseUp);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!ref.current) return;

    if (selectedTool.type === 'center') return;

    const rect = ref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor((Point.DrawWidth * x) / ref.current.clientWidth);
    y = Math.floor((Point.DrawHeight * y) / ref.current.clientHeight);

    if (selectedTool.type === 'pen' || selectedTool.type === 'eraser') {
      const point = new Point(x, y);
      if (!drawing) {
        restoreImageData();
      } else {
        getImageData();
      }
      if (selectedTool.type === 'pen' || selectedTool.type === 'eraser') {
        pen(point);
      }
      putImageData();
    } else if (selectedTool.type.startsWith('picker-')) {
      // const [r, g, b, a] = context.getImageData(x, y, 1, 1).data;
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    drawing = false;

    if (selectedTool.type === 'center') {
      saveImageData();
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor((Point.DrawWidth * x) / ref.current.clientWidth);
    y = Math.floor((Point.DrawHeight * y) / ref.current.clientHeight);

    if (selectedTool.type.startsWith('picker-')) {
      const [r, g, b, a] = context.getImageData(x, y, 1, 1).data;
      if (a === 0) {
        if (selectedTool.type === 'picker-fill') {
          onChangeColor(new Color(fillColor.hsv, true));
        }
        if (selectedTool.type === 'picker-outline') {
          onChangeColor(new Color(outlineColor.hsv, true));
        }
      } else {
        onChangeColor(new Color({ r, g, b }).toHSVColor());
      }
      return;
    }

    saveImageData();

    if (selectedTool.type === 'eraser') {
      restoreImageData();
      pen(new Point(x, y));
      putImageData();
    }
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    if (!drawing) {
      restoreImageData();
      putImageData();
    }
  };

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d', { willReadFrequently: true });
      ctx.imageSmoothingEnabled = false;
      setContext(ctx);
    }
    return () => {};
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      const drawBox = ref.current.parentElement.parentElement;

      let left = (ref.current.clientWidth - drawBox.clientWidth) / 2;
      let top = (ref.current.clientHeight - drawBox.clientHeight) / 2;
      if (zoom > 2) {
        const cw2 = drawBox.clientWidth / 2;
        left = ((drawBox.scrollLeft + cw2) / drawBox.dataset.scrollWidth) * ref.current.clientWidth - cw2;
        if (zoom > 4) {
          const ch2 = drawBox.clientHeight / 2;
          top = ((drawBox.scrollTop + ch2) / drawBox.dataset.scrollHeight) * ref.current.clientHeight - ch2;
        }
      }

      drawBox.dataset.scrollWidth = ref.current.clientWidth;
      drawBox.dataset.scrollHeight = ref.current.clientHeight;
      drawBox.scroll({
        top: top > 0 ? top : 0,
        left: left > 0 ? left : 0,
      });

      const centerIcon = ref.current.nextSibling;
      centerIcon.style.top = `${(zoom * Point.DrawHeight) / 2}px`;
      centerIcon.style.left = `${(zoom * Point.DrawWidth) / 2}px`;
    }

    return () => {};
  }, [zoom]);

  if (context && undoList.length === 0) {
    if (defaultImage) {
      loadImageFromData(defaultImage).then((image) => {
        const dx = Point.DrawWidth / 2 - defaultImage.centerX;
        const dy = Point.DrawHeight / 2 - defaultImage.centerY;
        context.clearRect(0, 0, Point.DrawWidth, Point.DrawHeight);
        context.drawImage(image, dx, dy);
        getImageData();
        saveImageData();
      });
    } else {
      getImageData();
      saveImageData();
    }
  }

  if (context && undoList.length > 0) {
    restoreImageData();
    putImageData();
  }

  return (
    <div className={styles.drawBox}>
      <div className={styles.drawCanvasWrapper}>
        <canvas
          ref={ref}
          className={classNames(styles.drawCanvas, {
            [styles.center]: selectedTool.type === 'center',
            [styles.picker]: selectedTool.type.startsWith('picker-'),
          })}
          width={Point.DrawWidth}
          height={Point.DrawHeight}
          style={{
            width: Point.DrawWidth * zoom,
            height: Point.DrawHeight * zoom,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
        <img
          src={centerIcon}
          className={classNames(styles.centerIcon, {
            [styles.hidden]: selectedTool.type !== 'center',
          })}
        />
      </div>
    </div>
  );
}
