import { Text } from '@blockcode/ui';

import tankwarImage from './tankwar.png';
import tankwarBackground from './tankwar-bg.jpg';

export default function (onOpenWorkspace) {
  return {
    title: (
      <Text
        id="gui.coverpages.tankwar.title"
        defaultMessage="The Tank War is coming! Join us! NOW!"
      />
    ),
    backgroundImage: tankwarBackground,
    featureImage: tankwarImage,
    buttonText: (
      <Text
        id="gui.coverpages.tankwar.button"
        defaultMessage="Join us"
      />
    ),
    onClick: () => onOpenWorkspace('tankwar'),
  };
}
