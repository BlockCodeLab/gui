import { useRef, useEffect, useState } from 'preact/hooks';
import { classNames } from '@blockcode/ui';
import { Point, DRAW_WIDTH, DRAW_HEIGHT } from '../../lib/point';
import { Color } from '../../lib/color';

import styles from './draw-box.module.css';

export default function DrawBox({ assetId, selectedTool, zoom, onChange, onChangeColor }) {
  const ref = useRef();
  const [context, setContext] = useState();

  const fillColor = selectedTool.fillColor || new Color([0, 0, 0]);
  const outlineColor = selectedTool.outlineColor || new Color([0, 0, 0]);

  if (ref.current) {
    const drawWrapper = ref.current.parentElement;
    const { width, height } = drawWrapper.getBoundingClientRect();
    if (width > 0) {
      drawWrapper.style.width = `${width}px`;
    }
    if (height > 0) {
      drawWrapper.style.height = `${height}px`;
    }
  }

  const imageDataList = [];
  let drawing, imageData;

  const getImageData = () => {
    imageData = context.getImageData(0, 0, DRAW_WIDTH, DRAW_HEIGHT);
  };

  const putImageData = () => {
    context.putImageData(imageData, 0, 0);
  };

  const saveImageData = () => {
    if (imageDataList.length > 10) {
      imageDataList.splice(1, 0);
    }
    imageDataList.push(imageData);
    imageData = null;
  };

  const restoreImageData = () => {
    let canvas = new OffscreenCanvas(DRAW_WIDTH, DRAW_HEIGHT);
    let ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.imageSmoothingEnabled = false;
    ctx.putImageData(imageDataList.at(-1), 0, 0);
    imageData = ctx.getImageData(0, 0, DRAW_WIDTH, DRAW_HEIGHT);
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
    const repalceColor = new Color(Array.from(imageData.data.slice(point.index, point.index + 3)));

    let seeds = [];
    const checkSeed = (point) => {
      if (point.invalid) return;
      if (seeds.indexOf(point.index) === -1) {
        const color = new Color(Array.from(imageData.data.slice(point.index, point.index + 3)));
        if (color.equals(repalceColor) && color.notEquals(fillColor)) {
          seeds.push(point.index);
        }
      }
    };
    checkSeed(point);

    while (seeds.length > 0) {
      const index = seeds.shift();
      imageData.data[index + 0] = fillColor.rgb.r;
      imageData.data[index + 1] = fillColor.rgb.g;
      imageData.data[index + 2] = fillColor.rgb.b;
      imageData.data[index + 3] = fillColor.clear ? 0 : 255;

      point = Point.from(index);
      checkSeed(point.topPoint);
      checkSeed(point.leftPoint);
      checkSeed(point.rightPoint);
      checkSeed(point.bottomPoint);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!ref.current) return;
    drawing = true;

    const rect = ref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor((DRAW_WIDTH * x) / ref.current.clientWidth);
    y = Math.floor((DRAW_HEIGHT * y) / ref.current.clientHeight);

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

    const rect = ref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor((DRAW_WIDTH * x) / ref.current.clientWidth);
    y = Math.floor((DRAW_HEIGHT * y) / ref.current.clientHeight);

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
      const [r, g, b, a] = context.getImageData(x, y, 1, 1).data;
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    drawing = false;
    saveImageData();

    const rect = ref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor((DRAW_WIDTH * x) / ref.current.clientWidth);
    y = Math.floor((DRAW_HEIGHT * y) / ref.current.clientHeight);

    if (selectedTool.type === 'eraser') {
      const point = new Point(x, y);

      restoreImageData();
      pen(point);
      putImageData();
    } else if (selectedTool.type.startsWith('picker-')) {
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
      const drawWrapper = ref.current.parentElement;
      const left = (ref.current.clientWidth - drawWrapper.clientWidth) / 2;
      const top = (ref.current.clientHeight - drawWrapper.clientHeight) / 2;
      drawWrapper.scroll({
        top: top > 0 ? top : 0,
        left: left > 0 ? left : 0,
      });
    }

    return () => {};
  }, [zoom]);

  if (context && imageDataList.length === 0) {
    getImageData();
    saveImageData();
  }

  return (
    <div className={styles.drawBoxWrapper}>
      <canvas
        ref={ref}
        className={classNames(styles.drawCanvas, {
          [styles.center]: selectedTool.type === 'center',
          [styles.picker]: selectedTool.type.startsWith('picker-'),
        })}
        width={DRAW_WIDTH}
        height={DRAW_HEIGHT}
        style={{
          width: DRAW_WIDTH * zoom,
          height: DRAW_HEIGHT * zoom,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
