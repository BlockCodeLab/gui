import { javascriptGenerator } from './generator';

javascriptGenerator['sensing_timer'] = (block) => {
  const code = 'runtime.getTimer()';
  return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
};

javascriptGenerator['sensing_resettimer'] = (block) => {
  return 'runtime.resetTimer()\n';
};
