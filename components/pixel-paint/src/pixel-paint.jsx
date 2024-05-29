import { useEditor } from '@blockcode/core';

import Selector from './components/selector/selector';
import Painter from './components/painter/painter';

import styles from './pixel-paint.module.css';

export function PixelPaint({ onSetupLibrary }) {
  const { fileList, assetList, selectedIndex } = useEditor();

  let imageList = assetList.filter((asset) => /^image\//.test(asset.type));
  let mode = 'image';

  const target = fileList[selectedIndex];
  if (target && target.assets && target.frame != null) {
    imageList = imageList.filter((image) => target.assets.includes(image.id));
    mode = selectedIndex === 0 ? 'backdrop' : 'costume';
  }

  return (
    <div className={styles.pixelPaintWrapper}>
      <Selector
        mode={mode}
        imageList={imageList}
        imageIndex={target.frame}
        onSetupLibrary={onSetupLibrary}
      />

      <Painter
        mode={mode}
        imageIndex={target.frame}
        imageList={imageList}
      />
    </div>
  );
}
