import { ScratchBlocks } from '@blockcode/blocks-editor';

ScratchBlocks.Blocks['sensing_touchingobjectmenu'] = {
  /**
   * "Touching [Object]" Block Menu.
   * @this Blockly.Block
   */
  init() {
    this.jsonInit({
      message0: '%1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'TOUCHINGOBJECTMENU',
          options: [[ScratchBlocks.Msg.SENSING_TOUCHINGOBJECT_EDGE, '_edge_']],
        },
      ],
      extensions: ['colours_sensing', 'output_string'],
    });
  },
};

ScratchBlocks.Blocks['sensing_distancetomenu'] = {
  /**
   * "Distance to [Object]" Block Menu.
   * @this Blockly.Block
   */
  init() {
    this.jsonInit({
      message0: '%1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'DISTANCETOMENU',
          options: [[ScratchBlocks.Msg.SENSING_TOUCHINGOBJECT_EDGE, '_edge_']],
        },
      ],
      extensions: ['colours_sensing', 'output_string'],
    });
  },
};

ScratchBlocks.Blocks['sensing_keyoptions'] = {
  /**
   * Options for Keys
   * @this Blockly.Block
   */
  init() {
    this.jsonInit({
      message0: '%1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'KEY_OPTION',
          options: [
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_SPACE, 'space'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_UP, 'up arrow'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_DOWN, 'down arrow'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_LEFT, 'left arrow'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_RIGHT, 'right arrow'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_ANY, 'any'],
          ],
        },
      ],
      extensions: ['colours_sensing', 'output_string'],
    });
  },
};

ScratchBlocks.Blocks['sensing_of'] = {
  /**
   * Block to report properties of sprites.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: ScratchBlocks.Msg.SENSING_OF,
      args0: [
        {
          type: 'field_dropdown',
          name: 'PROPERTY',
          options: [
            [ScratchBlocks.Msg.SENSING_OF_XPOSITION, 'x position'],
            [ScratchBlocks.Msg.SENSING_OF_YPOSITION, 'y position'],
            [ScratchBlocks.Msg.SENSING_OF_DIRECTION, 'direction'],
            [ScratchBlocks.Msg.SENSING_OF_COSTUMENUMBER, 'costume #'],
            [ScratchBlocks.Msg.SENSING_OF_COSTUMENAME, 'costume name'],
            [ScratchBlocks.Msg.SENSING_OF_SIZE, 'size'],
            [ScratchBlocks.Msg.SENSING_OF_BACKDROPNUMBER, 'backdrop #'],
            [ScratchBlocks.Msg.SENSING_OF_BACKDROPNAME, 'backdrop name'],
          ],
        },
        {
          type: 'input_value',
          name: 'OBJECT',
        },
      ],
      output: true,
      category: ScratchBlocks.Categories.sensing,
      outputShape: ScratchBlocks.OUTPUT_SHAPE_ROUND,
      extensions: ['colours_sensing'],
    });
  },
};
