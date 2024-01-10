import { ScratchBlocks } from '@blockcode/blocks-editor';

ScratchBlocks.Blocks['event_whenflagclicked'] = {
  init() {
    this.jsonInit({
      message0: ScratchBlocks.Msg.EVENT_WHENFLAGCLICKED,
      args0: [
        {
          type: 'field_image',
          src: ScratchBlocks.mainWorkspace.options.pathToMedia + 'green-flag.svg',
          width: 24,
          height: 24,
          alt: 'flag',
        },
      ],
      category: ScratchBlocks.Categories.event,
      extensions: ['colours_event', 'shape_hat'],
    });
  },
};

ScratchBlocks.Blocks['event_whengreaterthan'] = {
  init() {
    this.jsonInit({
      message0: ScratchBlocks.Msg.EVENT_WHENGREATERTHAN,
      args0: [
        {
          type: 'field_dropdown',
          name: 'WHENGREATERTHANMENU',
          options: [[ScratchBlocks.Msg.EVENT_WHENGREATERTHAN_TIMER, 'TIMER']],
        },
        {
          type: 'input_value',
          name: 'VALUE',
        },
      ],
      category: ScratchBlocks.Categories.event,
      extensions: ['colours_event', 'shape_hat'],
    });
  },
};

ScratchBlocks.Blocks['event_whenkeypressed'] = {
  init() {
    this.jsonInit({
      message0: ScratchBlocks.Msg.EVENT_WHENKEYPRESSED,
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
      category: ScratchBlocks.Categories.event,
      extensions: ['colours_event', 'shape_hat'],
    });
  },
};
