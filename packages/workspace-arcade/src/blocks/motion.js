import { ScratchBlocks } from '@blockcode/blocks-editor';

ScratchBlocks.Blocks['motion_pointtowards_menu'] = {
  init() {
    this.jsonInit({
      message0: '%1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'TOWARDS',
          options: [[ScratchBlocks.Msg.MOTION_POINTTOWARDS_RANDOM, '_random_']],
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
          options: [[ScratchBlocks.Msg.MOTION_GOTO_RANDOM, '_random_']],
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
          options: [[ScratchBlocks.Msg.MOTION_GLIDETO_RANDOM, '_random_']],
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
