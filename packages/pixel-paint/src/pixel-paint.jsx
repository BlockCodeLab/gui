import { useState, useEffect } from 'preact/hooks';
import { useEditor } from '@blockcode/core';

import Selector from './components/selector/selector';
import Painter from './components/painter/painter';

import styles from './pixel-paint.module.css';

export function PixelPaint() {
  const [assetId, setAssetId] = useState();
  const { fileList, selectedIndex } = useEditor();
  const filters = fileList[selectedIndex] && fileList[selectedIndex].assets;

  return (
    <div className={styles.pixelPaintWrapper}>
      <Selector
        filters={filters}
        onSelect={setAssetId}
      />

      <Painter
        filters={filters}
        assetId={assetId}
      />
    </div>
  );
}
