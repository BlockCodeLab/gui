import { Text } from '@blockcode/ui';
import translations from './l10n.yaml';
import iconURI from './icon.svg';
import broadcastPyURI from './broadcast.py';

export default {
  iconURI,
  name: (
    <Text
      id="extension.broadcast.name"
      defaultMessage="Broadcast"
    />
  ),
  files: [
    {
      name: 'broadcast',
      type: 'text/x-python',
      uri: broadcastPyURI,
    },
  ],
  blocks: [
    {
      id: 'setGroup',
      text: (
        <Text
          id="extension.broadcast.setGroup"
          defaultMessage="set broadcast group [ID]"
        />
      ),
      inputs: {
        ID: {
          type: 'number',
          default: 1,
        },
      },
      python(block) {
        this.definitions_['import_extension_broadcast'] = 'from extensions.broadcast import broadcast';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const id = this.valueToCode(block, 'ID', this.ORDER_NONE) || 1;
        code += `broadcast.set_group(num(${id}))\n`;
        return code;
      },
    },
    '---',
    {
      id: 'whenReceived',
      text: (
        <Text
          id="extension.broadcast.whenReceived"
          defaultMessage="when I receive message"
        />
      ),
      hat: true,
      python() {
        this.definitions_['import_extension_broadcast'] = 'from extensions.broadcast import broadcast';
        const hatCode = this.hatToCode('broadcast_received', 'target');
        return `${hatCode}broadcast.when_received("default", ${this.HAT_FUNCTION_PLACEHOLDER}, target)\n`;
      },
    },
    {
      id: 'send',
      text: (
        <Text
          id="extension.broadcast.send"
          defaultMessage="broadcast message [MESSAGE]"
        />
      ),
      inputs: {
        MESSAGE: {
          type: 'text',
          default: (
            <Text
              id="extension.broadcast.message"
              defaultMessage="hello"
            />
          ),
        },
      },
      python(block) {
        this.definitions_['import_extension_broadcast'] = 'from extensions.broadcast import broadcast';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const message = this.valueToCode(block, 'MESSAGE', this.ORDER_NONE) || '""';
        code += `broadcast.send(str(${message}))\n`;
        return code;
      },
    },
    {
      id: 'received',
      text: (
        <Text
          id="extension.broadcast.received"
          defaultMessage="received message"
        />
      ),
      output: 'string',
      python() {
        this.definitions_['import_extension_broadcast'] = 'from extensions.broadcast import broadcast';
        const code = 'broadcast.get_message()\n';
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    '---',
    {
      id: 'whenReceivedNamed',
      text: (
        <Text
          id="extension.broadcast.whenReceivedNamed"
          defaultMessage="when I receive named [NAME] message"
        />
      ),
      hat: true,
      inputs: {
        NAME: {
          type: 'text',
          default: (
            <Text
              id="extension.broadcast.messageName"
              defaultMessage="my"
            />
          ),
        },
      },
      python(block) {
        this.definitions_['import_extension_broadcast'] = 'from extensions.broadcast import broadcast';
        const hatCode = this.hatToCode('broadcast_received', 'target');
        const name = this.valueToCode(block, 'NAME', this.ORDER_NONE) || '"default"';
        return `${hatCode}broadcast.when_received(str(${name}), ${this.HAT_FUNCTION_PLACEHOLDER}, target)\n`;
      },
    },
    {
      id: 'sendName',
      text: (
        <Text
          id="extension.broadcast.sendName"
          defaultMessage="broadcast named [NAME] message [MESSAGE]"
        />
      ),
      inputs: {
        NAME: {
          type: 'text',
          default: (
            <Text
              id="extension.broadcast.messageName"
              defaultMessage="say"
            />
          ),
        },
        MESSAGE: {
          type: 'text',
          default: (
            <Text
              id="extension.broadcast.message"
              defaultMessage="hello"
            />
          ),
        },
      },
      python(block) {
        this.definitions_['import_extension_broadcast'] = 'from extensions.broadcast import broadcast';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const name = this.valueToCode(block, 'NAME', this.ORDER_NONE) || '"default"';
        const message = this.valueToCode(block, 'MESSAGE', this.ORDER_NONE) || '""';
        code += `broadcast.send(str(${message}), name=str(${name}))\n`;
        return code;
      },
    },
    {
      id: 'receivedNamed',
      text: (
        <Text
          id="extension.broadcast.receivedNamed"
          defaultMessage="received named [NAME] message"
        />
      ),
      output: 'string',
      inputs: {
        NAME: {
          type: 'text',
          default: (
            <Text
              id="extension.broadcast.messageName"
              defaultMessage="say"
            />
          ),
        },
      },
      python(block) {
        this.definitions_['import_extension_broadcast'] = 'from extensions.broadcast import broadcast';
        const name = this.valueToCode(block, 'NAME', this.ORDER_NONE) || '"default"';
        const code = `broadcast.get_message(str(${name}))\n`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    '---',
    {
      id: 'receivedIndex',
      text: (
        <Text
          id="extension.broadcast.receivedIndex"
          defaultMessage="received message [INDEX]"
        />
      ),
      output: 'number',
      inputs: {
        INDEX: {
          type: 'string',
          default: 'timestamp',
          menu: [
            [
              <Text
                id="extension.broadcast.receivedTime"
                defaultMessage=""
              />,
              'timestamp',
            ],
            [
              <Text
                id="extension.broadcast.receivedSerial"
                defaultMessage=""
              />,
              'serialnumber',
            ],
          ],
        },
      },
      python(block) {
        this.definitions_['import_extension_broadcast'] = 'from extensions.broadcast import broadcast';
        const index = this.quote_(block.getFieldValue('INDEX') || 'timestamp');
        const code = `broadcast.get_message_info(str(${index}))\n`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    {
      id: 'receivedNamedIndex',
      text: (
        <Text
          id="extension.broadcast.receivedNameIndex"
          defaultMessage="received named [NAME] message [INDEX]"
        />
      ),
      output: 'number',
      inputs: {
        NAME: {
          type: 'text',
          default: (
            <Text
              id="extension.broadcast.messageName"
              defaultMessage="say"
            />
          ),
        },
        INDEX: {
          type: 'string',
          default: 'timestamp',
          menu: [
            [
              <Text
                id="extension.broadcast.receivedTime"
                defaultMessage=""
              />,
              'timestamp',
            ],
            [
              <Text
                id="extension.broadcast.receivedSerial"
                defaultMessage=""
              />,
              'serialnumber',
            ],
          ],
        },
      },
      python(block) {
        this.definitions_['import_extension_broadcast'] = 'from extensions.broadcast import broadcast';
        const name = this.valueToCode(block, 'NAME', this.ORDER_NONE) || '"default"';
        const index = this.quote_(block.getFieldValue('INDEX') || 'timestamp');
        const code = `broadcast.get_message_info(str(${index}), name=str(${name}))\n`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
  ],
  translations,
};
