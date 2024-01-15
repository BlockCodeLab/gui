import { javascriptGenerator } from '@blockcode/blocks-player';

javascriptGenerator['motion_attack'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const directionValue = javascriptGenerator.valueToCode(block, 'DIRECTION', javascriptGenerator.ORDER_NONE) || 0;
  const distanceValue = javascriptGenerator.valueToCode(block, 'DISTANCE', javascriptGenerator.ORDER_NONE) || 100;
  code += `tank.util.attack(${directionValue}, ${distanceValue});\n`;
  return code;
};

javascriptGenerator['motion_move'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const directionValue = javascriptGenerator.valueToCode(block, 'DIRECTION', javascriptGenerator.ORDER_NONE) || 0;
  const speedValue = javascriptGenerator.valueToCode(block, 'SPEED', javascriptGenerator.ORDER_NONE) || 100;
  code += `tank.util.move(${directionValue}, ${speedValue});\n`;
  return code;
};

javascriptGenerator['motion_turnright'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const degreesCode = javascriptGenerator.valueToCode(block, 'DEGREES', javascriptGenerator.ORDER_NONE);
  code += `tank.util.direction += ${degreesCode};\n`;
  return code;
};

javascriptGenerator['motion_turnleft'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const degreesCode = javascriptGenerator.valueToCode(block, 'DEGREES', javascriptGenerator.ORDER_NONE);
  code += `tank.util.direction -= ${degreesCode};\n`;
  return code;
};

javascriptGenerator['motion_setspeed'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const speedCode = javascriptGenerator.valueToCode(block, 'SPEED', javascriptGenerator.ORDER_NONE);
  code += `tank.util.speed = ${speedCode};\n`;
  return code;
};

javascriptGenerator['motion_stop'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  code += `tank.util.speed = 0;\n`;
  return code;
};

javascriptGenerator['motion_x'] = (block) => {
  return ['tank.util.worldX', javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['motion_y'] = (block) => {
  return ['tank.util.worldY', javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['motion_speed'] = (block) => {
  return ['tank.util.speed', javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['motion_direction'] = (block) => {
  return ['tank.util.direction', javascriptGenerator.ORDER_ATOMIC];
};
