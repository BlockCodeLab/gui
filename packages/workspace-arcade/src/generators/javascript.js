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

javascriptGenerator.scrub_ = function (block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = ScratchBlocks.utils.wrap(comment, javascriptGenerator.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += '/**\n' + javascriptGenerator.prefixLines(comment + '\n', ' * ') + ' */\n';
      } else {
        commentCode += javascriptGenerator.prefixLines(comment + '\n', '// ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == ScratchBlocks.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = javascriptGenerator.allNestedComments(childBlock);
          if (comment) {
            commentCode += javascriptGenerator.prefixLines(comment, '// ');
          }
        }
      }
    }
  }

  if (block.startHat_) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    let nextCode = javascriptGenerator.blockToCode(nextBlock);
    if (nextCode) {
      nextCode = javascriptGenerator.prefixLines(`counter++;\n${nextCode}counter--;\n`, javascriptGenerator.INDENT);
      code = code.replace(javascriptGenerator.HAT_CODE, nextCode);
    }
    return commentCode + code;
  }

  if (block.parentBlock_) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = javascriptGenerator.blockToCode(nextBlock);
    return commentCode + code + nextCode;
  }

  return '';
};
