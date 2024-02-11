import { javascriptGenerator } from '@blockcode/blocks-player';

javascriptGenerator['sensing_keyoptions'] = (block) => {
  const keyCode = block.getFieldValue('KEY_OPTION');
  return [keyCode, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['sensing_keypressed'] = (block) => {
  const keyCode = javascriptGenerator.valueToCode(block, 'KEY_OPTION', javascriptGenerator.ORDER_NONE) || 'any';
  return [`runtime.${keyCode}Pressed`, javascriptGenerator.ORDER_MEMBER];
};
