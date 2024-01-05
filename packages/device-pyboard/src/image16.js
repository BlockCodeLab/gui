const color16 = (r, g, b) => ((r & 0xf8) << 8) | ((g & 0xfc) << 3) | (b >> 3);

export default function (type, base64) {
  return new Promise((resolve) => {
    const image = new globalThis.Image();
    image.src = `data:${type};base64,${base64}`;
    image.addEventListener('load', async () => {
      const canvas = new OffscreenCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(image, 0, 0);

      const imageData = [];
      for (let y = 0; y < image.height; y++) {
        for (let x = 0; x < image.width; x++) {
          const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
          const color = a === 0 ? 0 : color16(r, g, b);
          imageData.push((color >> 8) & 0xff); // high
          imageData.push(color & 0xff); // low
        }
      }
      resolve(Uint8Array.from(imageData));
    });
  });
}
