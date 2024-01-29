import { Text } from '@blockcode/ui';
import tankwarImage from './tankwar.png';

export default {
  preview: true,
  package: 'tankwar-blocks',
  image: tankwarImage,
  name: (
    <Text
      id="gui.workspace.tankwar.name"
      defaultMessage="Tank War"
    />
  ),
  description: (
    <Text
      id="gui.workspace.tankwar.description"
      defaultMessage="Program your tank and go to battle!"
    />
  ),
  collaborator: (
    <Text
      id="gui.workspace.tankwar.collaborator"
      defaultMessage="Yeqin Gong"
    />
  ),
  blocksRequired: true,
};
