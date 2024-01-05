import { pythonGenerator } from '@blockcode/blocks-editor';

import '../../blocks/event';

pythonGenerator['event_whenflagclicked'] = (block) => {
  let code = '';
  const [functionName, functionCode] = pythonGenerator.functionToCode('start');

  code += `${functionCode}when_start(${functionName})\n`;
  return code;
};
