import { Point } from './point';

export function uploadImage(file) {
  return new Promise(async (resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const image = new Image();
      image.src = reader.result;
      image.addEventListener('load', () => {
        if (image.width > Point.DrawWidth || image.height > Point.DrawHeight) {
          const sw = image.width / Point.DrawWidth;
          const sh = image.height / Point.DrawHeight;

          let w = Point.DrawWidth;
          let h = Point.DrawHeight;
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
        } else {
          image.dataset.url = image.src;
          resolve(image);
        }
      });
    });
  });
}

export function loadImageFromData(data) {
  return new Promise(async (resolve) => {
    const image = new Image();
    image.src = `data:${data.type};base64,${data.data}`;
    image.addEventListener('load', () => {
      image.dataset.url = image.src;
      resolve(image);
    });
  });
}

export function loadImage(src) {
  return new Promise(async (resolve) => {
    const image = new Image();
    image.src = src;
    image.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, image.width, image.height);
      image.dataset.url = canvas.toDataURL('image/png');
      resolve(image);
    });
  });
}
