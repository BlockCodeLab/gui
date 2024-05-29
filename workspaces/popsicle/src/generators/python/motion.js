import { pythonGenerator } from '@blockcode/workspace-blocks/app';

pythonGenerator['motion_movesteps'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const stepCode = pythonGenerator.valueToCode(block, 'STEPS', pythonGenerator.ORDER_NONE);
  code += `sprite.move(${stepCode})\n`;
  return code;
};

pythonGenerator['motion_turnright'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const degreesCode = pythonGenerator.valueToCode(block, 'DEGREES', pythonGenerator.ORDER_NONE);
  code += `sprite.direction += ${degreesCode}\n`;
  return code;
};

pythonGenerator['motion_turnleft'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const degreesCode = pythonGenerator.valueToCode(block, 'DEGREES', pythonGenerator.ORDER_NONE);
  code += `sprite.direction -= ${degreesCode}\n`;
  return code;
};

pythonGenerator['motion_pointindirection'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const directionCode = pythonGenerator.valueToCode(block, 'DIRECTION', pythonGenerator.ORDER_NONE);
  code += `sprite.direction = ${directionCode}\n`;
  return code;
};

pythonGenerator['motion_pointtowards_menu'] = (block) => {
  let code, order;
  const towards = block.getFieldValue('TOWARDS');
  if (towards === '_random_') {
    pythonGenerator.definitions_['import_random'] = 'import random';
    code = `random.randint(1,360)`;
    order = pythonGenerator.ORDER_FUNCTION_CALL;
  } else {
    code = `stage.get_sprite_by_id('${towards}')`;
    order = pythonGenerator.ORDER_FUNCTION_CALL;
  }
  return [code, order];
};

pythonGenerator['motion_pointtowards'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const towardsCode = pythonGenerator.valueToCode(block, 'TOWARDS', pythonGenerator.ORDER_NONE);
  code += `sprite.towards(${towardsCode})\n`;
  return code;
};

pythonGenerator['motion_gotoxy'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const xCode = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_NONE);
  const yCode = pythonGenerator.valueToCode(block, 'Y', pythonGenerator.ORDER_NONE);
  code += `sprite.goto(${xCode}, ${yCode})\n`;
  return code;
};

pythonGenerator['motion_goto_menu'] = (block) => {
  let code, order;
  const toPlace = block.getFieldValue('TO');
  if (toPlace === '_random_') {
    pythonGenerator.definitions_['import_random'] = 'import random';
    code = `(random.randint(-140, 140), random.randint(-120, 120))`;
    order = pythonGenerator.ORDER_ATOMIC;
  } else {
    code = `stage.get_sprite_by_id('${towards}')`;
    order = pythonGenerator.ORDER_FUNCTION_CALL;
  }
  return [code, order];
};

pythonGenerator['motion_goto'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const toCode = pythonGenerator.valueToCode(block, 'TO', pythonGenerator.ORDER_NONE);
  code += `sprite.goto(place=${toCode})\n`;
  return code;
};

pythonGenerator['motion_glidesecstoxy'] = (block) => {
  let code = '';

  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }

  const secsCode = pythonGenerator.valueToCode(block, 'SECS', pythonGenerator.ORDER_NONE);
  const xCode = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_NONE);
  const yCode = pythonGenerator.valueToCode(block, 'Y', pythonGenerator.ORDER_NONE);
  code += `sprite.glide(${secsCode}, ${xCode}, ${yCode})\n`;
  return code;
};

pythonGenerator['motion_glideto_menu'] = pythonGenerator['motion_goto_menu'];

pythonGenerator['motion_glideto'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const secsCode = pythonGenerator.valueToCode(block, 'SECS', pythonGenerator.ORDER_NONE);
  const toCode = pythonGenerator.valueToCode(block, 'TO', pythonGenerator.ORDER_NONE);
  code += `await sprite.glide(${secsCode}, place=${toCode})\n`;
  return code;
};

pythonGenerator['motion_changexby'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const dxCode = pythonGenerator.valueToCode(block, 'DX', pythonGenerator.ORDER_NONE);
  code += `sprite.x += ${dxCode}\n`;
  return code;
};

pythonGenerator['motion_setx'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const xCode = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_NONE);
  code += `sprite.x = ${xCode}\n`;
  return code;
};

pythonGenerator['motion_changeyby'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const dyCode = pythonGenerator.valueToCode(block, 'DY', pythonGenerator.ORDER_NONE);
  code += `sprite.y += ${dyCode}\n`;
  return code;
};

pythonGenerator['motion_sety'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const yCode = pythonGenerator.valueToCode(block, 'Y', pythonGenerator.ORDER_NONE);
  code += `sprite.y = ${yCode}\n`;
  return code;
};

pythonGenerator['motion_ifonedgebounce'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  code += 'sprite.edge_bounce()\n';
  return code;
};

pythonGenerator['motion_setrotationstyle'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  let styleCode;
  const rotationStyle = block.getFieldValue('STYLE');
  switch (rotationStyle) {
    case 'left-right':
      styleCode = 'ROTATION_STYLE_HORIZONTAL_FLIP';
      break;
    case `don't rotate`:
      styleCode = 'ROTATION_STYLE_DONOT_ROTATE';
      break;
    case 'all around':
      styleCode = 'ROTATION_STYLE_ALL_AROUND';
    default:
      break;
  }
  code += `sprite.rotation_style = ${styleCode}\n`;
  return code;
};

pythonGenerator['motion_xposition'] = (block) => {
  const code = 'sprite.x';
  return [code, pythonGenerator.ORDER_NONE];
};

pythonGenerator['motion_yposition'] = (block) => {
  const code = 'sprite.y';
  return [code, pythonGenerator.ORDER_NONE];
};

pythonGenerator['motion_direction'] = (block) => {
  const code = 'sprite.direction';
  return [code, pythonGenerator.ORDER_NONE];
};
