import { ScratchBlocks } from '@blockcode/blocks-editor';

ScratchBlocks.Blocks['event_whengreaterthan'] = {
  /**
   * Block for when timer motion is greater than the value.
   * @this Blockly.Block
   */
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
  /**
   * Block to send a broadcast.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      id: 'event_whenkeypressed',
      message0: ScratchBlocks.Msg.EVENT_WHENKEYPRESSED,
      args0: [
        {
          type: 'field_dropdown',
          name: 'KEY_OPTION',
          options: [
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_SPACE, 'space'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_UP, 'up arrow'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_DOWN, 'down arrow'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_RIGHT, 'right arrow'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_LEFT, 'left arrow'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_ANY, 'any'],
          ],
        },
      ],
      category: ScratchBlocks.Categories.event,
      extensions: ['colours_event', 'shape_hat'],
    });
  },
};
