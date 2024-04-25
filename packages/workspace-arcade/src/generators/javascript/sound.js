import { javascriptGenerator } from '@blockcode/blocks-player';

javascriptGenerator['sound_sounds_menu'] = (block) => {
  return [block.getFieldValue('SOUND_MENU'), javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['sound_play'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const soundCode = javascriptGenerator.valueToCode(block, 'SOUND_MENU', javascriptGenerator.ORDER_NONE) || 'SILENT';
  code += `runtime.tone.play(runtime.Music.${soundCode})\n`;
  return code;
};

javascriptGenerator['sound_playuntildone'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const soundCode = javascriptGenerator.valueToCode(block, 'SOUND_MENU', javascriptGenerator.ORDER_NONE) || 'SILENT';
  code += `await runtime.tone.play(runtime.Music.${soundCode})\n`;
  return code;
};

javascriptGenerator['sound_stopallsounds'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  code += `await runtime.tone.stop()\n`;
  return code;
};
