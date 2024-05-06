import { ScratchBlocks } from '@blockcode/blocks-editor';
import { pythonGenerator } from './generator';

pythonGenerator['data_variable'] = (block) => {
  const varName = pythonGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE,
  );
  return [varName, pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator['data_setvariableto'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const varName = pythonGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE,
  );
  const valueCode = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_NONE) || '""';
  code += `${varName} = ${valueCode}\n`;
  return code;
};

pythonGenerator['data_changevariableby'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const varName = pythonGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE,
  );
  const valueCode = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_NONE) || 0;
  code += `${varName} = num(${varName}) + num(${valueCode})\n`;
  return code;
};

pythonGenerator['data_listcontents'] = (block) => {};

pythonGenerator['data_addtolist'] = (block) => {};

pythonGenerator['data_deleteoflist'] = (block) => {};

pythonGenerator['data_deletealloflist'] = (block) => {};

pythonGenerator['data_insertatlist'] = (block) => {};

pythonGenerator['data_replaceitemoflist'] = (block) => {};

pythonGenerator['data_itemoflist'] = (block) => {};

pythonGenerator['data_itemnumoflist'] = (block) => {};

pythonGenerator['data_lengthoflist'] = (block) => {};

pythonGenerator['data_listcontainsitem'] = (block) => {};