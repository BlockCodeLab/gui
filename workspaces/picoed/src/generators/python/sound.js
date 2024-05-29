import { pythonGenerator } from '@blockcode/workspace-blocks/app';

pythonGenerator['sound_sounds_menu'] = (block) => {
  const soundName = block.getFieldValue('SOUND_MENU');
  return [soundName, pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator['sound_play'] = (block) => {
  let code = '';

  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const soundName = pythonGenerator.valueToCode(block, 'SOUND_MENU', pythonGenerator.ORDER_NONE) || 'SILENT';

  code += `async_run(sound.play_async(Music.${soundName}))\n`;
  return code;
};

pythonGenerator['sound_playuntildone'] = (block) => {
  let code = '';

  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const soundName = pythonGenerator.valueToCode(block, 'SOUND_MENU', pythonGenerator.ORDER_NONE) || 'SILENT';

  code += `await sound.play_async(Music.${soundName})\n`;
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

pythonGenerator['sound_seteffectto'] = (block) => {};

pythonGenerator['sound_changeeffectby'] = (block) => {};

pythonGenerator['sound_cleareffects'] = (block) => {
  let code = '';

  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  code += 'sound.reset()\n';
  return code;
};
