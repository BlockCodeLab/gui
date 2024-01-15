import { pythonGenerator } from './generator';

pythonGenerator['text'] = (block) => {
  // Text value.
  const code = pythonGenerator.quote_(block.getFieldValue('TEXT'));
  return [code, pythonGenerator.ORDER_ATOMIC];
};
