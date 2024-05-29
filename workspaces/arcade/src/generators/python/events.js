import { ScratchBlocks } from '@blockcode/blocks-editor';
import { pythonGenerator } from '@blockcode/workspace-blocks/app';

pythonGenerator['event_whenkeypressed'] = (block) => {
  const keyValue = block.getFieldValue('KEY_OPTION');
  const hatCode = pythonGenerator.hatToCode('keypressed', 'target');
  return `${hatCode}runtime.when_keypressed("${keyValue}", ${pythonGenerator.HAT_FUNCTION_PLACEHOLDER}, target)\n`;
};

pythonGenerator['event_whenbackdropswitchesto'] = (block) => {
  const backdropValue = block.getFieldValue('BACKDROP');
  const hatCode = pythonGenerator.hatToCode('backdropswitchesto', 'target');
  return `${hatCode}runtime.when_backdropswitchesto("${backdropValue}", ${pythonGenerator.HAT_FUNCTION_PLACEHOLDER}, target)\n`;
};

pythonGenerator['event_whenbroadcastreceived'] = (block) => {
  const messageName = pythonGenerator.variableDB_.getName(
    block.getFieldValue('BROADCAST_OPTION'),
    ScratchBlocks.Variables.NAME_TYPE,
  );
  const hatCode = pythonGenerator.hatToCode('broadcastreceived', 'target');
  return `${hatCode}runtime.when_broadcastreceived("${messageName}", ${pythonGenerator.HAT_FUNCTION_PLACEHOLDER}, target)\n`;
};
