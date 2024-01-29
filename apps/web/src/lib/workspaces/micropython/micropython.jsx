import { Text } from '@blockcode/ui';
import micropythonImage from './micropython.png';

export default {
  disabled: true,
  package: 'micropython',
  image: micropythonImage,
  name: (
    <Text
      id="gui.workspace.micropython.name"
      defaultMessage="MicroPython"
    />
  ),
  description: (
    <Text
      id="gui.workspace.micropython.description"
      defaultMessage="Write magical code that controls everything."
    />
  ),
  collaborator: (
    <Text
      id="gui.workspace.micropython.collaborator"
      defaultMessage="BlockCode Lab"
    />
  ),
  micropythonRequired: true,
};
