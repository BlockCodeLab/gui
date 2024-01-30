import { Text } from '@blockcode/ui';
import picoedImage from './picoed.png';

export default {
  preview: true,
  package: 'picoed',
  image: picoedImage,
  name: (
    <Text
      id="gui.workspace.picoed.name"
      defaultMessage="ELECFREAKS Pico:ed V2"
    />
  ),
  description: (
    <Text
      id="gui.workspace.picoed.description"
      defaultMessage="Small board, endless possibilities."
    />
  ),
  collaborator: (
    <Text
      id="gui.workspace.picoed.collaborator"
      defaultMessage="Yeqin Gong"
    />
  ),
  blocksRequired: true,
};
