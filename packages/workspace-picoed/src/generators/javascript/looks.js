import { javascriptGenerator } from '@blockcode/blocks-player';

javascriptGenerator['looks_led'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const status = block.getFieldValue('STATUS');
  code += `runtime.led = ${status};\n`;
  return code;
};

javascriptGenerator['looks_text'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const textValue = javascriptGenerator.valueToCode(block, 'MESSAGE', javascriptGenerator.ORDER_NONE) || 'SILENT';
  code += `await runtime.scroll(${textValue});\n`;
  return code;
};
