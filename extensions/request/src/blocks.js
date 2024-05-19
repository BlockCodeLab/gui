import { Text } from '@blockcode/ui';
import translations from './l10n.yaml';
import iconURI from './icon.svg';
import requestPyURI from './request.py';

function provideGetContentFunctionJs() {
  this.definitions_['request_response'] = `runtime.data['request_response'] = null;`;
  return this.provideFunction_('request_get_content', [
    `const ${this.FUNCTION_NAME_PLACEHOLDER_} = async (path) => {`,
    `  res = runtime.data['request_response']`,
    `  if (!res) return '';`,
    '  let result = await res.json();',
    `  if (!result) return '';`,
    `  const indexPath = path.split('.');`,
    '  for (const index of indexPath) {',
    '    result = Array.isArray(result) ? result.at(+index - 1) : result[index];',
    `    if (result !== 0 && !result) return '';`,
    '  }',
    '  return result;',
    '};',
  ]);
}

function provideGetTextFunctionJs() {
  this.definitions_['request_response'] = `runtime.data['request_response'] = null;`;
  return this.provideFunction_('request_get_text', [
    `const ${this.FUNCTION_NAME_PLACEHOLDER_} = async (path) => {`,
    `  res = runtime.data['request_response']`,
    `  if (!res) return '';`,
    '  return await res.text();',
    '};',
  ]);
}

function provideFetchFunctionJs() {
  this.definitions_['request_option'] = `runtime.data['request_option'] = {};`;
  return this.provideFunction_('request_fetch', [
    `const ${this.FUNCTION_NAME_PLACEHOLDER_} = (method, url) => {`,
    '  if (runtime.wifiConnected) {',
    '    const option = {',
    `      ...runtime.data['request_option'],`,
    `      method: method,`,
    '    };',
    `    if ((option.method !== 'GET' || option.method !== 'HEAD') && option.body) {`,
    `      option.body = JSON.stringify(option.body);`,
    '    }',
    `    fetch(url, option).then((res) => {`,
    `      runtime.data['request_response'] = res;`,
    `      runtime.fire('request_success');`,
    '    }).catch(() => {',
    `      runtime.fire('request_fails');`,
    '    });',
    '  } else {',
    `    runtime.fire('request_fails');`,
    '  }',
    '};',
  ]);
}

export default {
  iconURI,
  name: (
    <Text
      id="extension.request.name"
      defaultMessage="Request"
    />
  ),
  files: [
    {
      name: 'request',
      type: 'text/x-python',
      uri: requestPyURI,
    },
  ],
  blocks: [
    {
      id: 'request',
      text: (
        <Text
          id="extension.request.request"
          defaultMessage="request content [MOTHOD] to [URL]"
        />
      ),
      inputs: {
        MOTHOD: {
          type: 'string',
          default: 'GET',
          menu: [
            ['GET', 'GET'],
            ['POST', 'POST'],
            ['PUT', 'PUT'],
            ['PATCH', 'PATCH'],
            ['DELETE', 'DELETE'],
            ['HEAD', 'HEAD'],
            ['OPTIONS', 'OPTIONS'],
          ],
        },
        URL: {
          type: 'string',
          default: 'https://make.blockcode.fun/hello.txt',
        },
      },
      python(block) {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const method = this.quote_(block.getFieldValue('MOTHOD') || 'GET');
        const url = this.valueToCode(block, 'URL', this.ORDER_NONE) || '""';
        code += `request.fetch(str(${method}), str(${url}))\n`;
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const fetch = provideFetchFunctionJs.call(this);
        const method = this.quote_(block.getFieldValue('MOTHOD') || 'GET');
        const url = this.valueToCode(block, 'URL', this.ORDER_NONE) || '""';
        code += `${fetch}(String(${method}), String(${url}))`;
        return code;
      },
    },
    {
      id: 'clear_cache',
      text: (
        <Text
          id="extension.request.clearCache"
          defaultMessage="clear request cache"
        />
      ),
      python() {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += 'request.clear_cache()\n';
        return code;
      },
      vm() {
        this.definitions_['request_option'] = `runtime.data['request_option'] = {};`;
        this.definitions_['request_response'] = `runtime.data['request_response'] = null;`;
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `runtime.data['request_option'] = {};\n`;
        code += `runtime.data['request_response'] = null;\n`;
        return code;
      },
    },
    {
      id: 'get_content',
      text: (
        <Text
          id="extension.request.getContent"
          defaultMessage="item [PATH] of content"
        />
      ),
      inputs: {
        PATH: {
          type: 'string',
          default: 'path.2.item',
        },
      },
      output: 'string',
      python(block) {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        const path = this.valueToCode(block, 'PATH', this.ORDER_NONE) || '""';
        const code = `request.get_content(${path})`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
      vm(block) {
        this.definitions_['request_response'] = `runtime.data['request_response'] = null;`;
        const getContent = provideGetContentFunctionJs.call(this);
        const path = this.valueToCode(block, 'PATH', this.ORDER_NONE) || '""';
        const code = `(await ${getContent}(${path}))`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    {
      id: 'get_text',
      text: (
        <Text
          id="extension.request.getText"
          defaultMessage="text content"
        />
      ),
      output: 'string',
      python() {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        const code = `request.get_content()`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
      vm() {
        this.definitions_['request_response'] = `runtime.data['request_response'] = null;`;
        const getText = provideGetTextFunctionJs.call(this);
        const code = `(await ${getText}())`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    '---',
    {
      id: 'when_responds',
      text: (
        <Text
          id="extension.request.whenResponds"
          defaultMessage="when a site responds"
        />
      ),
      hat: true,
      python() {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        const hatCode = this.hatToCode('request_success', 'target');
        return `${hatCode}runtime.when(request.REQUEST_SUCCESS, ${this.HAT_FUNCTION_PLACEHOLDER}, target)\n`;
      },
      vm() {
        const hatCode = `async (target, done) => {\ndo {\n${this.HAT_CODE}} while (false);\ndone();\n}`;
        return `runtime.when('request_success', ${hatCode}, target);\n`;
      },
    },
    {
      id: 'when_fails',
      text: (
        <Text
          id="extension.request.whenFails"
          defaultMessage="when a request fails"
        />
      ),
      hat: true,
      python() {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        const hatCode = this.hatToCode('request_fails');
        return `${hatCode}runtime.when(request.REQUEST_FAILS, ${this.HAT_FUNCTION_PLACEHOLDER})\n`;
      },
      vm() {
        const hatCode = `async (done) => {\ndo {\n${this.HAT_CODE}} while (false);\ndone();\n}`;
        return `runtime.when('request_fails', ${hatCode});\n`;
      },
    },
    {
      id: 'is_responds',
      text: (
        <Text
          id="extension.request.isResponds"
          defaultMessage="site responds?"
        />
      ),
      output: 'boolean',
      python() {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        const code = `bool(request.response)`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
      vm() {
        this.definitions_['request_response'] = `runtime.data['request_response'] = null;`;
        const code = `Boolean(runtime.data['request_response'])`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    {
      id: 'status_code',
      text: (
        <Text
          id="extension.request.statusCode"
          defaultMessage="status code"
        />
      ),
      output: 'number',
      python() {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        const code = `(request.response.status if request.response else 0)`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
      vm() {
        this.definitions_['request_response'] = `runtime.data['request_response'] = null;`;
        const code = `(runtime.data['request_response'] ? runtime.data['request_response'].status : 0)`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    '---',
    {
      id: 'set_content_type',
      text: (
        <Text
          id="extension.request.setContentType"
          defaultMessage="set content type to [CONTENTTYPE]"
        />
      ),
      inputs: {
        CONTENTTYPE: {
          type: 'string',
          default: 'text/plain',
          menu: [
            ['application/json', 'application/json'],
            ['text/plain', 'text/plain'],
          ],
        },
      },
      python(block) {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const contentType = this.quote_(block.getFieldValue('CONTENTTYPE') || 'text/plain');
        code += `request.set_header('Content-Type', str(${contentType}))\n`;
        return code;
      },
      vm(block) {
        this.definitions_['request_option'] = `runtime.data['request_option'] = {};`;
        this.definitions_['request_option_headers'] = `runtime.data['request_option']['headers'] = {};`;
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const contentType = this.quote_(block.getFieldValue('CONTENTTYPE') || 'text/plain');
        code += `runtime.data['request_option']['headers']['Content-Type'] = ${contentType};\n`;
        return code;
      },
    },
    {
      id: 'set_header',
      text: (
        <Text
          id="extension.request.setHeader"
          defaultMessage="set headers [HEADER] to [VALUE]"
        />
      ),
      inputs: {
        HEADER: {
          type: 'string',
          default: 'Content-Type',
        },
        VALUE: {
          type: 'string',
          default: 'text/plain',
        },
      },
      python(block) {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const header = this.valueToCode(block, 'HEADER', this.ORDER_NONE) || '""';
        const value = this.valueToCode(block, 'VALUE', this.ORDER_NONE) || '""';
        code += `request.set_header(str(${header}), str(${value}))\n`;
        return code;
      },
      vm(block) {
        this.definitions_['request_option'] = `runtime.data['request_option'] = {};`;
        this.definitions_['request_option_headers'] = `runtime.data['request_option']['headers'] = {};`;
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const header = this.valueToCode(block, 'HEADER', this.ORDER_NONE) || '""';
        const value = this.valueToCode(block, 'VALUE', this.ORDER_NONE) || '""';
        code += `runtime.data['request_option']['headers'][${header}] = ${value};\n`;
        return code;
      },
    },
    {
      id: 'set_body',
      text: (
        <Text
          id="extension.request.setBody"
          defaultMessage="set body [KEY] to [VALUE]"
        />
      ),
      inputs: {
        KEY: {
          type: 'string',
          default: 'key',
        },
        VALUE: {
          type: 'string',
          default: 'value',
        },
      },
      python(block) {
        this.definitions_['import_extension_request'] = 'from extensions.request import request';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const key = this.valueToCode(block, 'KEY', this.ORDER_NONE) || '""';
        const value = this.valueToCode(block, 'VALUE', this.ORDER_NONE) || '""';
        code += `request.set_header(str(${key}), str(${value}))\n`;
        return code;
      },
      vm(block) {
        this.definitions_['request_option'] = `runtime.data['request_option'] = {};`;
        this.definitions_['request_option_headers'] = `runtime.data['request_option']['body'] = {};`;
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const key = this.valueToCode(block, 'KEY', this.ORDER_NONE) || '""';
        const value = this.valueToCode(block, 'VALUE', this.ORDER_NONE) || '""';
        code += `runtime.data['request_option']['body'][${key}] = ${value};\n`;
        return code;
      },
    },
  ],
  translations,
};
