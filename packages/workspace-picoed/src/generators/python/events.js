import { pythonGenerator } from '@blockcode/workspace-blocks';

pythonGenerator['event_whenkeypressed'] = (block) => {
  const keyCode = block.getFieldValue('KEY_OPTION');
  const hatCode = pythonGenerator.hatToCode('key_pressed');
  return `${hatCode}when_key_pressed("${keyCode}",${pythonGenerator.HAT_FUNCTION_PLACEHOLDER})\n`;
};
