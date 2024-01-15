import { javascriptGenerator } from '@blockcode/blocks-player';

import './javascript/control';
import './javascript/event';
import './javascript/looks';
import './javascript/motion';
import './javascript/sensing';
import './javascript/sound';

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
      code = code.replace(`/* nextCode */`, `\n${nextCode}`);
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
