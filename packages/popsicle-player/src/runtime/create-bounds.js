export default function (image, cx, cy) {
  const canvas = new OffscreenCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(image, 0, 0);

  const bounds = new Set();

  let left = image.width;
  let right = 0;
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
      if (a !== 0) {
        if (x < left) left = x;
        bounds.add(`${x - cx},${y - cy}`);
        break;
      }
    }
    for (let x = image.width - 1; x >= 0; x--) {
      const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
      if (a !== 0) {
        if (x > right) right = x;
        bounds.add(`${x - cx},${y - cy}`);
        break;
      }
    }
  }

  let top = image.height;
  let bottom = 0;
  for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
      const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
      if (a !== 0) {
        if (y < top) top = y;
        bounds.add(`${x - cx},${y - cy}`);
        break;
      }
    }
    for (let y = image.height - 1; y >= 0; y--) {
      const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
      if (a !== 0) {
        if (y > bottom) bottom = x;
        bounds.add(`${x - cx},${y - cy}`);
        break;
      }
    }
  }

  const result = Array.from(bounds).map((point) => point.split(',').map((n) => parseInt(n)));
  result.top = top;
  result.left = left;
  result.right = right;
  result.bottom = bottom;
  return result;
}
