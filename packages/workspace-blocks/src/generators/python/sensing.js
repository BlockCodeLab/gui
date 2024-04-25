import { pythonGenerator } from './generator';

pythonGenerator['sensing_timer'] = (block) => {
  return ['runtime.time', pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['sensing_resettimer'] = (block) => {
  return 'runtime.reset_timer()\n';
};
