import { Text } from '@blockcode/ui';
import translations from './l10n.yaml';
import iconURI from './icon.png';

function provideSetServoFunction() {
  this.definitions_['from_machine_import_pin'] = 'from machine import Pin';
  this.definitions_['from_machine_import_pwm'] = 'from machine import PWM';
  return this.provideFunction_('set_servo', [
    `def ${this.FUNCTION_NAME_PLACEHOLDER_}(pin, ms=0, angle=None, max_angle=180):`,
    '  if angle != None:',
    '    ms = 1.5 - angle / max_angle',
    '  PWM(Pin(pin), freq=50).duty_u16(int(ms / 20 * 65535))',
  ]);
}

export default {
  iconURI,
  name: (
    <Text
      id="extension.servo.name"
      defaultMessage="Servo"
    />
  ),
  blocks: [
    {
      id: 'set_90servo',
      text: (
        <Text
          id="extension.servo.90servo"
          defaultMessage="set PIN [PIN] 90° servo angle to [ANGLE]°"
        />
      ),
      inputs: {
        PIN: {
          type: 'number',
          default: 0,
        },
        ANGLE: {
          type: 'angle',
          default: 0,
        },
      },
      python(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const functionName = provideSetServoFunction.call(this);
        const pinCode = this.valueToCode(block, 'PIN', this.ORDER_NONE) || '0';
        const angleCode = this.valueToCode(block, 'ANGLE', this.ORDER_NONE) || '0';
        code += `${functionName}(${pinCode}, angle=${angleCode}, max_angle=90)\n`;
        return code;
      },
    },
    {
      id: 'set_180servo',
      text: (
        <Text
          id="extension.servo.180servo"
          defaultMessage="set PIN [PIN] 180° servo angle to [ANGLE]°"
        />
      ),
      inputs: {
        PIN: {
          type: 'number',
          default: 0,
        },
        ANGLE: {
          type: 'angle',
          default: 0,
        },
      },
      python(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const functionName = provideSetServoFunction.call(this);
        const pinCode = this.valueToCode(block, 'PIN', this.ORDER_NONE) || '0';
        const angleCode = this.valueToCode(block, 'ANGLE', this.ORDER_NONE) || '0';
        code += `${functionName}(${pinCode}, angle=${angleCode}, max_angle=180)\n`;
        return code;
      },
    },
    '---',
    {
      id: 'set_motor',
      text: (
        <Text
          id="extension.servo.motor"
          defaultMessage="set PIN [PIN] 360° servo rotate [ROTATE]"
        />
      ),
      inputs: {
        PIN: {
          type: 'number',
          default: 0,
        },
        ROTATE: {
          type: 'number',
          default: '2',
          menu: [
            [
              <Text
                id="extension.servo.motorClockwise"
                defaultMessage="clockwise"
              />,
              '2',
            ],
            [
              <Text
                id="extension.servo.motorAnticlockwise"
                defaultMessage="anticlockwise"
              />,
              '1',
            ],
          ],
        },
      },
      python(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const functionName = provideSetServoFunction.call(this);
        const pinCode = this.valueToCode(block, 'PIN', this.ORDER_NONE) || '0';
        const rotateCode = block.getFieldValue('ROTATE') || '2';
        code += `${functionName}(${pinCode}, ${rotateCode})\n`;
        return code;
      },
    },
  ],
  translations,
};
