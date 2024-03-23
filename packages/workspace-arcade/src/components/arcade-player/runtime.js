import { paperCore, Runtime as BaseRuntime } from '@blockcode/blocks-player';
import { Tone, Music } from '@blockcode/tone-player';
import RotationStyle from '../../lib/rotation-style';
import { VIEW_WIDTH, VIEW_HEIGHT, DEFAULT_DIRECTION } from '../../lib/default-project';

import '../../generators/javascript';

export default class Runtime extends BaseRuntime {
  static VIEW_WIDTH = VIEW_WIDTH;
  static VIEW_HEIGHT = VIEW_HEIGHT;
  static DEFAULT_DIRECTION = DEFAULT_DIRECTION;

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
    return stageLayer.children[0];
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
    return super.stop();
  }
}
