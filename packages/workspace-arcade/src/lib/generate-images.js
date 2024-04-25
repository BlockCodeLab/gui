import UPNG from 'upng-js';

const color16 = (r, g, b) => ((r & 0xf8) << 8) | ((g & 0xfc) << 3) | (b >> 3);

export default function (assets) {
  return Promise.all(
    assets.map(async ({ id, type, data, width, height }) => {
      const res = await fetch(`data:${type};base64,${data}`);
      const buffer = await res.arrayBuffer();
      const compressedBuffer = UPNG.encode(UPNG.toRGBA8(UPNG.decode(buffer)), width, height, 256);
      const rgba = new Uint8Array(UPNG.toRGBA8(UPNG.decode(compressedBuffer))[0]);
      const imageData = [];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) << 2;
          const r = rgba[i + 0];
          const g = rgba[i + 1];
          const b = rgba[i + 2];
          const a = rgba[i + 3];
          const color = a < 50 ? color16(0, 4, 0) : color16(r, g, b);
          imageData.push((color >> 8) & 0xff); // high
          imageData.push(color & 0xff); // low
        }
      }
      return {
        id,
        type,
        content: Uint8Array.from(imageData),
      };
    }),
  );
}
