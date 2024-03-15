import { useEditor } from '@blockcode/core';
import { Text } from '@blockcode/ui';

export default function PaintText() {
  const { selectedIndex } = useEditor();
  if (selectedIndex === -1) {
    return (
      <Text
        id="arcade.pixelPaint.default"
        defaultMessage="Painter"
      />
    );
  }

  if (selectedIndex === 0) {
    return (
      <Text
        id="arcade.pixelPaint.backdrops"
        defaultMessage="Backdrops"
      />
    );
  }

  return (
    <Text
      id="arcade.pixelPaint.costumes"
      defaultMessage="Costumes"
    />
  );
}
