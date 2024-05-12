import { javascriptGenerator } from '@blockcode/blocks-player';

const HAT_CALLBACK = `async (target, done) => {\ndo {\n${javascriptGenerator.HAT_CODE}} while (false);\n  done();\n}`;

javascriptGenerator['wifi_whenconnected'] = () => {
  return `runtime.when('wifi_connected', ${HAT_CALLBACK}, target);\n`;
};

javascriptGenerator['wifi_connectto'] = () => {
  javascriptGenerator.definitions_['let_wifi_connected'] = 'let wifiConnected = false;';

  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  code += `setTimeout(() => {\n  runtime.fire('wifi_connected');\n  wifiConnected = true;\n}, 1000)\n`;
  return code;
};

javascriptGenerator['wifi_disconnect'] = () => '';

javascriptGenerator['wifi_isconnected'] = () => {
  javascriptGenerator.definitions_['let_wifi_connected'] = 'let wifiConnected = false;';
  return ['wifiConnected', javascriptGenerator.ORDER_ATOMIC];
};
