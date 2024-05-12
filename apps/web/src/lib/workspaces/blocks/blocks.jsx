import { Text } from '@blockcode/ui';
import blocksImage from './blocks.png';

export default {
  hidden: true,
  package: 'blocks',
  image: blocksImage,
  name: (
    <Text
      id="gui.workspace.blocks.name"
      defaultMessage="MicroPython Blocks"
    />
  ),
  description: (
    <Text
      id="gui.workspace.blocks.description"
      defaultMessage="A wonderful world of building blocks."
    />
  ),
  blocksRequired: true,
};
