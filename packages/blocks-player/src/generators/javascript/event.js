import { ScratchBlocks } from '@blockcode/blocks-editor';
import { javascriptGenerator } from './generator';

javascriptGenerator['event_whenflagclicked'] = (block) => {
  return `runtime.on('start', async function anonymous() {/* nextCode */});\n`;
};

javascriptGenerator['event_whengreaterthan'] = (block) => {};

javascriptGenerator['event_whenbroadcastreceived'] = (block) => {
  const messageName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('BROADCAST_OPTION'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  const code = `runtime.on('${messageName}', async function anonymous(done) {/* nextCode */  done()\n});\n`;
  return code;
};

javascriptGenerator['event_broadcast_menu'] = (block) => {
  const messageName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('BROADCAST_OPTION'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  return [messageName, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['event_broadcast'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const messageName =
    javascriptGenerator.valueToCode(block, 'BROADCAST_INPUT', javascriptGenerator.ORDER_NONE) || 'None';
  code += `runtime.broadcast('${messageName}')\n`;
  return code;
};

javascriptGenerator['event_broadcastandwait'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const messageName =
    javascriptGenerator.valueToCode(block, 'BROADCAST_INPUT', javascriptGenerator.ORDER_NONE) || 'None';
  code += `await runtime.broadcast('${messageName}')\n`;
  return code;
};
