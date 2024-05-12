import { Text } from '@blockcode/ui';
import microbitImage from './microbit.png';

export default {
  disabled: true,
  package: 'microbit',
  image: microbitImage,
  name: (
    <Text
      id="gui.workspace.microbit.name"
      defaultMessage="micro:bit"
    />
  ),
  description: (
    <Text
      id="gui.workspace.microbit.description"
      defaultMessage="Connect your projects with the world."
    />
  ),
  collaborator: (
    <Text
      id="gui.workspace.microbit.collaborator"
      defaultMessage="micro:bit"
    />
  ),
  blocksRequired: true,
};
