import { ScratchBlocks } from '@blockcode/blocks-editor';
import { pythonGenerator } from './generator';

pythonGenerator['data_variable'] = (block) => {
  const variableName = pythonGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  return [`${variableName}.value`, pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator['data_setvariableto'] = (block) => {
  const variableName = pythonGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  const variableValue = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_NONE) || '0';
  return `${variableName}.set(${variableValue})\n`;
};

pythonGenerator['data_changevariableby'] = (block) => {
  const variableName = pythonGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  const variableValue = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_NONE) || '0';
  return `${variableName}.inc(${variableValue})\n`;
};

pythonGenerator['data_listcontents'] = (block) => {};

// pythonGenerator['data_listindexall'] = (block) => {};

// pythonGenerator['data_listindexrandom'] = (block) => {};

pythonGenerator['data_addtolist'] = (block) => {};

pythonGenerator['data_deleteoflist'] = (block) => {};

pythonGenerator['data_deletealloflist'] = (block) => {};

pythonGenerator['data_insertatlist'] = (block) => {};

pythonGenerator['data_replaceitemoflist'] = (block) => {};

pythonGenerator['data_itemoflist'] = (block) => {};

pythonGenerator['data_itemnumoflist'] = (block) => {};

pythonGenerator['data_lengthoflist'] = (block) => {};

pythonGenerator['data_listcontainsitem'] = (block) => {};
