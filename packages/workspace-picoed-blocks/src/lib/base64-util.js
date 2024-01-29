const { atob, btoa } = window;

export const base64ToUint8Array = (base64) => {
  const binary = atob(base64);
  const len = binary.length;
  const array = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return array;
};

export const uint8ArrayToBase64 = (array) => {
  return btoa(String.fromCharCode.apply(null, array));
};

export const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};
