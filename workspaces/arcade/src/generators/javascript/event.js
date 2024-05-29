import { ScratchBlocks } from '@blockcode/blocks-editor';
import { javascriptGenerator } from '@blockcode/blocks-player';

const HAT_CALLBACK = `async (target, done) => {\ndo {\n${javascriptGenerator.HAT_CODE}} while (false);\ndone();\n}`;

javascriptGenerator['event_whenkeypressed'] = (block) => {
  const keyValue = block.getFieldValue('KEY_OPTION');
  return `runtime.when('keypressed:${keyValue}', ${HAT_CALLBACK}, target);\n`;
};

javascriptGenerator['event_whenbackdropswitchesto'] = (block) => {
  const backdropValue = block.getFieldValue('BACKDROP');
  return `runtime.when('backdropswitchesto:${backdropValue}', ${HAT_CALLBACK}, target);\n`;
};

javascriptGenerator['event_whenbroadcastreceived'] = (block) => {
  const messageName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('BROADCAST_OPTION'),
    ScratchBlocks.Variables.NAME_TYPE,
  );
  return `runtime.when('message:${messageName}', ${HAT_CALLBACK}, target);\n`;
};
