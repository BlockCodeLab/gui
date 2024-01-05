import { pythonGenerator } from './generator';

pythonGenerator['sensing_timer'] = (block) => {
  const code = 'get_timer()';
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator['sensing_resettimer'] = (block) => {
  const code = 'reset_timer()\n';
  return code;
};
