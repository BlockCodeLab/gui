import { javascriptGenerator } from './generator';

javascriptGenerator['text'] = (block) => {
  const code = javascriptGenerator.quote_(block.getFieldValue('TEXT'));
  return [code, javascriptGenerator.ORDER_ATOMIC];
};
