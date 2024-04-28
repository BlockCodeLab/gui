import { Text } from '@blockcode/ui';
import popsicleImage from './popsicle.png';

export default {
  disabled: true,
  package: 'popsicle',
  image: popsicleImage,
  name: (
    <Text
      id="gui.workspace.popsicle.name"
      defaultMessage="Popsicle"
    />
  ),
  description: (
    <Text
      id="gui.workspace.popsicle.description"
      defaultMessage="The equipment can play with the real world."
    />
  ),
  blocksRequired: true,
};
