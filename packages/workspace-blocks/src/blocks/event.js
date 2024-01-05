import { ScratchBlocks } from '@blockcode/blocks-editor';

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
