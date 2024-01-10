import { ScratchBlocks } from '@blockcode/blocks-editor';
import { javascriptGenerator } from '@blockcode/blocks-player';

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
  code += `runtime.received('${messageName}', async (sprite) => {/* nextCode */});\n`;
  return code;
};
