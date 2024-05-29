import { pythonGenerator } from '@blockcode/workspace-blocks/app';

pythonGenerator['wifi_whenconnected'] = () => {
  const hatCode = pythonGenerator.hatToCode('wifi_connected', 'target');
  return `${hatCode}runtime.when_wificonnected(${pythonGenerator.HAT_FUNCTION_PLACEHOLDER}, target)\n`;
};

pythonGenerator['wifi_connectto'] = (block) => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  const ssidCode = pythonGenerator.valueToCode(block, 'SSID', pythonGenerator.ORDER_NONE) || '""';
  const passwordCode = pythonGenerator.valueToCode(block, 'PASSWORD', pythonGenerator.ORDER_NONE) || '""';
  code += `runtime.connect_wifi(str(${ssidCode}), str(${passwordCode}))\n`;
  return code;
};

pythonGenerator['wifi_disconnect'] = () => {
  let code = '';
  if (pythonGenerator.STATEMENT_PREFIX) {
    code += pythonGenerator.injectId(pythonGenerator.STATEMENT_PREFIX, block);
  }
  code += 'runtime.disconnect_wifi()\n';
  return code;
};

pythonGenerator['wifi_isconnected'] = () => {
  return ['runtime.wifi_connected()', pythonGenerator.ORDER_FUNCTION_CALL];
};
