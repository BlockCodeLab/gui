import { pythonGenerator } from './generator';

pythonGenerator['sensing_timer'] = (block) => {
  pythonGenerator.definitions_['import_time'] = 'import time';
  pythonGenerator.definitions_['def_timer'] = '_timer = time.ticks_ms()';
  const code = '(time.ticks_diff(time.ticks_ms(), _timer) / 1000)';
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator['sensing_resettimer'] = (block) => {
  pythonGenerator.definitions_['import_time'] = 'import time';
  pythonGenerator.definitions_['def_timer'] = '_timer = time.ticks_ms()';
  const code = '_timer = time.ticks_ms()\n';
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};
