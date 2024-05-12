import { VIEW_WIDTH, VIEW_HEIGHT } from './default-project';

export function uploadImage(file) {
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
        } else {
          image.dataset.url = image.src;
          resolve(image);
        }
      });
    });
  });
}

export function loadImageFromDataURL(dataurl) {
  return new Promise(async (resolve) => {
    const image = new Image();
    image.src = typeof dataurl === 'string' ? dataurl : `data:${dataurl.type};base64,${dataurl.data}`;
    image.addEventListener('load', () => {
      image.dataset.url = image.src;
      resolve(image);
    });
  });
}

export function loadImageWithDataURL(src) {
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
