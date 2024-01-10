import { pythonGenerator } from '@blockcode/blocks-editor';

pythonGenerator['event_whenkeypressed'] = (block) => {
  let code = '';
  const keyCode = block.getFieldValue('KEY_OPTION');
  const [functionName, functionCode] = pythonGenerator.functionToCode('key_pressed');
  code += `${functionCode}when_key_pressed("${keyCode}",${functionName}\n`;
  return code;
};

pythonGenerator['event_whengreaterthan'] = (block) => {};
