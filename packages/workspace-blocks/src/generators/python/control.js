import { pythonGenerator } from './generator';

pythonGenerator['control_wait'] = (block) => {
  // wait for
  let code = '';

  if (pythonGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  const durationCode = pythonGenerator.valueToCode(block, 'DURATION', pythonGenerator.ORDER_NONE);
  code += `await wait_for(${durationCode})\n`;
  return code;
};

pythonGenerator['control_repeat'] = (block) => {
  // for
  let code = '';
  let timesCode, branchCode;

  if (pythonGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  timesCode = pythonGenerator.valueToCode(block, 'TIMES', pythonGenerator.ORDER_NONE) || 'False';
  branchCode = pythonGenerator.statementToCode(block, 'SUBSTACK') || pythonGenerator.PASS;
  if (pythonGenerator.STATEMENT_SUFFIX) {
    branchCode =
      pythonGenerator.prefixLines(
        pythonGenerator.injectId(pythonGenerator.STATEMENT_SUFFIX, block),
        pythonGenerator.INDENT
      ) + branchCode;
  }
  code += `for _ in range(${timesCode}):\n${branchCode}  await sleep_fps()\n`;
  return code;
};

pythonGenerator['control_forever'] = (block) => {
  // while
  let code = '';
  let branchCode;

  if (pythonGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  branchCode = pythonGenerator.statementToCode(block, 'SUBSTACK') || pythonGenerator.PASS;
  if (pythonGenerator.STATEMENT_SUFFIX) {
    branchCode =
      pythonGenerator.prefixLines(
        pythonGenerator.injectId(pythonGenerator.STATEMENT_SUFFIX, block),
        pythonGenerator.INDENT
      ) + branchCode;
  }
  code += `while True:\n${branchCode}  await sleep_fps()\n`;
  return code;
};

pythonGenerator['control_if'] = (block) => {
  // if-else
  let code = '';
  let branchCode, conditionCode;

  if (pythonGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  conditionCode = pythonGenerator.valueToCode(block, 'CONDITION', pythonGenerator.ORDER_NONE) || 'False';
  branchCode = pythonGenerator.statementToCode(block, 'SUBSTACK') || pythonGenerator.PASS;
  if (pythonGenerator.STATEMENT_SUFFIX) {
    branchCode =
      pythonGenerator.prefixLines(
        pythonGenerator.injectId(pythonGenerator.STATEMENT_SUFFIX, block),
        pythonGenerator.INDENT
      ) + branchCode;
  }
  code += `if ${conditionCode}:\n${branchCode}`;

  // If has else branch.
  if (block.getInput('SUBSTACK2')) {
    branchCode = pythonGenerator.statementToCode(block, 'SUBSTACK2') || pythonGenerator.PASS;
    if (pythonGenerator.STATEMENT_SUFFIX) {
      branchCode =
        pythonGenerator.prefixLines(
          pythonGenerator.injectId(pythonGenerator.STATEMENT_SUFFIX, block),
          pythonGenerator.INDENT
        ) + branchCode;
    }
    code += `else:\n${branchCode}`;
  }
  return code;
};

pythonGenerator['control_if_else'] = pythonGenerator['control_if'];

pythonGenerator['control_wait_until'] = (block) => {
  // wait until
  let code = '';

  if (pythonGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  const conditionCode = pythonGenerator.valueToCode(block, 'CONDITION', pythonGenerator.ORDER_NONE) || 'False';
  code += `while not ${conditionCode}: await sleep_fps()\n`;
  return code;
};

pythonGenerator['control_repeat_until'] = (block) => {
  // while not
  let code = '';
  let branchCode, conditionCode;

  if (pythonGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  conditionCode = pythonGenerator.valueToCode(block, 'CONDITION', pythonGenerator.ORDER_NONE) || 'False';
  branchCode = pythonGenerator.statementToCode(block, 'SUBSTACK') || pythonGenerator.PASS;
  if (pythonGenerator.STATEMENT_SUFFIX) {
    branchCode =
      pythonGenerator.prefixLines(
        pythonGenerator.injectId(pythonGenerator.STATEMENT_SUFFIX, block),
        pythonGenerator.INDENT
      ) + branchCode;
  }
  code += `while not ${conditionCode}:\n${branchCode}  await sleep_fps()\n`;
  return code;
};

pythonGenerator['control_while'] = (block) => {
  // while
  let code = '';
  let branchCode, conditionCode;

  if (pythonGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  conditionCode = pythonGenerator.valueToCode(block, 'CONDITION', pythonGenerator.ORDER_NONE) || 'False';
  branchCode = pythonGenerator.statementToCode(block, 'SUBSTACK') || pythonGenerator.PASS;
  if (pythonGenerator.STATEMENT_SUFFIX) {
    branchCode =
      pythonGenerator.prefixLines(
        pythonGenerator.injectId(pythonGenerator.STATEMENT_SUFFIX, block),
        pythonGenerator.INDENT
      ) + branchCode;
  }
  code += `while ${conditionCode}:\n${branchCode}  await sleep_fps()\n`;
  return code;
};

pythonGenerator['control_stop'] = (block) => {
  let code = '';

  if (pythonGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  const stopOption = block.getFieldValue('STOP_OPTION');
  switch (stopOption) {
    case 'all':
      pythonGenerator.definitions_['import_sys'] = 'import sys';
      code += 'sys.exit()\n';
      break;
    case 'this script':
      code += 'return\n';
      break;
    case 'other scripts in sprite':
      code += 'pass\n'; // TODO
      break;
  }
  return code;
};
