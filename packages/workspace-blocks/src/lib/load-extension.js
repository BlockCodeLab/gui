import { ScratchBlocks, blockSeparator } from '@blockcode/blocks-editor';
import { pythonGenerator } from '../generators/python';

const OUTPUT_SHAPE_HEXAGONAL = 1;
const OUTPUT_SHAPE_ROUND = 2;
const OUTPUT_SHAPE_SQUARE = 3;
const THEME_COLOR = '#0FBD8C';
const INPUT_COLOR = '#0DA57A';
const OTHER_COLOR = '#0B8E69';

const maybeTranslateMessage = (options, getText) => {
  if (typeof options === 'string') {
    return options;
  }
  if (options.props.children) {
    return options.props.children.map((child) => maybeTranslateMessage(child, getText)).join(' ');
  }
  return getText(options.props.id, options.props);
};

const xmlEscape = (unsafe) => {
  if (typeof unsafe !== 'string') {
    if (Array.isArray(unsafe)) {
      unsafe = String(unsafe);
    } else {
      return unsafe;
    }
  }
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
    }
  });
};

export default function (extensionObject, getText) {
  const { id: extensionId } = extensionObject;

  const extensionName = maybeTranslateMessage(extensionObject.name, getText);

  let categoryXML = `<category name="${xmlEscape(extensionName)}" id="${xmlEscape(extensionId)}"`;
  categoryXML += ` colour="${xmlEscape(extensionObject.themeColor || THEME_COLOR)}"`;
  categoryXML += ` secondaryColour="${xmlEscape(extensionObject.inputColor || INPUT_COLOR)}"`;
  if (extensionObject.iconURI) {
    categoryXML += ` iconURI="${xmlEscape(extensionObject.iconURI)}"`;
  }
  categoryXML += `>\n`;

  extensionObject.blocks.forEach((block) => {
    if (block === '---') {
      categoryXML += `${blockSeparator}\n`;
      return categoryXML;
    }

    const blockId = `${extensionId}_${block.id.toLowerCase()}`;
    const blockJson = {
      message0: maybeTranslateMessage(block.text, getText),
      category: extensionId,
      outputShape: OUTPUT_SHAPE_SQUARE,
      colour: extensionObject.themeColor || THEME_COLOR,
      colourSecondary: extensionObject.inputColor || INPUT_COLOR,
      colourTertiary: extensionObject.otherColor || OTHER_COLOR,
    };

    let argsIndexStart = 1;
    if (extensionObject.iconURI) {
      blockJson.message0 = `%1 %2 ${blockJson.message0}`;
      blockJson.args0 = [
        {
          type: 'field_image',
          src: extensionObject.iconURI,
          width: 40,
          height: 40,
        },
        {
          type: 'field_vertical_separator',
        },
      ];
      blockJson.extensions = ['scratch_extension'];
      argsIndexStart += 2;
    }

    if (block.hat) {
      blockJson.nextStatement = null;
    } else if (block.output) {
      if (block.output === 'boolean') {
        blockJson.output = 'Boolean';
        blockJson.outputShape = OUTPUT_SHAPE_HEXAGONAL;
      } else {
        blockJson.output = 'String'; // TODO: text or nubmer
        blockJson.outputShape = OUTPUT_SHAPE_ROUND;
      }
    } else {
      blockJson.previousStatement = null;
      blockJson.nextStatement = null;
    }

    let blockXML = `<block type="${xmlEscape(blockId)}">\n`;

    if (block.inputs) {
      blockJson.args0 = [].concat(
        blockJson.args0 || [],
        Object.entries(block.inputs).map(([name, arg]) => {
          const argObject = {
            name,
            type: 'input_value',
          };

          if (arg.menu) {
            argObject.type = 'field_dropdown';
            argObject.options = arg.menu.map(([text, value]) => [maybeTranslateMessage(text, getText), value]);
          } else if (arg.type === 'boolean') {
            argObject.check = 'Boolean';
          } else {
            blockXML += `<value name="${xmlEscape(name)}">\n`;
            if (arg.type === 'number') {
              blockXML += '<shadow type="math_number">\n';
              blockXML += `<field name="NUM">`;
            } else if (arg.type === 'angle') {
              blockXML += '<shadow type="math_angle">\n';
              blockXML += `<field name="NUM">`;
            } else {
              blockXML += `<shadow type="${xmlEscape(arg.type)}">\n`;
              blockXML += `<field name="${xmlEscape(arg.type.toUpperCase())}">`;
            }
            blockXML += `${xmlEscape(arg.default)}</field>\n`;
            blockXML += '</shadow>\n';
            blockXML += '</value>';
          }

          blockJson.message0 = blockJson.message0.replace(`[${name}]`, `%${argsIndexStart++}`);
          return argObject;
        }),
      );
    }

    ScratchBlocks.Blocks[blockId] = {
      init() {
        this.jsonInit(blockJson);
      },
    };

    if (block.code) {
      pythonGenerator[blockId] = block.code.bind(pythonGenerator);
    } else {
      pythonGenerator[blockId] = () => '';
    }

    blockXML += '</block>\n';
    categoryXML += blockXML;
  });

  categoryXML += '</category>\n';
  return categoryXML;
}
