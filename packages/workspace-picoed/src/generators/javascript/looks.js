import { javascriptGenerator } from '@blockcode/blocks-player';

javascriptGenerator['looks_led_state'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const state = block.getFieldValue('STATE');
  code += `runtime.led = ${state};\n`;
  return code;
};

javascriptGenerator['looks_text'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const textValue = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_NONE) || 'Hello!';
  code += `await runtime.scroll(${textValue});\n`;
  return code;
};
