import { Text } from '@blockcode/ui';
import translations from './l10n.yaml';
import iconURI from './icon.svg';
import penPyURI from './pen.py';

function provideRendererFunctionJs() {
  return this.provideFunction_('pen_renderer', [
    `const ${this.FUNCTION_NAME_PLACEHOLDER_} = (item) => {`,
    `  let renderer = stage.layer.children['pen_renderer'];`,
    '  if (!renderer) {',
    '    renderer = new runtime.core.Group();',
    `    renderer.name = 'pen_renderer';`,
    '    stage.layer.addChild(renderer)',
    '  }',
    '  if (item) {',
    '    item.visible = true;',
    '    renderer.addChild(item);',
    '  }',
    '  return renderer;',
    '};',
  ]);
}

function provideDrawFunctionJs() {
  return this.provideFunction_('pen_draw', [
    `const ${this.FUNCTION_NAME_PLACEHOLDER_} = (target) => {`,
    '  if (target.data.pen_update) return;',
    '  const item = new runtime.core.Group();',
    '  item.data = {',
    '    x: target.position.x,',
    '    y: target.position.y,',
    '  };',
    '  target.data.pen_update = () => {',
    '    const { x, y } = target.position;',
    '    if (item.data.x !== x || item.data.y !== y) {',
    '      item.addChild(new runtime.core.Path.Line({',
    '        from: [item.data.x, item.data.y],',
    '        to: [x, y],',
    `        strokeColor: target.data.pen_color || '#000000',`,
    '        strokeWidth: target.data.pen_size || 1,',
    `        strokeCap: 'round',`,
    `        strokeJoin: 'round',`,
    '      }));',
    '      item.data = { x, y };',
    '    }',
    '  };',
    `  target.util.on('update', target.data.pen_update)`,
    `  runtime.once('stop', () => {`,
    '    if (target.data.pen_update) {',
    `      target.util.off('update', target.data.pen_update);`,
    '      target.data.pen_update = null;',
    '    }',
    '  });',
    '  return item;',
    '};',
  ]);
}

export default {
  iconURI,
  name: (
    <Text
      id="extension.pen.name"
      defaultMessage="Pen"
    />
  ),
  files: [
    {
      name: 'pen',
      type: 'text/x-python',
      uri: penPyURI,
    },
  ],
  blocks: [
    {
      id: 'erase',
      text: (
        <Text
          id="extension.pen.erase"
          defaultMessage="erase all"
        />
      ),
      python(block) {
        this.definitions_['import_extension_pen'] = 'from extensions.pen import pen';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `pen.clear()\n`;
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const renderer = provideRendererFunctionJs.call(this);
        code += `${renderer}().children.forEach((group) => group.removeChildren());\n`;
        return code;
      },
    },
    {
      id: 'stamp',
      text: (
        <Text
          id="extension.pen.stamp"
          defaultMessage="stamp"
        />
      ),
      useStage: false,
      python(block) {
        this.definitions_['import_extension_pen'] = 'from extensions.pen import pen';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `pen.stamp(target)\n`;
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const renderer = provideRendererFunctionJs.call(this);
        code += `${renderer}(target.clone());\n`;
        return code;
      },
    },
    {
      id: 'down',
      text: (
        <Text
          id="extension.pen.down"
          defaultMessage="pen down"
        />
      ),
      useStage: false,
      python(block) {
        this.definitions_['import_extension_pen'] = 'from extensions.pen import pen';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `pen.down(target)\n`;
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const renderer = provideRendererFunctionJs.call(this);
        const draw = provideDrawFunctionJs.call(this);
        code += `${renderer}(${draw}(target));\n`;
        return code;
      },
    },
    {
      id: 'up',
      text: (
        <Text
          id="extension.pen.up"
          defaultMessage="pen up"
        />
      ),
      useStage: false,
      python(block) {
        this.definitions_['import_extension_pen'] = 'from extensions.pen import pen';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `pen.up(target)\n`;
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `if (target.data.pen_update) {\n`;
        code += `  target.util.off('update', target.data.pen_update);\n`;
        code += `  target.data.pen_update = null;\n`;
        code += '}\n';
        return code;
      },
    },
    {
      id: 'penColor',
      text: (
        <Text
          id="extension.pen.penColor"
          defaultMessage="set pen color to [COLOR]"
        />
      ),
      useStage: false,
      inputs: {
        COLOR: {
          type: 'color',
        },
      },
      python(block) {
        this.definitions_['import_extension_pen'] = 'from extensions.pen import pen';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const color = this.valueToCode(block, 'COLOR', this.ORDER_NONE) || '(0, 0, 0)';
        code += `pen.set_color(target, ${color})\n`;
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const color = this.valueToCode(block, 'COLOR', this.ORDER_NONE) || '"#000000"';
        code += `target.data.pen_color = ${color};\n`;
        return code;
      },
    },
    {
      id: 'changePen',
      text: (
        <Text
          id="extension.pen.changePen"
          defaultMessage="change pen [OPTION] by [VALUE]"
        />
      ),
      useStage: false,
      inputs: {
        OPTION: {
          type: 'string',
          default: 'color',
          menu: [
            [
              <Text
                id="extension.pen.color"
                defaultMessage="color"
              />,
              'hue',
            ],
            [
              <Text
                id="extension.pen.saturation"
                defaultMessage="saturation"
              />,
              'saturation',
            ],
            [
              <Text
                id="extension.pen.brightness"
                defaultMessage="brightness"
              />,
              'brightness',
            ],
          ],
        },
        VALUE: {
          type: 'number',
          default: 10,
        },
      },
      python(block) {
        this.definitions_['import_extension_pen'] = 'from extensions.pen import pen';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const option = block.getFieldValue('OPTION');
        const value = this.valueToCode(block, 'VALUE', this.ORDER_NONE) || 0;
        code += `pen.change_color(target, ${option} = num(${value}))\n`;
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const option = block.getFieldValue('OPTION');
        const value = this.valueToCode(block, 'VALUE', this.ORDER_NONE) || 0;
        code += `target.data.pen_color = new runtime.core.Color(target.data.pen_color).convert('hsb');\n`;
        if (option === 'hue') {
          code += `target.data.pen_color.${option} = (target.data.pen_color.${option} + runtime.number(${value}) * 3.6) % 360;\n`;
        } else {
          code += `target.data.pen_color.${option} = runtime.clamp(target.data.pen_color.${option} + runtime.number(${value}) / 100, 0, 1);\n`;
        }
        code += `target.data.pen_color = target.data.pen_color.toCSS(true);\n`;
        return code;
      },
    },
    {
      id: 'setPen',
      text: (
        <Text
          id="extension.pen.setPen"
          defaultMessage="set pen [OPTION] to [VALUE]"
        />
      ),
      useStage: false,
      inputs: {
        OPTION: {
          type: 'string',
          default: 'color',
          menu: [
            [
              <Text
                id="extension.pen.color"
                defaultMessage="color"
              />,
              'hue',
            ],
            [
              <Text
                id="extension.pen.saturation"
                defaultMessage="saturation"
              />,
              'saturation',
            ],
            [
              <Text
                id="extension.pen.brightness"
                defaultMessage="brightness"
              />,
              'brightness',
            ],
          ],
        },
        VALUE: {
          type: 'number',
          default: 50,
        },
      },
      python(block) {
        this.definitions_['import_extension_pen'] = 'from extensions.pen import pen';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const option = block.getFieldValue('OPTION');
        const value = this.valueToCode(block, 'VALUE', this.ORDER_NONE) || 0;
        code += `pen.set_color(${option} = num(${value}))\n`;
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const option = block.getFieldValue('OPTION');
        const value = this.valueToCode(block, 'VALUE', this.ORDER_NONE) || 0;
        code += 'target.data.pen_color = new runtime.core.Color(target.data.pen_color);\n';
        if (option === 'hue') {
          code += `target.data.pen_color.${option} = runtime.number(${value}) * 3.6 % 360;\n`;
        } else {
          code += `target.data.pen_color.${option} = runtime.clamp(runtime.number(${value}) / 100, 0, 1);\n`;
        }
        code += `target.data.pen_color = target.data.pen_color.toCSS(true);\n`;
        return code;
      },
    },
    {
      id: 'changeSize',
      text: (
        <Text
          id="extension.pen.changeSize"
          defaultMessage="change pen size by [SIZE]"
        />
      ),
      useStage: false,
      inputs: {
        SIZE: {
          type: 'number',
          default: 1,
        },
      },
      python(block) {
        this.definitions_['import_extension_pen'] = 'from extensions.pen import pen';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const size = this.valueToCode(block, 'SIZE', this.ORDER_NONE) || 1;
        code += `pen.change_size(target, num(${size}))\n`;
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const size = this.valueToCode(block, 'SIZE', this.ORDER_NONE) || 1;
        code += `target.data.pen_size = runtime.number(target.data.pen_size, 1) + runtime.number(${size}, 1);\n`;
        return code;
      },
    },
    {
      id: 'setSize',
      text: (
        <Text
          id="extension.pen.setSize"
          defaultMessage="set pen size to [SIZE]"
        />
      ),
      useStage: false,
      inputs: {
        SIZE: {
          type: 'number',
          default: 1,
        },
      },
      python(block) {
        this.definitions_['import_extension_pen'] = 'from extensions.pen import pen';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const size = this.valueToCode(block, 'SIZE', this.ORDER_NONE) || 1;
        code += `pen.set_size(target, num(${size}))\n`;
        return code;
      },
      vm(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const size = this.valueToCode(block, 'SIZE', this.ORDER_NONE) || 1;
        code += `target.data.pen_size = runtime.number(${size}, 1);\n`;
        return code;
      },
    },
  ],
  translations,
};
