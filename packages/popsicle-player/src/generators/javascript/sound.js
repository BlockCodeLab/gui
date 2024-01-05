import { javascriptGenerator } from './generator';

javascriptGenerator['sound_sounds_menu'] = (block) => {
  const soundName = block.getFieldValue('SOUND_MENU');
  return [soundName, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['sound_play'] = (block) => {
  let code = '';

  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const soundName = javascriptGenerator.valueToCode(block, 'SOUND_MENU', javascriptGenerator.ORDER_NONE) || 'SILENT';

  code += `async_run(sound.play_async(Music.${soundName}))\n`;
  return code;
};

javascriptGenerator['sound_playuntildone'] = (block) => {
  let code = '';

  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const soundName = javascriptGenerator.valueToCode(block, 'SOUND_MENU', javascriptGenerator.ORDER_NONE) || 'SILENT';

  code += `await sound.play_async(Music.${soundName})\n`;
  return code;
};

javascriptGenerator['sound_stopallsounds'] = (block) => {
  let code = '';

  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  code += `await sound.stop()\n`;
  return code;
};

javascriptGenerator['sound_seteffectto'] = (block) => {};

javascriptGenerator['sound_changeeffectby'] = (block) => {};

javascriptGenerator['sound_cleareffects'] = (block) => {
  let code = '';

  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  code += 'sound.reset()\n';
  return code;
};
