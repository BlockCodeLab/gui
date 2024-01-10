import { paperCore } from '@blockcode/blocks-player';

export default function (raster) {
  const image = raster.image;
  const ctx = raster.context;
  const points = new Set();
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
      if (a !== 0) {
        points.add(`${x},${y}`);
        break;
      }
    }
  }
  for (let x = 0; x < image.width; x++) {
    for (let y = image.height - 1; y >= 0; y--) {
      const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
      if (a !== 0) {
        points.add(`${x},${y}`);
        break;
      }
    }
  }
  for (let y = image.height - 1; y >= 0; y--) {
    for (let x = image.width - 1; x >= 0; x--) {
      const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
      if (a !== 0) {
        points.add(`${x},${y}`);
        break;
      }
    }
  }
  for (let x = image.width - 1; x >= 0; x--) {
    for (let y = 0; y < image.height; y++) {
      const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
      if (a !== 0) {
        points.add(`${x},${y}`);
        break;
      }
    }
  }
  if (!points.size) return;

  return new paperCore.Path({
    segments: Array.from(points).map((point) => new paperCore.Point(point.split(',').map((n) => parseInt(n)))),
    pivot: new paperCore.Point(raster.pivot.x + image.width / 2, raster.pivot.y + image.height / 2),
    position: raster.position,
    scaling: raster.scaling,
    rotation: raster.rotation,
    closed: true,
    visible: true,
    applyMatrix: false,
    locked: true,
    strokeColor: 'red',
  });
}
