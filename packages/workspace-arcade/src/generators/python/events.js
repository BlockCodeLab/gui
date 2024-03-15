import { pythonGenerator } from '@blockcode/workspace-blocks';

pythonGenerator['event_whenkeypressed'] = (block) => {
  const keyCode = block.getFieldValue('KEY_OPTION');
  const hatCode = pythonGenerator.hatToCode('key_pressed');
  return `${hatCode}when_key_pressed("${keyCode}",${pythonGenerator.HAT_FUNCTION_PLACEHOLDER})\n`;
};

pythonGenerator['event_whenbackdropswitchesto'] = (block) => {
  const backdropCode = block.getFieldValue('BACKDROP');
  const hatCode = pythonGenerator.hatToCode('backdrop_switches_to');
  return `${hatCode}when_backdrop_switches_to("${backdropCode}",${pythonGenerator.HAT_FUNCTION_PLACEHOLDER})\n`;
};
