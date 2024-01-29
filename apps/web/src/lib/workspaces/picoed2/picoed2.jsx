import { Text } from '@blockcode/ui';
import picoed2Image from './picoed2.png';

export default {
  // disabled: true,
  preview: true,
  package: 'picoed-blocks',
  image: picoed2Image,
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
