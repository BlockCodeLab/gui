import arcade from './arcade/arcade';
import tankwar from './tankwar/tankwar';

export default function (onOpenWorkspace, onOpenProject) {
  return [arcade(onOpenWorkspace), tankwar(onOpenWorkspace)];
}
