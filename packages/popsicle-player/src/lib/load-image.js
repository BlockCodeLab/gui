export default function (asset) {
  return new Promise(async (resolve) => {
    const image = new globalThis.Image();
    image.src = `data:${asset.type};base64,${asset.data}`;
    image.addEventListener('load', () => resolve(image));
  });
}
