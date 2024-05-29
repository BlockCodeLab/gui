import { ScratchBlocks } from '@blockcode/blocks-editor';
import { pythonGenerator } from '@blockcode/workspace-blocks/app';

import './python/events';
import './python/looks';
import './python/sensing';
import './python/sound';

const originalInit = pythonGenerator.init.original_ || pythonGenerator.init;

pythonGenerator.init = function (workspace) {
  originalInit(workspace);

  const defvars = [];
  const variables = workspace.getAllVariables();
  for (let i = 0; i < variables.length; i++) {
    if (variables[i].type === ScratchBlocks.BROADCAST_MESSAGE_VARIABLE_TYPE) {
      continue;
    }
    const variableName = pythonGenerator.variableDB_.getName(variables[i].getId(), ScratchBlocks.Variables.NAME_TYPE);
    const variableValue = variables[i].type === ScratchBlocks.LIST_VARIABLE_TYPE ? '[]' : '0';

    if (variables[i].isCloud) {
      // TODO: cloud variable
    } else if (variables[i].isLocal) {
      defvars[i] = `${variableName}=Variable("${variableName}",${variableValue},sprite)`;
    } else {
      defvars[i] = `${variableName}=Variable("${variableName}",${variableValue},stage)`;
    }
  }

  // Add developer variables (not created or named by the user).
  const devVarList = ScratchBlocks.Variables.allDeveloperVariables(workspace);
  for (let i = 0; i < devVarList.length; i++) {
    defvars.push(
      pythonGenerator.variableDB_.getName(devVarList[i], ScratchBlocks.Names.DEVELOPER_VARIABLE_TYPE) + '=None',
    );
  }

  if (pythonGenerator.additionalDefinitions_) {
    pythonGenerator.additionalDefinitions_.forEach(([key, value]) => {
      if (key.startsWith('create_')) {
        defvars.unshift(value);
      } else {
        pythonGenerator.definitions_[key] = value;
      }
    });
  }
  pythonGenerator.definitions_['variables'] = defvars.join('\n');
};
pythonGenerator.init.original_ = originalInit;
