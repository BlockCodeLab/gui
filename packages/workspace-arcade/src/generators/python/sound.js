import { pythonGenerator } from '@blockcode/workspace-blocks';

pythonGenerator['sound_sounds_menu'] = (block) => {
  return [block.getFieldValue('SOUND_MENU'), pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator['sound_play'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  const soundCode = pythonGenerator.valueToCode(block, 'SOUND_MENU', pythonGenerator.ORDER_NONE) || 'SILENT';
  code += `async_run(sound.play_async(Music.${soundCode}))\n`;
  return code;
};

pythonGenerator['sound_playuntildone'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  const soundCode = pythonGenerator.valueToCode(block, 'SOUND_MENU', pythonGenerator.ORDER_NONE) || 'SILENT';
  code += `await sound.play_async(Music.${soundCode})\n`;
  return code;
};

pythonGenerator['sound_stopallsounds'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  code += `await sound.stop()\n`;
  return code;
};
