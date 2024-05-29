import { arrayBufferToBase64 } from './base64-util';

export default function (file) {
  return new Promise(async (resolve) => {
    const data = arrayBufferToBase64(await file.arrayBuffer());
    const image = new Image();
    image.src = `data:${file.type};base64,${data}`;
    image.addEventListener('load', () => resolve(image));
  });
}
