import { paperCore, Runtime as BaseRuntime } from '@blockcode/blocks-player';
import { Tone, Music } from '@blockcode/tone-player';
import RotationStyle from '../../lib/rotation-style';

import '../../generators/javascript';

export default class Runtime extends BaseRuntime {
  static VIEW_WIDTH = 320;
  static VIEW_HEIGHT = 240;
  static DEFAULT_DIRECTION = 90;

  get tone() {
    if (!this._tone) {
      this._tone = new Tone({ type: 'square' });
    }
    return this._tone;
  }

  get Music() {
    return Music;
  }

  get RotationStyle() {
    return RotationStyle;
  }

  get stage() {
    const stageLayer = paperCore.project.layers['stage'];
    const raster = stageLayer.children[0];
    raster.util.runtime = this;
    return raster;
  }

  get sprites() {
    const spriteLayer = paperCore.project.layers['sprite'];
    return spriteLayer.children;
  }

  getSpriteById(id) {
    const raster = this.sprites[id];
    raster.util.runtime = this;
    return raster;
  }

  random(min = 1, max = 10) {
    if (min === 'width') {
      max = Runtime.VIEW_WIDTH / 2;
      min = -max;
    }
    if (min === 'height') {
      max = Runtime.VIEW_HEIGHT / 2;
      min = -max;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  stop() {
    if (this._tone) {
      this._tone.stop();
    }
    super.stop();
  }
}
