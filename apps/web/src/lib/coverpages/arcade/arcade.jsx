import { Text } from '@blockcode/ui';

import arcadeImage from './arcade.png';
import arcadeBackground from './arcade-bg.jpg';

export default function (onOpenWorkspace) {
  return {
    title: (
      <Text
        id="gui.coverpages.arcade.title"
        defaultMessage="The Tank War is coming! Join us! NOW!"
      />
    ),
    backgroundImage: arcadeBackground,
    featureImage: arcadeImage,
    buttonText: (
      <Text
        id="gui.coverpages.arcade.button"
        defaultMessage="Play now"
      />
    ),
    onClick: () => onOpenWorkspace('arcade'),
  };
}
