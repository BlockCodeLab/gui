import { Text } from '@blockcode/ui';

import tankwarBackground from './images/tankwar-bg.jpg';
import tanksImage from './images/tanks.png';

export default function (onOpenWorkspace, onOpenProject) {
  return [
    {
      title: (
        <Text
          id="gui.coverpages.tankwar.title"
          defaultMessage="The Tank War is coming! Join us! NOW!"
        />
      ),
      backgroundImage: tankwarBackground,
      featureImage: tanksImage,
      buttonText: (
        <Text
          id="gui.coverpages.tankwar.button"
          defaultMessage="Join us"
        />
      ),
      onClick: () => onOpenWorkspace('tankwar'),
    },
  ];
}
