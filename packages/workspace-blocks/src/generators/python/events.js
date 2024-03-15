import { ScratchBlocks } from '@blockcode/blocks-editor';
import { pythonGenerator } from './generator';

pythonGenerator['event_whenflagclicked'] = (block) => {
  const hatCode = pythonGenerator.hatToCode('start');
  return `${hatCode}when_start(${pythonGenerator.HAT_FUNCTION_PLACEHOLDER})\n`;
};

pythonGenerator['event_whengreaterthan'] = (block) => {};

pythonGenerator['event_whenbroadcastreceived'] = (block) => {
  const messageName = pythonGenerator.variableDB_.getName(
    block.getFieldValue('BROADCAST_OPTION'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  const hatCode = pythonGenerator.hatToCode('broadcast_received', 'sprite');
  return `${hatCode}when_broadcast_received("${messageName}", ${pythonGenerator.HAT_FUNCTION_PLACEHOLDER}, sprite)\n`;
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
