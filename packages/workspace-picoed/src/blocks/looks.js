import { ScratchBlocks } from '@blockcode/blocks-editor';

ScratchBlocks.Blocks['looks_led'] = {
  init() {
    this.jsonInit({
      message0: '将 LED 状态设为 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'STATUS',
          options: [
            ['on', '1'],
            ['off', '0'],
          ],
        },
      ],
      category: ScratchBlocks.Categories.looks,
      extensions: ['colours_sounds', 'shape_statement'],
    });
  },
};

ScratchBlocks.Blocks['looks_text'] = {
  init() {
    this.jsonInit({
      message0: '显示文本 %1',
      args0: [
        {
          type: 'input_value',
          name: 'MESSAGE',
        },
      ],
      category: ScratchBlocks.Categories.looks,
      extensions: ['colours_sounds', 'shape_statement'],
    });
  },
};
