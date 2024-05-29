import { ScratchBlocks } from '@blockcode/blocks-editor';

ScratchBlocks.Blocks['sensing_keyoptions'] = {
  init() {
    this.jsonInit({
      message0: '%1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'KEY_OPTION',
          options: [
            ['A', 'a'],
            ['B', 'b'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_ANY, 'any'],
          ],
        },
      ],
      extensions: ['colours_sensing', 'output_string'],
    });
  },
};
