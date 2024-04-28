import { Text } from '@blockcode/ui';
import arcadeImage from './arcade.png';

export default {
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
  blocksRequired: true,
};
