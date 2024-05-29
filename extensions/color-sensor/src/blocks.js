import { Text } from '@blockcode/ui';
import translations from './l10n.yaml';
import iconURI from './icon.svg';
import colorPyURI from './color.py';

export default function (deviceId) {
  const setPortBlock =
    deviceId !== 'arcade'
      ? [
          {
            id: 'setPort',
            text: (
              <Text
                id="extension.colorSensor.setPort"
                defaultMessage="set port to [PORT]"
              />
            ),
            inputs: {
              PORT: {
                type: 'text',
                default: 'A',
                menu: [
                  ['A', 'A'],
                  ['B', 'B'],
                  ['C', 'C'],
                  ['D', 'D'],
                  ['E', 'E'],
                  ['F', 'F'],
                ],
              },
            },
            python(block) {
              this.definitions_['import_extension_color_sensor'] = 'from extensions.color_sensor import color';
              let code = '';
              if (this.STATEMENT_PREFIX) {
                code += this.injectId(this.STATEMENT_PREFIX, block);
              }
              const port = this.quote_(block.getFieldValue('PORT') || 'A');
              code += `color.set_sensor(${port})\n`;
              return code;
            },
          },
        ]
      : [];

  return {
    iconURI,
    name: (
      <Text
        id="extension.colorSensor.name"
        defaultMessage="Color Sensor"
      />
    ),
    files: [
      {
        name: 'color',
        type: 'text/x-python',
        uri: colorPyURI,
      },
    ],
    blocks: setPortBlock.concat([
      {
        id: 'calibrate',
        text: (
          <Text
            id="extension.colorSensor.calibration"
            defaultMessage="[COLOR] color calibration"
          />
        ),
        inputs: {
          COLOR: {
            type: 'text',
            default: 'white',
            menu: [
              [
                <Text
                  id="extension.colorSensor.calibration.white"
                  defaultMessage="white"
                />,
                'white',
              ],
              [
                <Text
                  id="extension.colorSensor.calibration.black"
                  defaultMessage="black"
                />,
                'black',
              ],
            ],
          },
        },
        python(block) {
          this.definitions_['import_extension_color_sensor'] = 'from extensions.color_sensor import color';
          if (deviceId === 'arcade') {
            this.definitions_['color_set_sensor'] = 'color.set_sensor("C")';
          }
          let code = '';
          if (this.STATEMENT_PREFIX) {
            code += this.injectId(this.STATEMENT_PREFIX, block);
          }
          const color = this.quote_(block.getFieldValue('COLOR') || 'white');
          code += `color.calibrate(str(${color}))\n`;
          return code;
        },
      },

      {
        id: 'is_calibrated',
        text: (
          <Text
            id="extension.colorSensor.isCalibrated"
            defaultMessage="white color calibrated?"
          />
        ),
        output: 'boolean',
        python() {
          this.definitions_['import_extension_color_sensor'] = 'from extensions.color_sensor import color';
          if (deviceId === 'arcade') {
            this.definitions_['color_set_sensor'] = 'color.set_sensor("C")';
          }
          const code = `color.is_calibrated()`;
          return [code, this.ORDER_FUNCTION_CALL];
        },
      },
      {
        id: 'color',
        text: (
          <Text
            id="extension.colorSensor.color"
            defaultMessage="recognized [MODE]"
          />
        ),
        output: 'string',
        inputs: {
          MODE: {
            type: 'number',
            default: -1,
            menu: [
              [
                <Text
                  id="extension.colorSensor.color.rgb"
                  defaultMessage="color"
                />,
                '-1',
              ],
              [
                <Text
                  id="extension.colorSensor.color.red"
                  defaultMessage="red"
                />,
                '0',
              ],
              [
                <Text
                  id="extension.colorSensor.color.green"
                  defaultMessage="green"
                />,
                '1',
              ],
              [
                <Text
                  id="extension.colorSensor.color.blue"
                  defaultMessage="blue"
                />,
                '2',
              ],
            ],
          },
        },
        python(block) {
          this.definitions_['import_extension_color_sensor'] = 'from extensions.color_sensor import color';
          if (deviceId === 'arcade') {
            this.definitions_['color_set_sensor'] = 'color.set_sensor("C")';
          }
          const mode = block.getFieldValue('MODE') || '-1';
          const code = `color.get_color(num(${mode}))`;
          return [code, this.ORDER_FUNCTION_CALL];
        },
      },
      {
        id: 'on',
        text: (
          <Text
            id="extension.colorSensor.on"
            defaultMessage="on LEDs"
          />
        ),
        python(block) {
          this.definitions_['import_extension_color_sensor'] = 'from extensions.color_sensor import color';
          if (deviceId === 'arcade') {
            this.definitions_['color_set_sensor'] = 'color.set_sensor("C")';
          }
          let code = '';
          if (this.STATEMENT_PREFIX) {
            code += this.injectId(this.STATEMENT_PREFIX, block);
          }
          code += `color.on()\n`;
          return code;
        },
      },
      {
        id: 'off',
        text: (
          <Text
            id="extension.colorSensor.off"
            defaultMessage="off LEDs"
          />
        ),
        python(block) {
          this.definitions_['import_extension_color_sensor'] = 'from extensions.color_sensor import color';
          if (deviceId === 'arcade') {
            this.definitions_['color_set_sensor'] = 'color.set_sensor("C")';
          }
          let code = '';
          if (this.STATEMENT_PREFIX) {
            code += this.injectId(this.STATEMENT_PREFIX, block);
          }
          code += `color.off()\n`;
          return code;
        },
      },
    ]),
    translations,
  };
}
