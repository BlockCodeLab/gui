import { Text } from '@blockcode/ui';
import popsicleImage from './popsicle.png';

export default {
  // disabled: true,
  preview: true,
  package: 'popsicle-blocks',
  image: popsicleImage,
  name: (
    <Text
      id="gui.workspace.popsicle.name"
      defaultMessage="Popsicle (Scratch)"
    />
  ),
  description: (
    <Text
      id="gui.workspace.popsicle.description"
      defaultMessage="The equipment can play with the real world."
    />
  ),
  collaborator: (
    <Text
      id="gui.workspace.popsicle.collaborator"
      defaultMessage="BlockCode Lab"
    />
  ),
  blocksRequired: true,
};
