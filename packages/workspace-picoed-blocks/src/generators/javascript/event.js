import { javascriptGenerator } from '@blockcode/blocks-player';

javascriptGenerator['event_whenkeypressed'] = (block) => {
  let code = '';
  const keyCode = block.getFieldValue('KEY_OPTION');
  code += `runtime.on('keypressed_${keyCode}', async () => {/* nextCode */});\n`;
  return code;
};
