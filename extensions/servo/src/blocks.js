import { Text } from '@blockcode/ui';
import translations from './l10n.yaml';

function provideSetServoFunction() {
  this.definitions_['from_machine_import_pin'] = 'from machine import Pin';
  this.definitions_['from_machine_import_pwm'] = 'from machine import PWM';
  this.definitions_['servo_pwm'] = '__servo_pwm = None';
  return this.provideFunction_('set_servo', [
    [`def ${this.FUNCTION_NAME_PLACEHOLDER_}(pin, ms=0, angle=None, max_angle=180):`],
    '  global __servo_pwm',
    '  if not __servo_pwm:',
    '    __servo_pwm = PWM(Pin(pin), freq=50, duty_u16=0)',
    '  if angle != None:',
    '    ms = 1.5 - angle / max_angle',
    '  __servo_pwm.duty_u16(int(ms / 20 * 65535))',
  ]);
}

export default {
  name: (
    <Text
      id="extension.servo.name"
      defaultMessage="Servo"
    />
  ),
  // themeColor: '',
  // inputColor: '',
  iconURI:
    'data:image/png;base64,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',
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
      code(block) {
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
      code(block) {
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
      code(block) {
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
