import { VIEW_WIDTH, VIEW_HEIGHT } from './default-project';

export default function (file) {
  return new Promise(async (resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const image = new Image();
      image.src = reader.result;
      image.addEventListener('load', () => {
        if (image.width > VIEW_WIDTH || image.height > VIEW_HEIGHT) {
          const sw = image.width / VIEW_WIDTH;
          const sh = image.height / VIEW_HEIGHT;

          let w = VIEW_WIDTH;
          let h = VIEW_HEIGHT;
          if (sw > sh) {
            h = image.height / sw;
          } else {
            w = image.width / sh;
          }

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, w, h);
          image.src = canvas.toDataURL(file.type);
          return;
        }
        resolve(image);
      });
    });
  });
}

export function loadImageFromAsset(asset) {
  return new Promise(async (resolve) => {
    const image = new Image();
    image.src = typeof asset === 'string' ? asset : `data:${asset.type};base64,${asset.data}`;
    image.addEventListener('load', () => resolve(image));
  });
}
