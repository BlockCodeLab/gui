import { pythonGenerator } from '@blockcode/workspace-blocks/app';

pythonGenerator['sensing_keyoptions'] = (block) => {
  const keyCode = block.getFieldValue('KEY_OPTION');
  return [keyCode, pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator['sensing_keypressed'] = (block) => {
  const keyCode = pythonGenerator.valueToCode(block, 'KEY_OPTION', pythonGenerator.ORDER_NONE) || 'any';
  return [`runtime.${keyCode}Pressed`, pythonGenerator.ORDER_MEMBER];
};
