import { pythonGenerator } from './generator';

pythonGenerator['sensing_timer'] = (block) => {
  return ['get_timer()', pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator['sensing_resettimer'] = (block) => {
  return 'reset_timer()\n';
};
