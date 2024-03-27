import { ScratchBlocks } from '@blockcode/blocks-editor';
import { javascriptGenerator } from '@blockcode/blocks-player';

javascriptGenerator['event_whenkeypressed'] = (block) => {
  const keyCode = block.getFieldValue('KEY_OPTION');
  return `runtime.when('keypressed_${keyCode}', async function anonymous(done) {/* nextCode */  done()\n});\n`;
};

javascriptGenerator['event_whenbackdropswitchesto'] = (block) => {
  const backdropCode = block.getFieldValue('BACKDROP');
  return `runtime.whenBackdropSwitchesTo('${backdropCode}', async function anonymous(done) => {/* nextCode */  done()\n});\n`;
};

javascriptGenerator['event_whenbroadcastreceived'] = (block) => {
  const messageName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('BROADCAST_OPTION'),
    ScratchBlocks.Variables.NAME_TYPE,
  );
  return `runtime.when('${messageName}', async function anonymous(done) {/* nextCode */  done()\n});\n`;
};
