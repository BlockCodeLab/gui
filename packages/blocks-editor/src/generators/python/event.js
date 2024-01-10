import ScratchBlocks from '../../scratch-blocks';
import { pythonGenerator } from './generator';

pythonGenerator['event_whenflagclicked'] = (block) => {
  let code = '';
  const [functionName, functionCode] = pythonGenerator.functionToCode('start');
  code += `${functionCode}when_start(${functionName})\n`;
  return code;
};

pythonGenerator['event_whenbroadcastreceived'] = (block) => {
  let code = '';

  const messageName = pythonGenerator.variableDB_.getName(
    block.getFieldValue('BROADCAST_OPTION'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  const [functionName, functionCode] = pythonGenerator.functionToCode('broadcast_received', 'sprite');

  code += `${functionCode}when_broadcast_received("${messageName}",${functionName},sprite)\n`;
  return code;
};

pythonGenerator['event_broadcast_menu'] = (block) => {
  const messageName = pythonGenerator.variableDB_.getName(
    block.getFieldValue('BROADCAST_OPTION'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  return [messageName, pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator['event_broadcast'] = (block) => {
  const messageName = pythonGenerator.valueToCode(block, 'BROADCAST_INPUT', pythonGenerator.ORDER_NONE) || 'None';
  return `broadcast_message("${messageName}")\n`;
};

pythonGenerator['event_broadcastandwait'] = (block) => {
  const messageName = pythonGenerator.valueToCode(block, 'BROADCAST_INPUT', pythonGenerator.ORDER_NONE) || 'None';
  return `await broadcast_message("${messageName}")\n`;
};
