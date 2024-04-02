import { javascriptGenerator } from '@blockcode/blocks-player';

javascriptGenerator['motion_movesteps'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const stepCode = javascriptGenerator.valueToCode(block, 'STEPS', javascriptGenerator.ORDER_NONE);
  code += `target.util.move(${stepCode});\n`;
  return code;
};

javascriptGenerator['motion_turnright'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const degreesCode = javascriptGenerator.valueToCode(block, 'DEGREES', javascriptGenerator.ORDER_NONE);
  code += `target.util.direction += ${degreesCode};\n`;
  return code;
};

javascriptGenerator['motion_turnleft'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const degreesCode = javascriptGenerator.valueToCode(block, 'DEGREES', javascriptGenerator.ORDER_NONE);
  code += `target.util.direction -= ${degreesCode};\n`;
  return code;
};

javascriptGenerator['motion_pointindirection'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const directionCode = javascriptGenerator.valueToCode(block, 'DIRECTION', javascriptGenerator.ORDER_NONE);
  code += `target.util.direction = ${directionCode};\n`;
  return code;
};

javascriptGenerator['motion_pointtowards_menu'] = (block) => {
  let code, order;
  const towards = block.getFieldValue('TOWARDS');
  if (towards === '_random_') {
    code = `runtime.random(1, 360)`;
    order = javascriptGenerator.ORDER_FUNCTION_CALL;
  } else {
    code = `runtime.getSpriteById('${towards}').data`;
    order = javascriptGenerator.ORDER_MEMBER;
  }
  return [code, order];
};

javascriptGenerator['motion_pointtowards'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const towardsCode = javascriptGenerator.valueToCode(block, 'TOWARDS', javascriptGenerator.ORDER_NONE);
  code += `target.util.towards(${towardsCode});\n`;
  return code;
};

javascriptGenerator['motion_gotoxy'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const xCode = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_NONE);
  const yCode = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_NONE);
  code += `target.util.goto(${xCode}, ${yCode});\n`;
  return code;
};

javascriptGenerator['motion_goto_menu'] = (block) => {
  let code, order;
  const toPlace = block.getFieldValue('TO');
  if (toPlace === '_random_') {
    code = `{ x: runtime.random('width'), y: runtime.random('height') }`;
    order = javascriptGenerator.ORDER_ATOMIC;
  } else {
    code = `runtime.getSpriteById('${toPlace}').data`;
    order = javascriptGenerator.ORDER_MEMBER;
  }
  return [code, order];
};

javascriptGenerator['motion_goto'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const toCode = javascriptGenerator.valueToCode(block, 'TO', javascriptGenerator.ORDER_NONE);
  code += `target.util.goto(${toCode});\n`;
  return code;
};

javascriptGenerator['motion_glidesecstoxy'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const secsCode = javascriptGenerator.valueToCode(block, 'SECS', javascriptGenerator.ORDER_NONE);
  const xCode = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_NONE);
  const yCode = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_NONE);
  code += `await target.util.glide(${secsCode}, ${xCode}, ${yCode});\n`;
  return code;
};

javascriptGenerator['motion_glideto_menu'] = javascriptGenerator['motion_goto_menu'];

javascriptGenerator['motion_glideto'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const secsCode = javascriptGenerator.valueToCode(block, 'SECS', javascriptGenerator.ORDER_NONE);
  const toCode = javascriptGenerator.valueToCode(block, 'TO', javascriptGenerator.ORDER_NONE);
  code += `await target.util.glide(${secsCode}, ${toCode});\n`;
  return code;
};

javascriptGenerator['motion_changexby'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const dxCode = javascriptGenerator.valueToCode(block, 'DX', javascriptGenerator.ORDER_NONE);
  code += `target.util.x += ${dxCode};\n`;
  return code;
};

javascriptGenerator['motion_setx'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const xCode = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_NONE);
  code += `target.util.x = ${xCode};\n`;
  return code;
};

javascriptGenerator['motion_changeyby'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const dyCode = javascriptGenerator.valueToCode(block, 'DY', javascriptGenerator.ORDER_NONE);
  code += `target.util.y += ${dyCode};\n`;
  return code;
};

javascriptGenerator['motion_sety'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const yCode = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_NONE);
  code += `target.util.y = ${yCode};\n`;
  return code;
};

javascriptGenerator['motion_ifonedgebounce'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  code += 'target.util.edgeBounce();\n';
  return code;
};

javascriptGenerator['motion_setrotationstyle'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }

  let styleCode;
  const rotationStyle = block.getFieldValue('STYLE');
  switch (rotationStyle) {
    case 'left-right':
      styleCode = 'HORIZONTAL_FLIP';
      break;
    case `don't rotate`:
      styleCode = 'DONOT_ROTATE';
      break;
    case 'all around':
      styleCode = 'ALL_AROUND';
    default:
      break;
  }
  code += `target.util.rotationStyle = runtime.RotationStyle.${styleCode};\n`;
  return code;
};

javascriptGenerator['motion_xposition'] = (block) => {
  const code = 'target.util.x';
  return [code, javascriptGenerator.ORDER_NONE];
};

javascriptGenerator['motion_yposition'] = (block) => {
  const code = 'target.util.y';
  return [code, javascriptGenerator.ORDER_NONE];
};

javascriptGenerator['motion_direction'] = (block) => {
  const code = 'target.util.direction';
  return [code, javascriptGenerator.ORDER_NONE];
};
