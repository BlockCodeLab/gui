import { getBoundingBox } from './get-bounding-box';

export function createImage(imageData) {
  const { top, left, width, height } = getBoundingBox(imageData);
  const centerX = Math.floor(imageData.width / 2 - left);
  const centerY = Math.floor(imageData.height / 2 - top);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, -left, -top, left, top, width, height);
  const [type, data] = canvas.toDataURL().slice(5).split(';base64,');

  return { type, data, width, height, centerX, centerY };
}
