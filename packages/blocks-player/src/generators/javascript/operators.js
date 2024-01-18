import { javascriptGenerator } from './generator';

javascriptGenerator['operator_add'] = (block) => {
  const num1Value = javascriptGenerator.valueToCode(block, 'NUM1', javascriptGenerator.ORDER_NONE) || 0;
  const num2Value = javascriptGenerator.valueToCode(block, 'NUM2', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${num1Value} + ${num2Value})`;
  return [code, javascriptGenerator.ORDER_SUBTRACTION];
};

javascriptGenerator['operator_subtract'] = (block) => {
  const num1Value = javascriptGenerator.valueToCode(block, 'NUM1', javascriptGenerator.ORDER_NONE) || 0;
  const num2Value = javascriptGenerator.valueToCode(block, 'NUM2', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${num1Value} - ${num2Value})`;
  return [code, javascriptGenerator.ORDER_ADDITION];
};

javascriptGenerator['operator_multiply'] = (block) => {
  const num1Value = javascriptGenerator.valueToCode(block, 'NUM1', javascriptGenerator.ORDER_NONE) || 0;
  const num2Value = javascriptGenerator.valueToCode(block, 'NUM2', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${num1Value} * ${num2Value})`;
  return [code, javascriptGenerator.ORDER_MULTIPLICATION];
};

javascriptGenerator['operator_divide'] = (block) => {
  const num1Value = javascriptGenerator.valueToCode(block, 'NUM1', javascriptGenerator.ORDER_NONE) || 0;
  const num2Value = javascriptGenerator.valueToCode(block, 'NUM2', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${num1Value} / ${num2Value})`;
  return [code, javascriptGenerator.ORDER_DIVISION];
};

javascriptGenerator['operator_random'] = (block) => {
  const minValue = javascriptGenerator.valueToCode(block, 'FROM', javascriptGenerator.ORDER_NONE) || 0;
  const maxValue = javascriptGenerator.valueToCode(block, 'TO', javascriptGenerator.ORDER_NONE) || 0;
  const code = `runtime.random(${minValue}, ${maxValue})`;
  return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
};

javascriptGenerator['operator_gt'] = (block) => {
  // >
  const operand1Value = javascriptGenerator.valueToCode(block, 'OPERAND1', javascriptGenerator.ORDER_NONE) || 0;
  const operand2Value = javascriptGenerator.valueToCode(block, 'OPERAND2', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${operand1Value} > ${operand2Value})`;
  return [code, javascriptGenerator.ORDER_RELATIONAL];
};

javascriptGenerator['operator_lt'] = (block) => {
  // <
  const operand1Value = javascriptGenerator.valueToCode(block, 'OPERAND1', javascriptGenerator.ORDER_NONE) || 0;
  const operand2Value = javascriptGenerator.valueToCode(block, 'OPERAND2', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${operand1Value} < ${operand2Value})`;
  return [code, javascriptGenerator.ORDER_RELATIONAL];
};

javascriptGenerator['operator_equals'] = (block) => {
  const operand1Value = javascriptGenerator.valueToCode(block, 'OPERAND1', javascriptGenerator.ORDER_NONE) || 0;
  const operand2Value = javascriptGenerator.valueToCode(block, 'OPERAND2', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${operand1Value} == ${operand2Value})`;
  return [code, javascriptGenerator.ORDER_RELATIONAL];
};

javascriptGenerator['operator_and'] = (block) => {
  const operand1Value = javascriptGenerator.valueToCode(block, 'OPERAND1', javascriptGenerator.ORDER_NONE) || 0;
  const operand2Value = javascriptGenerator.valueToCode(block, 'OPERAND2', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${operand1Value} && ${operand2Value})`;
  return [code, javascriptGenerator.ORDER_LOGICAL_AND];
};

javascriptGenerator['operator_or'] = (block) => {
  const operand1Value = javascriptGenerator.valueToCode(block, 'OPERAND1', javascriptGenerator.ORDER_NONE) || 0;
  const operand2Value = javascriptGenerator.valueToCode(block, 'OPERAND2', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${operand1Value} || ${operand2Value})`;
  return [code, javascriptGenerator.ORDER_LOGICAL_OR];
};

javascriptGenerator['operator_not'] = (block) => {
  const operandValue = javascriptGenerator.valueToCode(block, 'OPERAND', javascriptGenerator.ORDER_NONE) || 0;
  const code = `!(${operandValue})`;
  return [code, javascriptGenerator.ORDER_LOGICAL_NOT];
};

javascriptGenerator['operator_join'] = (block) => {
  const string1Value = javascriptGenerator.valueToCode(block, 'STRING1', javascriptGenerator.ORDER_NONE) || '';
  const string2Value = javascriptGenerator.valueToCode(block, 'STRING2', javascriptGenerator.ORDER_NONE) || '';
};

javascriptGenerator['operator_constter_of'] = (block) => {
  const letterValue = javascriptGenerator.valueToCode(block, 'LETTER', javascriptGenerator.ORDER_NONE) || '';
  const stringValue = javascriptGenerator.valueToCode(block, 'STRING', javascriptGenerator.ORDER_NONE) || '';
};

javascriptGenerator['operator_length'] = (block) => {
  const stringValue = javascriptGenerator.valueToCode(block, 'STRING', javascriptGenerator.ORDER_NONE) || '';
};

javascriptGenerator['operator_contains'] = (block) => {
  const string1Value = javascriptGenerator.valueToCode(block, 'STRING1', javascriptGenerator.ORDER_NONE) || '';
  const string2Value = javascriptGenerator.valueToCode(block, 'STRING2', javascriptGenerator.ORDER_NONE) || '';
};

javascriptGenerator['operator_mod'] = (block) => {
  const num1Value = javascriptGenerator.valueToCode(block, 'NUM1', javascriptGenerator.ORDER_NONE) || 0;
  const num2Value = javascriptGenerator.valueToCode(block, 'NUM2', javascriptGenerator.ORDER_NONE) || 0;
  const code = `(${num1Value} % ${num2Value})`;
  return [code, javascriptGenerator.ORDER_MODULUS];
};

javascriptGenerator['operator_round'] = (block) => {
  const numValue = javascriptGenerator.valueToCode(block, 'NUM', javascriptGenerator.ORDER_NONE) || 0;
  const code = `Math.round(${numValue})`;
  return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
};

javascriptGenerator['operator_mathop'] = (block) => {
  const numValue = javascriptGenerator.valueToCode(block, 'NUM', javascriptGenerator.ORDER_NONE) || 0;
  const operatorValue = block.getFieldValue('OPERATOR');
  let code = '';
  if (operatorValue === 'ceiling') {
    code += `Math.ceil(${numValue})`;
  } else if (operatorValue === 'sin' || operatorValue === 'cos' || operatorValue === 'tan') {
    code += `Math.${operatorValue}((Math.PI * ${numValue}) / 180)`;
  } else if (operatorValue === 'asin' || operatorValue === 'acos' || operatorValue === 'atan') {
    code += `((Math.${operatorValue}(${numValue}) * 180) / Math.PI)`;
  } else if (operatorValue === 'ln') {
    code += `(Math.log(${numValue})`;
  } else if (operatorValue === 'log') {
    code += `(Math.log(${numValue}) / Math.LN10)`;
  } else if (operatorValue === 'e ^') {
    code += `Math.exp(${numValue})`;
  } else if (operatorValue === '10 ^') {
    code += `Math.pow(10, ${numValue})`;
  } else {
    code += `Math.${operatorValue}(${numValue})`;
  }
  return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
};
