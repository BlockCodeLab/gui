import { arrayBufferToBase64 } from './base64-util';

export default function (file) {
  return new Promise(async (resolve) => {
    const data = arrayBufferToBase64(await file.arrayBuffer());
    const image = new Image();
    image.src = `data:${file.type};base64,${data}`;
    image.addEventListener('load', () => resolve(image));
  });
}

export function loadAsset(asset) {
  return new Promise(async (resolve) => {
    const image = new Image();
    image.src = typeof asset === 'string' ? asset : `data:${asset.type};base64,${asset.data}`;
    image.addEventListener('load', () => resolve(image));
  });
}
