import { ScratchBlocks } from '@blockcode/blocks-editor';
import { javascriptGenerator } from './generator';

javascriptGenerator['event_whenflagclicked'] = (block) => {
  return `runtime.on('start', async () => {/* nextCode */});\n`;
};

javascriptGenerator['event_whenkeypressed'] = (block) => {
  let code = '';
  const keyCode = block.getFieldValue('KEY_OPTION');
  code += `runtime.on('keypressed_${keyCode}', async () => {/* nextCode */});\n`;
  return code;
};

javascriptGenerator['event_whenbackdropswitchesto'] = (block) => {
  let code = '';
  const backdropCode = block.getFieldValue('BACKDROP');
  code += `runtime.on('backdropswitchesto_${backdropCode}', async () => {/* nextCode */});\n`;
  return code;
};

javascriptGenerator['event_whengreaterthan'] = (block) => {};

javascriptGenerator['event_whenbroadcastreceived'] = (block) => {
  let code = '';
  const messageName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('BROADCAST_OPTION'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  code += `sprite.util.received('${messageName}', async (sprite) => {/* nextCode */});\n`;
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
  const messageName =
    javascriptGenerator.valueToCode(block, 'BROADCAST_INPUT', javascriptGenerator.ORDER_NONE) || 'None';
  return `runtime.broadcast('${messageName}')\n`;
};

javascriptGenerator['event_broadcastandwait'] = (block) => {
  const messageName =
    javascriptGenerator.valueToCode(block, 'BROADCAST_INPUT', javascriptGenerator.ORDER_NONE) || 'None';
  return `await runtime.broadcast('${messageName}')\n`;
};
