import { useState } from 'preact/hooks';
import { useEditor } from '@blockcode/core';

import Selector from './components/selector/selector';
import Painter from './components/painter/painter';

import styles from './pixel-paint.module.css';

export function PixelPaint({ onShowAlert, onHideAlert, onSetupLibrary }) {
  const [imageIndex, setImageIndex] = useState();
  const { fileList, assetList, selectedIndex } = useEditor();

  let imageList = assetList.filter((asset) => /^image\//.test(asset.type));
  let mode = 'image';

  const target = fileList[selectedIndex];
  if (target && target.assets && target.frame != null) {
    imageList = imageList.filter((image) => target.assets.includes(image.id));
    mode = selectedIndex === 0 ? 'backdrop' : 'costume';
    if (imageIndex !== target.frame) {
      setImageIndex(target.frame);
    }
  }

  return (
    <div className={styles.pixelPaintWrapper}>
      <Selector
        mode={mode}
        imageList={imageList}
        imageIndex={imageIndex}
        onSelect={setImageIndex}
        onShowAlert={onShowAlert}
        onHideAlert={onHideAlert}
        onSetupLibrary={onSetupLibrary}
      />

      <Painter
        mode={mode}
        imageIndex={imageIndex}
        imageList={imageList}
      />
    </div>
  );
}
