import { ScratchBlocks } from '@blockcode/blocks-editor';

import '../../blocks/events';
import '../../blocks/motion';
import '../../blocks/sensing';
import '../../blocks/sound';

export default function (assetList, fileList, selectedIndex, getText) {
  const stage = fileList[0];
  const sprite = fileList[selectedIndex];
  const otherSprites = fileList.filter((_, i) => i > 0 && i !== selectedIndex);
  const isStage = selectedIndex === 0;

  const otherSpritesMenu = otherSprites.map((spr) => [spr.name, spr.id]);

  ScratchBlocks.Blocks['motion_pointtowards_menu'] = {
    init() {
      this.jsonInit({
        message0: '%1',
        args0: [
          {
            type: 'field_dropdown',
            name: 'TOWARDS',
            options: [[ScratchBlocks.Msg.MOTION_POINTTOWARDS_RANDOM, '_random_'], ...otherSpritesMenu],
          },
        ],
        colour: ScratchBlocks.Colours.motion.secondary,
        colourSecondary: ScratchBlocks.Colours.motion.secondary,
        colourTertiary: ScratchBlocks.Colours.motion.tertiary,
        colourQuaternary: ScratchBlocks.Colours.motion.quaternary,
        extensions: ['output_string'],
      });
    },
  };

  ScratchBlocks.Blocks['motion_goto_menu'] = {
    init() {
      this.jsonInit({
        message0: '%1',
        args0: [
          {
            type: 'field_dropdown',
            name: 'TO',
            options: [[ScratchBlocks.Msg.MOTION_GOTO_RANDOM, '_random_'], ...otherSpritesMenu],
          },
        ],
        colour: ScratchBlocks.Colours.motion.secondary,
        colourSecondary: ScratchBlocks.Colours.motion.secondary,
        colourTertiary: ScratchBlocks.Colours.motion.tertiary,
        colourQuaternary: ScratchBlocks.Colours.motion.quaternary,
        extensions: ['output_string'],
      });
    },
  };

  ScratchBlocks.Blocks['motion_glideto_menu'] = {
    init() {
      this.jsonInit({
        message0: '%1',
        args0: [
          {
            type: 'field_dropdown',
            name: 'TO',
            options: [[ScratchBlocks.Msg.MOTION_GLIDETO_RANDOM, '_random_'], ...otherSpritesMenu],
          },
        ],
        colour: ScratchBlocks.Colours.motion.secondary,
        colourSecondary: ScratchBlocks.Colours.motion.secondary,
        colourTertiary: ScratchBlocks.Colours.motion.tertiary,
        colourQuaternary: ScratchBlocks.Colours.motion.quaternary,
        extensions: ['output_string'],
      });
    },
  };

  ScratchBlocks.Blocks['looks_costume'] = {
    init() {
      this.jsonInit({
        message0: '%1',
        args0: [
          {
            type: 'field_dropdown',
            name: 'COSTUME',
            options: sprite.assets.map((assetId, i) => {
              const asset = assetList.find(({ id }) => assetId === id);
              return [asset.name, assetId];
            }),
          },
        ],
        colour: ScratchBlocks.Colours.looks.secondary,
        colourSecondary: ScratchBlocks.Colours.looks.secondary,
        colourTertiary: ScratchBlocks.Colours.looks.tertiary,
        colourQuaternary: ScratchBlocks.Colours.looks.quaternary,
        extensions: ['output_string'],
      });
    },
  };

  ScratchBlocks.Blocks['looks_backdrops'] = {
    init() {
      this.jsonInit({
        message0: '%1',
        args0: [
          {
            type: 'field_dropdown',
            name: 'BACKDROP',
            options: stage.assets.map((assetId, i) => {
              const asset = assetList.find(({ id }) => assetId === id);
              return [asset.name, assetId];
            }),
          },
        ],
        colour: ScratchBlocks.Colours.looks.secondary,
        colourSecondary: ScratchBlocks.Colours.looks.secondary,
        colourTertiary: ScratchBlocks.Colours.looks.tertiary,
        colourQuaternary: ScratchBlocks.Colours.looks.quaternary,
        extensions: ['output_string'],
      });
    },
  };

  ScratchBlocks.Blocks['control_create_clone_of_menu'] = {
    init() {
      this.jsonInit({
        message0: '%1',
        args0: [
          {
            type: 'field_dropdown',
            name: 'CLONE_OPTION',
            options: isStage
              ? [...otherSpritesMenu]
              : [[ScratchBlocks.Msg.CONTROL_CREATECLONEOF_MYSELF, '_myself_'], ...otherSpritesMenu],
          },
        ],
        extensions: ['colours_control', 'output_string'],
      });
    },
  };

  ScratchBlocks.Blocks['sensing_touchingobjectmenu'] = {
    init() {
      this.jsonInit({
        message0: '%1',
        args0: [
          {
            type: 'field_dropdown',
            name: 'TOUCHINGOBJECTMENU',
            options: [[ScratchBlocks.Msg.SENSING_TOUCHINGOBJECT_EDGE, '_edge_'], ...otherSpritesMenu],
          },
        ],
        extensions: ['colours_sensing', 'output_string'],
      });
    },
  };

  ScratchBlocks.Blocks['sensing_distancetomenu'] = {
    init() {
      this.jsonInit({
        message0: '%1',
        args0: [
          {
            type: 'field_dropdown',
            name: 'DISTANCETOMENU',
            options: [[ScratchBlocks.Msg.SENSING_OF_DISTANCETO_CENTER, '_center_'], ...otherSpritesMenu],
          },
        ],
        extensions: ['colours_sensing', 'output_string'],
      });
    },
  };
}
