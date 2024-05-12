import UPNG from 'upng-js';
import imageContour, { ALPHA_THRESHOLD } from './image-contour';

const color16 = (r, g, b) => ((r & 0xf8) << 8) | ((g & 0xfc) << 3) | (b >> 3);

const base64ToArrayBuffer = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer;
};

export default function ({ id, type, data, width, height }) {
  const buffer = base64ToArrayBuffer(data);
  const compressedBuffer = UPNG.encode(UPNG.toRGBA8(UPNG.decode(buffer)), width, height, 255);
  const rgba = new Uint8Array(UPNG.toRGBA8(UPNG.decode(compressedBuffer))[0]);

  const contour = imageContour({
    width,
    height,
    data: rgba,
  });
  const contourData = JSON.stringify(contour)
    .split('')
    .map((c) => c.charCodeAt());

  const palette = [color16(0, 4, 0)];
  const imageData = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) << 2;
      const r = rgba[i + 0];
      const g = rgba[i + 1];
      const b = rgba[i + 2];
      const a = rgba[i + 3];
      const color = a < ALPHA_THRESHOLD ? color16(0, 4, 0) : color16(r, g, b);

      if (!palette.includes(color)) {
        palette.push(color);
      }

      const colorIndex = palette.indexOf(color);
      imageData.push(colorIndex);
    }
  }

  const paletteData = [];
  for (let color of palette) {
    paletteData.push((color >> 8) & 0xff); // high
    paletteData.push(color & 0xff); // low
  }

  return {
    id,
    type,
    content: Uint8Array.from(
      [].concat(
        [palette.length, contourData.length & 0xff, (contourData.length >> 8) & 0xff],
        paletteData,
        contourData,
        imageData,
      ),
    ),
  };
}
