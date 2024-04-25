import { pythonGenerator } from './generator';

pythonGenerator['text'] = (block) => {
  const textValue = block.getFieldValue('TEXT');
  const code = isNaN(textValue) ? pythonGenerator.quote_(textValue) : +textValue;
  return [code, pythonGenerator.ORDER_ATOMIC];
};
