import { Runtime as BaseRuntime, paperCore } from '@blockcode/blocks-player';
import { base64ToUint8Array } from '../../lib/base64-util';

export default class Runtime extends BaseRuntime {
  get tanks() {
    return paperCore.project.activeLayer.children;
  }

  get player() {
    return this.tanks['player'];
  }

  get redTank() {
    return this.tanks['red'];
  }

  get yellowTank() {
    return this.tanks['yellow'];
  }

  get greenTank() {
    return this.tanks['green'];
  }
}
