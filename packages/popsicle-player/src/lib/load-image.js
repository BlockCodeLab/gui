export default function (asset) {
  return new Promise(async (resolve) => {
    const image = new Image();
    image.src = typeof asset === 'string' ? asset : `data:${asset.type};base64,${asset.data}`;
    image.addEventListener('load', () => resolve(image));
  });
}
