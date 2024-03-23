const getTop = (imageData) => {
  let i;
  for (let y = 0; y < imageData.height; y++) {
    i = y * imageData.width;
    for (let x = 0; x < imageData.width; x++) {
      if (imageData.data[(i << 2) + 3] !== 0) {
        return y;
      }
      i++;
    }
  }
};

const getBottom = (imageData, top) => {
  let i;
  for (let y = imageData.height - 1; y >= top; y--) {
    i = y * imageData.width;
    for (let x = 0; x < imageData.width; x++) {
      if (imageData.data[(i << 2) + 3] !== 0) {
        return y;
      }
      i++;
    }
  }
};

const getLeft = (imageData, top, bottom) => {
  let i;
  for (let x = 0; x < imageData.width; x++) {
    for (let y = top; y <= bottom; y++) {
      i = y * imageData.width + x;
      if (imageData.data[(i << 2) + 3] !== 0) {
        return x;
      }
    }
  }
};

const getRight = (imageData, top, bottom, left) => {
  let i;
  for (let x = imageData.width - 1; x >= left; x--) {
    for (let y = top; y <= bottom; y++) {
      i = y * imageData.width + x;
      if (imageData.data[(i << 2) + 3] !== 0) {
        return x;
      }
    }
  }
};

export function getBoundingBox(imageData) {
  const top = getTop(imageData);
  const bottom = getBottom(imageData, top);
  const left = getLeft(imageData, top, bottom);
  const right = getRight(imageData, top, bottom, left);

  const boundingBox = {
    top: top || 0,
    left: left || 0,
    right: right || 0,
    bottom: bottom || 0,
  };
  boundingBox.width = boundingBox.right - boundingBox.left + 1;
  boundingBox.height = boundingBox.bottom - boundingBox.top + 1;
  return boundingBox;
}
