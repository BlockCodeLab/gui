import { javascriptGenerator } from './generator';

javascriptGenerator['control_wait'] = (block) => {
  // wait for
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const durationCode = javascriptGenerator.valueToCode(block, 'DURATION', javascriptGenerator.ORDER_NONE);
  code += `await runtime.sleep(${durationCode});\n`;
  return code;
};

javascriptGenerator['control_repeat'] = (block) => {
  // for
  let code = '';
  let timesCode, branchCode;

  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  timesCode = javascriptGenerator.valueToCode(block, 'TIMES', javascriptGenerator.ORDER_NONE) || 'False';
  branchCode = javascriptGenerator.statementToCode(block, 'SUBSTACK') || '';
  if (javascriptGenerator.STATEMENT_SUFFIX) {
    branchCode =
      javascriptGenerator.prefixLines(
        javascriptGenerator.injectId(javascriptGenerator.STATEMENT_SUFFIX, block),
        javascriptGenerator.INDENT
      ) + branchCode;
  }
  code += `for (let _ = 0; _ < ${timesCode}; _++) {\n${branchCode}  if (!runtime.running) break;\n  await runtime.nextFrame();\n}\n`;
  return code;
};

javascriptGenerator['control_forever'] = (block) => {
  // while
  let code = '';
  let branchCode;

  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  branchCode = javascriptGenerator.statementToCode(block, 'SUBSTACK') || '';
  if (javascriptGenerator.STATEMENT_SUFFIX) {
    branchCode =
      javascriptGenerator.prefixLines(
        javascriptGenerator.injectId(javascriptGenerator.STATEMENT_SUFFIX, block),
        javascriptGenerator.INDENT
      ) + branchCode;
  }
  code += `while (true) {\n${branchCode}  if (!runtime.running) break;\n  await runtime.nextFrame();\n}\n`;
  return code;
};

javascriptGenerator['control_if'] = (block) => {
  // if-else
  let code = '';
  let branchCode, conditionCode;

  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  conditionCode = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || 'False';
  branchCode = javascriptGenerator.statementToCode(block, 'SUBSTACK') || '';
  if (javascriptGenerator.STATEMENT_SUFFIX) {
    branchCode =
      javascriptGenerator.prefixLines(
        javascriptGenerator.injectId(javascriptGenerator.STATEMENT_SUFFIX, block),
        javascriptGenerator.INDENT
      ) + branchCode;
  }
  code += `if (${conditionCode}) {\n${branchCode}}`;

  // If has else branch.
  if (block.getInput('SUBSTACK2')) {
    branchCode = javascriptGenerator.statementToCode(block, 'SUBSTACK2') || '';
    if (javascriptGenerator.STATEMENT_SUFFIX) {
      branchCode =
        javascriptGenerator.prefixLines(
          javascriptGenerator.injectId(javascriptGenerator.STATEMENT_SUFFIX, block),
          javascriptGenerator.INDENT
        ) + branchCode;
    }
    code += `else {\n${branchCode}}`;
  }
  return code;
};

javascriptGenerator['control_if_else'] = javascriptGenerator['control_if'];

javascriptGenerator['control_wait_until'] = (block) => {
  // wait until
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const conditionCode = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || 'False';
  code += `while (!(${conditionCode})) {\n  if (!runtime.running) break;\n  await runtime.nextFrame();\n}\n`;
  return code;
};

javascriptGenerator['control_repeat_until'] = (block) => {
  // while not
  let code = '';
  let branchCode, conditionCode;

  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  conditionCode = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || 'False';
  branchCode = javascriptGenerator.statementToCode(block, 'SUBSTACK') || '';
  if (javascriptGenerator.STATEMENT_SUFFIX) {
    branchCode =
      javascriptGenerator.prefixLines(
        javascriptGenerator.injectId(javascriptGenerator.STATEMENT_SUFFIX, block),
        javascriptGenerator.INDENT
      ) + branchCode;
  }
  code += `while (!(${conditionCode})) {\n${branchCode}  if (!runtime.running) break;\n  await runtime.nextFrame();\n}\n`;
  return code;
};

javascriptGenerator['control_while'] = (block) => {
  // while
  let code = '';
  let branchCode, conditionCode;

  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  conditionCode = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || 'False';
  branchCode = javascriptGenerator.statementToCode(block, 'SUBSTACK') || '';
  if (javascriptGenerator.STATEMENT_SUFFIX) {
    branchCode =
      javascriptGenerator.prefixLines(
        javascriptGenerator.injectId(javascriptGenerator.STATEMENT_SUFFIX, block),
        javascriptGenerator.INDENT
      ) + branchCode;
  }
  code += `while(${conditionCode}){\n${branchCode}  if(!runtime.running)break;\n  await runtime.nextFrame();\n}\n`;
  return code;
};

javascriptGenerator['control_stop'] = (block) => {
  let code = '';

  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  const stopOption = block.getFieldValue('STOP_OPTION');
  switch (stopOption) {
    case 'all':
      javascriptGenerator.definitions_['import_sys'] = 'import sys';
      code += 'runtime.stop();\n';
      break;
    case 'this script':
      code += 'return;\n';
      break;
    case 'other scripts in sprite':
      code += '/* TODO */\n'; // TODO
      break;
  }
  return code;
};

javascriptGenerator['control_start_as_clone'] = (block) => {};

javascriptGenerator['control_create_clone_of'] = (block) => {};

javascriptGenerator['control_delete_this_clone'] = (block) => {};
