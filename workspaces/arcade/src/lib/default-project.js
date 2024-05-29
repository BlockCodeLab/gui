import { Text } from '@blockcode/ui';
import RotationStyle from './rotation-style';

export const VIEW_WIDTH = 320;
export const VIEW_HEIGHT = 240;
export const DEFAULT_DIRECTION = 90;

const DEFAULT_BACKDROP = {
  id: '394521f888b163c89f6509a3ab60722a',
  type: 'image/png',
  width: 1,
  height: 1,
  centerX: 1,
  centerY: 1,
  data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC',
};

const DEFAULT_COSTUME_1 = {
  id: 'ca4bae0b042ecff0a4f3fb1a6469c548',
  type: 'image/png',
  width: 63,
  height: 67,
  centerX: 32,
  centerY: 33,
  data: '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',
};

const DEFAULT_COSTUME_2 = {
  id: '5c3d0f003b0c72204407b4beac704be8',
  type: 'image/png',
  width: 61,
  height: 70,
  centerX: 31,
  centerY: 35,
  data: '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',
};

export default {
  assetList: [
    Object.assign(DEFAULT_BACKDROP, {
      name: (
        <Text
          id="arcade.defaultProject.backdropName"
          defaultMessage="backdrop"
        />
      ),
    }),
    Object.assign(DEFAULT_COSTUME_1, {
      name: (
        <>
          <Text
            id="arcade.defaultProject.costumeName"
            defaultMessage="costume"
          />
          1
        </>
      ),
    }),
    Object.assign(DEFAULT_COSTUME_2, {
      name: (
        <>
          <Text
            id="arcade.defaultProject.costumeName"
            defaultMessage="costume"
          />
          2
        </>
      ),
    }),
  ],
  fileList: [
    {
      id: 'stage',
      type: 'text/x-python',
      name: (
        <Text
          id="arcade.defaultProject.stageName"
          defaultMessage="Stage"
        />
      ),
      assets: [DEFAULT_BACKDROP.id],
      frame: 0,
      x: 0,
      y: 0,
    },
    {
      id: 'sprite1',
      type: 'text/x-python',
      name: (
        <>
          <Text
            id="arcade.defaultProject.spriteName"
            defaultMessage="Sprite"
          />
          1
        </>
      ),
      assets: [DEFAULT_COSTUME_1.id, DEFAULT_COSTUME_2.id],
      frame: 0,
      x: 0,
      y: 0,
      size: 100,
      direction: DEFAULT_DIRECTION,
      rotationStyle: RotationStyle.ALL_AROUND,
      hidden: false,
      zIndex: 0,
    },
  ],
};
