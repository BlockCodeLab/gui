import { Text } from '@blockcode/ui';
import blocksImage from './blocks.png';

export default {
  preview: true,
  package: 'blocks',
  image: blocksImage,
  name: (
    <Text
      id="gui.workspace.blocks.name"
      defaultMessage="Blocks"
    />
  ),
  description: (
    <Text
      id="gui.workspace.blocks.description"
      defaultMessage="A wonderful world of building blocks."
    />
  ),
  collaborator: (
    <Text
      id="gui.workspace.blocks.collaborator"
      defaultMessage="BlockCode Lab"
    />
  ),
  blocksRequired: true,
};
