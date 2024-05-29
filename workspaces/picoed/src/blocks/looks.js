import { ScratchBlocks } from '@blockcode/blocks-editor';

ScratchBlocks.Blocks['looks_led_state'] = {
  init() {
    this.jsonInit({
      message0: ScratchBlocks.Msg.LED_STATE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'STATE',
          options: [
            [ScratchBlocks.Msg.LED_STATE_ON, 'True'],
            [ScratchBlocks.Msg.LED_STATE_OFF, 'False'],
          ],
        },
      ],
      category: ScratchBlocks.Categories.looks,
      extensions: ['colours_sounds', 'shape_statement'],
    });
  },
};

ScratchBlocks.Blocks['looks_toggle_led'] = {
  init() {
    this.jsonInit({
      message0: ScratchBlocks.Msg.LED_TOGGLE,
      category: ScratchBlocks.Categories.looks,
      extensions: ['colours_sounds', 'shape_statement'],
    });
  },
};

ScratchBlocks.Blocks['looks_text'] = {
  init() {
    this.jsonInit({
      message0: ScratchBlocks.Msg.DISPLAY_TEXT,
      args0: [
        {
          type: 'input_value',
          name: 'TEXT',
        },
      ],
      category: ScratchBlocks.Categories.looks,
      extensions: ['colours_sounds', 'shape_statement'],
    });
  },
};

ScratchBlocks.Blocks['looks_brightness'] = {
  init() {
    this.jsonInit({
      message0: ScratchBlocks.Msg.BRIGHTNESS,
      args0: [
        {
          type: 'input_value',
          name: 'BRIGHTNESS',
        },
      ],
      category: ScratchBlocks.Categories.looks,
      extensions: ['colours_sounds', 'shape_statement'],
    });
  },
};

ScratchBlocks.Blocks['looks_xy'] = {
  init() {
    this.jsonInit({
      message0: ScratchBlocks.Msg.DISPLAY_XY,
      args0: [
        {
          type: 'input_value',
          name: 'X',
        },
        {
          type: 'input_value',
          name: 'Y',
        },
        {
          type: 'input_value',
          name: 'BRIGHTNESS',
        },
      ],
      category: ScratchBlocks.Categories.looks,
      extensions: ['colours_sounds', 'shape_statement'],
    });
  },
};
