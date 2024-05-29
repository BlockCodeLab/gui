import { pythonGenerator } from '@blockcode/workspace-blocks/app';

pythonGenerator['event_whenkeypressed'] = (block) => {
  // key pressed
  let code = '';

  const keyCode = block.getFieldValue('KEY_OPTION');
  const [functionName, functionCode] = pythonGenerator.functionToCode('key_pressed');

  code += `${functionCode}when_key_pressed("${keyCode}",${functionName}\n`;
  return code;
};

pythonGenerator['event_whenbackdropswitchesto'] = (block) => {
  // switch backdrop
  let code = '';

  const backdropCode = block.getFieldValue('BACKDROP');
  const [functionName, functionCode] = pythonGenerator.functionToCode('backdrop_switches_to');

  code += `${functionCode}when_backdrop_switches_to("${backdropCode}",${functionName})\n`;
  return code;
};
