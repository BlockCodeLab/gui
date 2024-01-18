import { ScratchBlocks } from '@blockcode/blocks-editor';
import { javascriptGenerator } from './generator';

javascriptGenerator['data_variable'] = (block) => {
  const variableName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  const code = `${variableName}`;
  return [code, javascriptGenerator.ORDER_CONDITIONAL];
};

javascriptGenerator['data_setvariableto'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const variableName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  const variableValue = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE) || 0;
  code += `${variableName} = ${variableValue};\n`;
  return code;
};

javascriptGenerator['data_changevariableby'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const variableName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE
  );
  const variableValue = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE) || 0;
  code += `${variableName} = (isNaN(${variableName}) ? 0 : +${variableName}) + +(${variableValue});\n`;
  return code;
};

javascriptGenerator['data_listcontents'] = (block) => {
  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  return [listName, javascriptGenerator.ORDER_ATOMIC];
};

// javascriptGenerator['data_listindexall'] = (block) => {};

// javascriptGenerator['data_listindexrandom'] = (block) => {};

javascriptGenerator['data_addtolist'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const itemValue = javascriptGenerator.valueToCode(block, 'ITEM', javascriptGenerator.ORDER_NONE) || 0;
  code += `${listName}.push(${itemValue});\n`;
  return code;
};

javascriptGenerator['data_deleteoflist'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const indexValue = (javascriptGenerator.valueToCode(block, 'INDEX', javascriptGenerator.ORDER_NONE) || 0) - 1;

  code += `${indexValue} > -1 && ${listName}.splice(${indexValue}, 1);\n`;
  return code;
};

javascriptGenerator['data_deletealloflist'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;

  code += `${listName}.length = 0;\n`;
  return code;
};

javascriptGenerator['data_insertatlist'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const indexValue = (javascriptGenerator.valueToCode(block, 'INDEX', javascriptGenerator.ORDER_NONE) || 0) - 1;
  const itemValue = javascriptGenerator.valueToCode(block, 'ITEM', javascriptGenerator.ORDER_NONE) || 0;

  code += `${indexValue} > -1 && ${listName}.splice(${indexValue}, 0, ${itemValue});\n`;
  return code;
};

javascriptGenerator['data_replaceitemoflist'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const indexValue = (javascriptGenerator.valueToCode(block, 'INDEX', javascriptGenerator.ORDER_NONE) || 0) - 1;
  const itemValue = javascriptGenerator.valueToCode(block, 'ITEM', javascriptGenerator.ORDER_NONE) || 0;

  code += `${indexValue} > -1 && ${listName}.splice(${indexValue}, 1, ${itemValue});\n`;
  return code;
};

javascriptGenerator['data_itemoflist'] = (block) => {
  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const indexValue = (javascriptGenerator.valueToCode(block, 'INDEX', javascriptGenerator.ORDER_NONE) || 0) - 1;
  const code = `${indexValue} > -1 ? ${listName}[${indexValue}] : ''`;
  return [code, javascriptGenerator.ORDER_CONDITIONAL];
};

javascriptGenerator['data_itemnumoflist'] = (block) => {
  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const itemValue = javascriptGenerator.valueToCode(block, 'ITEM', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${listName}.indexOf(${itemValue}) + 1)`;
  return [code, javascriptGenerator.ORDER_NONE];
};

javascriptGenerator['data_lengthoflist'] = (block) => {
  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  return [`${listName}.length`, javascriptGenerator.ORDER_MEMBER];
};

javascriptGenerator['data_listcontainsitem'] = (block) => {
  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const itemValue = javascriptGenerator.valueToCode(block, 'ITEM', javascriptGenerator.ORDER_NONE) || 0;
  const code = `${listName}.includes(${itemValue})`;
  return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
};
