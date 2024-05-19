import { javascriptGenerator } from '@blockcode/blocks-player';

const HAT_CALLBACK = `async (target, done) => {\ndo {\n${javascriptGenerator.HAT_CODE}} while (false);\ndone();\n}`;

javascriptGenerator['wifi_whenconnected'] = () => {
  return `runtime.when('wifi_connected', ${HAT_CALLBACK}, target);\n`;
};

javascriptGenerator['wifi_connectto'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  code += `setTimeout(() => {\n  runtime.wifiConnected = true;\n  runtime.fire('wifi_connected');\n}, 1000)\n`;
  return code;
};

javascriptGenerator['wifi_disconnect'] = (block) => {
  let code = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    code += javascriptGenerator.injectId(javascriptGenerator.STATEMENT_PREFIX, block);
  }
  code += `runtime.wifiConnected = false;\n`;
  return code;
};

javascriptGenerator['wifi_isconnected'] = () => {
  return ['runtime.wifiConnected', javascriptGenerator.ORDER_MEMBER];
};
