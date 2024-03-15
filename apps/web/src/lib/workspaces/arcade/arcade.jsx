import { Text } from '@blockcode/ui';
import arcadeImage from './arcade.png';

export default {
  preview: true,
  package: 'arcade',
  image: arcadeImage,
  name: (
    <Text
      id="gui.workspace.arcade.name"
      defaultMessage="Scratch Arcade"
    />
  ),
  description: (
    <Text
      id="gui.workspace.arcade.description"
      defaultMessage="Arcade game edit and play."
    />
  ),
  collaborator: (
    <Text
      id="gui.workspace.arcade.collaborator"
      defaultMessage="BlockCode Lab"
    />
  ),
  blocksRequired: true,
};
