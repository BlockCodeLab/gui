import { ScratchBlocks } from '@blockcode/blocks-editor';
import { javascriptGenerator } from '@blockcode/blocks-player';

import './javascript/control';
import './javascript/data';
import './javascript/event';
import './javascript/looks';
import './javascript/motion';
import './javascript/sensing';
import './javascript/sound';
import './javascript/wifi';

javascriptGenerator.init = function (workspace) {
  // Create a dictionary of definitions to be printed before the code.
  javascriptGenerator.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  javascriptGenerator.functionNames_ = Object.create(null);

  if (!javascriptGenerator.variableDB_) {
    javascriptGenerator.variableDB_ = new ScratchBlocks.Names(javascriptGenerator.RESERVED_WORDS_);
  } else {
    javascriptGenerator.variableDB_.reset();
  }

  javascriptGenerator.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add user variables.
  var variables = workspace.getAllVariables();
  for (var i = 0; i < variables.length; i++) {
    if (variables[i].type === ScratchBlocks.BROADCAST_MESSAGE_VARIABLE_TYPE) {
      continue;
    }

    const varTarget = variables[i].isLocal ? 'target.data' : 'stage.data';
    let varName = javascriptGenerator.variableDB_.getName(variables[i].getId(), ScratchBlocks.Variables.NAME_TYPE);
    let varValue = '0';
    if (variables[i].type === ScratchBlocks.LIST_VARIABLE_TYPE) {
      varName = `${varName}${ScratchBlocks.LIST_VARIABLE_TYPE}`;
      varValue = '[]';
    }
    defvars.push(`${varTarget}['$${varName}'] = ${varValue}`);
  }

  // Add developer variables (not created or named by the user).
  var devVarList = ScratchBlocks.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    let varName = javascriptGenerator.variableDB_.getName(variables[i].getId(), ScratchBlocks.Variables.NAME_TYPE);
    let varValue = '0';
    if (variables[i].type === ScratchBlocks.LIST_VARIABLE_TYPE) {
      varName = `${varName}${ScratchBlocks.LIST_VARIABLE_TYPE}`;
      varValue = '[]';
    }
    defvars.push(`stage.data['$${varName}'] = ${varValue}`);
  }

  // Declare all of the variables.
  if (defvars.length) {
    javascriptGenerator.definitions_['variables'] = defvars.join('\n');
  }
};
