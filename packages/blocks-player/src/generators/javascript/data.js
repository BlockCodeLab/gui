import { ScratchBlocks } from '@blockcode/blocks-editor';
import { javascriptGenerator } from './generator';

javascriptGenerator['data_variable'] = (block) => {
  const variableName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  return [`${variableName}.value`, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['data_setvariableto'] = (block) => {
  const variableName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  const variableValue = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE) || '0';
  return `${variableName}.set(${variableValue})\n`;
};

javascriptGenerator['data_changevariableby'] = (block) => {
  const variableName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  const variableValue = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE) || '0';
  return `${variableName}.inc(${variableValue})\n`;
};

javascriptGenerator['data_listcontents'] = (block) => {};

javascriptGenerator['data_listindexall'] = (block) => {};

javascriptGenerator['data_listindexrandom'] = (block) => {};

javascriptGenerator['data_addtolist'] = (block) => {};

javascriptGenerator['data_deleteoflist'] = (block) => {};

javascriptGenerator['data_insertatlist'] = (block) => {};

javascriptGenerator['data_replaceitemoflist'] = (block) => {};

javascriptGenerator['data_itemoflist'] = (block) => {};

javascriptGenerator['data_itemnumoflist'] = (block) => {};

javascriptGenerator['data_lengthoflist'] = (block) => {};

javascriptGenerator['data_listcontainsitem'] = (block) => {};
