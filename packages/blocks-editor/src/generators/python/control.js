import { pythonGenerator } from './generator';

pythonGenerator['control_wait'] = (block) => {
  // sleep
  pythonGenerator.definitions_['import_time'] = 'import time';

  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  code += `time.sleep(${pythonGenerator.valueToCode(block, 'DURATION', pythonGenerator.ORDER_NONE)})\n`;
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
  code += `for _ in range(${timesCode}):\n${branchCode}`;
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
  code += `while True:\n${branchCode}`;
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

pythonGenerator['control_wait_until'] = false;

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
  code += `while not ${conditionCode}:\n${branchCode}`;
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
  code += `while ${conditionCode}:\n${branchCode}`;
  return code;
};

const ALL_SCRIPTS = 'all';
const THIS_SCRIPT = 'this script';
const OTHER_SCRIPTS = 'other scripts in sprite';
pythonGenerator['control_stop'] = false;
