import { javascriptGenerator } from './generator';

javascriptGenerator['text'] = (block) => {
  const textValue = block.getFieldValue('TEXT');
  const code = isNaN(textValue) ? javascriptGenerator.quote_(textValue) : +textValue;
  return [code, javascriptGenerator.ORDER_ATOMIC];
};
