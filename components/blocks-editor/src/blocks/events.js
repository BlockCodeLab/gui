import ScratchBlocks from '../scratch-blocks';

ScratchBlocks.Blocks['event_whenflagclicked'] = {
  init() {
    this.jsonInit({
      id: 'event_whenflagclicked',
      message0: ScratchBlocks.Msg.EVENT_WHENPROGRAMSTART,
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
