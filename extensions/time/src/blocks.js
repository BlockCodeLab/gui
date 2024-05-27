import { Text } from '@blockcode/ui';
import translations from './l10n.yaml';
import iconURI from './icon.svg';
import ntptimePyURI from './ntptime.py';

function provideGetCurrentTimeJs() {
  this.definitions_['timezone'] = 'let timezone = 8;';
  return this.provideFunction_('time_get_current_time', [
    `const ${this.FUNCTION_NAME_PLACEHOLDER_} = (option = 'year') => {`,
    `  const t = Date.now() + timezone * 60 * 60;`,
    '  const d = new Date(t);',
    `  switch (option) {`,
    `  case 'year': return d.getFullYear();`,
    `  case 'month': return d.getMonth() + 1;`,
    `  case 'date': return d.getDate();`,
    `  case 'weekday': return d.getDay() === 0 ? 7 : d.getDay();`,
    `  case 'hour': return d.getHours();`,
    `  case 'minute': return d.getMinutes();`,
    `  case 'second': return d.getSeconds();`,
    `  default: return '';`,
    '  }',
    '};',
  ]);
}

function provideGetDaysSince2000Js() {
  return this.provideFunction_('get_days_since_2000', [
    `const ${this.FUNCTION_NAME_PLACEHOLDER_} = () => {`,
    '  const t = new Date() - new Date(2000, 0, 1, 0, 0, 0);',
    '  return t / (24 * 3600 * 1000);',
    '};',
  ]);
}

export default {
  iconURI,
  name: (
    <Text
      id="extension.time.name"
      defaultMessage="Time"
    />
  ),
  files: [
    {
      name: 'ntptime',
      type: 'text/x-python',
      uri: ntptimePyURI,
    },
  ],
  blocks: [
    {
      id: 'sync',
      text: (
        <Text
          id="extension.time.sync"
          defaultMessage="sync world time"
        />
      ),
      python(block) {
        this.definitions_['import_extension_time'] = 'from extensions.time import ntptime';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += 'await ntptime.async_world_time()\n';
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += 'await runtime.sleep(1);\n';
        return code;
      },
    },
    {
      id: 'setTimezone',
      text: (
        <Text
          id="extension.time.setTimezone"
          defaultMessage="set timezone to [TIMEZONE]"
        />
      ),
      inputs: {
        TIMEZONE: {
          type: 'number',
          default: '8',
        },
      },
      python(block) {
        this.definitions_['import_extension_time'] = 'from extensions.time import ntptime';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const timezone = this.valueToCode(block, 'TIMEZONE', this.ORDER_NONE) || 8;
        code += `ntptime.timezone = num(${timezone})\n`;
        return code;
      },
      vm(block) {
        this.definitions_['timezone'] = 'let timezone = 8;';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const timezone = this.valueToCode(block, 'TIMEZONE', this.ORDER_NONE) || 8;
        code += `timezone = runtime.number(${timezone});\n`;
        return code;
      },
    },
    {
      id: 'getTime',
      text: (
        <Text
          id="extension.time.getTime"
          defaultMessage="current [OPTION]"
        />
      ),
      output: 'number',
      inputs: {
        OPTION: {
          type: 'text',
          default: 'year',
          menu: [
            [
              <Text
                id="extension.time.option.year"
                defaultMessage="year"
              />,
              'year',
            ],

            [
              <Text
                id="extension.time.option.month"
                defaultMessage="month"
              />,
              'month',
            ],

            [
              <Text
                id="extension.time.option.date"
                defaultMessage="date"
              />,
              'date',
            ],

            [
              <Text
                id="extension.time.option.weekday"
                defaultMessage="day of week"
              />,
              'weekday',
            ],

            [
              <Text
                id="extension.time.option.hour"
                defaultMessage="hour"
              />,
              'hour',
            ],

            [
              <Text
                id="extension.time.option.minute"
                defaultMessage="minute"
              />,
              'minute',
            ],

            [
              <Text
                id="extension.time.option.second"
                defaultMessage="second"
              />,
              'second',
            ],
          ],
        },
      },
      python(block) {
        this.definitions_['import_extension_time'] = 'from extensions.time import ntptime';
        const option = this.quote_(block.getFieldValue('OPTION') || 'year');
        const code = `ntptime.get_time(${option})`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
      vm(block) {
        this.definitions_['timezone'] = 'let timezone = 8;';
        const option = this.quote_(block.getFieldValue('OPTION') || 'year');
        const getCurrentTime = provideGetCurrentTimeJs.call(this);
        const code = `${getCurrentTime}(${option})`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    {
      id: 'days',
      text: (
        <Text
          id="extension.time.days"
          defaultMessage="days since 2000"
        />
      ),
      output: 'number',
      python() {
        this.definitions_['import_extension_time'] = 'from extensions.time import ntptime';
        const code = 'ntptime.get_days()';
        return [code, this.ORDER_FUNCTION_CALL];
      },
      vm() {
        this.definitions_['timezone'] = 'let timezone = 8;';
        const getDaysSince2000 = provideGetDaysSince2000Js.call(this);
        const code = `${getDaysSince2000}()`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
  ],
  translations,
};
