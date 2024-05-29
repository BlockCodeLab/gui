import { pythonGenerator } from '@blockcode/workspace-blocks/app';

pythonGenerator['control_start_as_clone'] = () => {
  const branchCode = pythonGenerator.hatToCode('startasclone', 'target');
  return `${branchCode}runtime.when_startasclone(target, ${pythonGenerator.HAT_FUNCTION_PLACEHOLDER})\n`;
};

pythonGenerator['control_create_clone_of_menu'] = (block) => {
  return [block.getFieldValue('CLONE_OPTION'), pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator['control_create_clone_of'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  let cloneCode = pythonGenerator.valueToCode(block, 'CLONE_OPTION', pythonGenerator.ORDER_NONE) || '_myself_';
  if (cloneCode === '_myself_') {
    cloneCode = 'target';
  } else {
    cloneCode = `stage.get_child("${cloneCode}")`;
  }
  code += `${cloneCode}.clone()\n`;
  return code;
};

pythonGenerator['control_delete_this_clone'] = () => {
  return 'target.remove()\n';
};
