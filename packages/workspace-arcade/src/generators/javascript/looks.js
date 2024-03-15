import { javascriptGenerator } from '@blockcode/blocks-player';

javascriptGenerator['looks_sayforsecs'] = (block) => {};

javascriptGenerator['looks_say'] = (block) => {};

javascriptGenerator['looks_thinkforsecs'] = (block) => {};

javascriptGenerator['looks_think'] = (block) => {};

javascriptGenerator['looks_show'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  code += `sprite.util.hidden = false;\n`;
  return code;
};

javascriptGenerator['looks_hide'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  code += `sprite.util.hidden = true;\n`;
  return code;
};

javascriptGenerator['looks_changesizeby'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const changeValue = javascriptGenerator.valueToCode(block, 'CHANGE', javascriptGenerator.ORDER_NONE);
  code += `sprite.util.size += ${changeValue};\n`;
  return code;
};

javascriptGenerator['looks_setsizeto'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const sizeValue = javascriptGenerator.valueToCode(block, 'SIZE', javascriptGenerator.ORDER_NONE);
  code += `sprite.util.size = ${sizeValue};\n`;
  return code;
};

javascriptGenerator['looks_size'] = (block) => {
  const code = 'sprite.util.size';
  return [code, javascriptGenerator.ORDER_NONE];
};

javascriptGenerator['looks_costume'] = (block) => {
  const code = block.getFieldValue('COSTUME');
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['looks_switchcostumeto'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const costumeValue = javascriptGenerator.valueToCode(block, 'COSTUME', javascriptGenerator.ORDER_NONE);
  code += `sprite.util.costume = '${costumeValue}';\n`;
  return code;
};

javascriptGenerator['looks_nextcostume'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  code += `sprite.util.costume++;\n`;
  return code;
};

javascriptGenerator['looks_backdrops'] = (block) => {
  const code = block.getFieldValue('BACKDROP');
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['looks_switchbackdropto'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const backdropValue = javascriptGenerator.valueToCode(block, 'BACKDROP', javascriptGenerator.ORDER_NONE);
  code += `stage.util.backdrop = '${backdropValue}';\n`;
  return code;
};

javascriptGenerator['looks_nextbackdrop'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  code += `stage.util.backdrop++;\n`;
  return code;
};

javascriptGenerator['looks_gotofrontback'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const frontOrBack = block.getFieldValue('FRONT_BACK');
  code += `stage.util.layer = ${frontOrBack};\n`;
  return code;
};

javascriptGenerator['looks_goforwardbackwardlayers'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  const forwardOrBackward = block.getFieldValue('FORWARD_BACKWARD');
  const changeValue = javascriptGenerator.valueToCode(block, 'NUM', javascriptGenerator.ORDER_NONE);
  code += `stage.util.layer ${forwardOrBackward === 'backward' ? '-' : '+'}= ${changeValue};\n`;
  return code;
};

javascriptGenerator['looks_backdropnumbername'] = (block) => {};

javascriptGenerator['looks_costumenumbername'] = (block) => {};

javascriptGenerator['looks_switchbackdroptoandwait'] = (block) => {};
