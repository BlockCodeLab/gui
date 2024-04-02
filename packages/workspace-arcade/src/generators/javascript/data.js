import { ScratchBlocks } from '@blockcode/blocks-editor';
import { javascriptGenerator } from '@blockcode/blocks-player';

javascriptGenerator['data_variable'] = (block) => {
  const variableName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE,
  );
  return [`target.util.variable.${variableName}`, javascriptGenerator.ORDER_CONDITIONAL];
};

javascriptGenerator['data_setvariableto'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const variableName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE,
  );
  const variableValue = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE) || 0;

  const variable = `target.util.variable.${variableName}`;
  code += `${variable} = ${variableValue};\n`;
  return code;
};

javascriptGenerator['data_changevariableby'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const variableName = javascriptGenerator.variableDB_.getName(
    block.getFieldValue('VARIABLE'),
    ScratchBlocks.Variables.NAME_TYPE,
  );
  const variableValue = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE) || 0;

  const variable = `target.util.variable.${variableName}`;
  code += `${variable} = +(${variableValue}) + (isNaN(${variable}) ? 0 : +${variable});\n`;
  return code;
};

javascriptGenerator['data_listcontents'] = (block) => {
  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  return [`target.util.variable.${listName}`, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['data_addtolist'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const itemValue = javascriptGenerator.valueToCode(block, 'ITEM', javascriptGenerator.ORDER_NONE) || 0;

  const list = `target.util.variable.${listName}`;
  code += `${list}.push(${itemValue});\n`;
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

  const list = `target.util.variable.${listName}`;
  code += `${indexValue} > -1 && ${list}.splice(${indexValue}, 1);\n`;
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

  const list = `target.util.variable.${listName}`;
  code += `${list}.length = 0;\n`;
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

  const list = `target.util.variable.${listName}`;
  code += `${indexValue} > -1 && ${list}.splice(${indexValue}, 0, ${itemValue});\n`;
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

  const list = `target.util.variable.${listName}`;
  code += `${indexValue} > -1 && ${list}.splice(${indexValue}, 1, ${itemValue});\n`;
  return code;
};

javascriptGenerator['data_itemoflist'] = (block) => {
  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const indexValue = (javascriptGenerator.valueToCode(block, 'INDEX', javascriptGenerator.ORDER_NONE) || 0) - 1;

  const list = `target.util.variable.${listName}`;
  const code = `(${indexValue} > -1 ? ${list}[${indexValue}] : '')`;
  return [code, javascriptGenerator.ORDER_CONDITIONAL];
};

javascriptGenerator['data_itemnumoflist'] = (block) => {
  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const itemValue = javascriptGenerator.valueToCode(block, 'ITEM', javascriptGenerator.ORDER_NONE) || 0;

  const list = `target.util.variable.${listName}`;
  return [`(${list}.indexOf(${itemValue}) + 1)`, javascriptGenerator.ORDER_NONE];
};

javascriptGenerator['data_lengthoflist'] = (block) => {
  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const list = `target.util.variable.${listName}`;
  return [`${list}.length`, javascriptGenerator.ORDER_MEMBER];
};

javascriptGenerator['data_listcontainsitem'] = (block) => {
  const listName =
    javascriptGenerator.variableDB_.getName(block.getFieldValue('LIST'), ScratchBlocks.Variables.NAME_TYPE) +
    ScratchBlocks.LIST_VARIABLE_TYPE;
  const itemValue = javascriptGenerator.valueToCode(block, 'ITEM', javascriptGenerator.ORDER_NONE) || 0;
  const list = `target.util.variable.${listName}`;
  return [`${list}.includes(${itemValue})`, javascriptGenerator.ORDER_FUNCTION_CALL];
};
