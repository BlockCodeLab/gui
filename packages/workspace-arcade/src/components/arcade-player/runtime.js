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
    const stage = stageLayer.children[0];
    stage.util._runtime = this;
    return stage;
  }

  get sprites() {
    const spriteLayer = paperCore.project.layers['sprite'];
    return spriteLayer.children;
  }

  getSpriteById(id) {
    const raster = this.sprites[id];
    raster.util._runtime = this;
    return raster;
  }

  get fnKey() {
    return this._fnKey;
  }

  get upKey() {
    return this._upKey;
  }

  get leftKey() {
    return this._leftKey;
  }

  get rightKey() {
    return this._rightKey;
  }

  get bottomKey() {
    return this._bottomKey;
  }

  get aKey() {
    return this._aKey;
  }

  get bKey() {
    return this._bKey;
  }

  get xKey() {
    return this._xKey;
  }

  get yKey() {
    return this._yKey;
  }

  _fireKey(key) {
    this[`_${key}Key`] = true;
    this.fire(`keypressed_${key}`);
  }

  _releaseKey(key) {
    this[`_${key}Key`] = false;
  }

  handleKeyDown(e) {
    if (e.altKey) {
      this._fireKey('fn');
      return;
    }
    switch (e.code) {
      case 'ArrowUp':
        this._fireKey('up');
        return;
      case 'ArrowLeft':
        this._fireKey('left');
        return;
      case 'ArrowRight':
        this._fireKey('right');
        return;
      case 'ArrowBottom':
        this._fireKey('bottom');
        return;
      case 'KeyA':
        this._fireKey('a');
        return;
      case 'KeyB':
        this._fireKey('b');
        return;
      case 'KeyX':
        this._fireKey('x');
        return;
      case 'KeyY':
        this._fireKey('y');
        return;
    }
  }

  handleKeyUp(e) {
    if (!e.altKey) {
      this._releaseKey('fn');
      return;
    }
    switch (e.code) {
      case 'ArrowUp':
        this._releaseKey('up');
        return;
      case 'ArrowLeft':
        this._releaseKey('left');
        return;
      case 'ArrowRight':
        this._releaseKey('right');
        return;
      case 'ArrowBottom':
        this._releaseKey('bottom');
        return;
      case 'KeyA':
        this._releaseKey('a');
        return;
      case 'KeyB':
        this._releaseKey('b');
        return;
      case 'KeyX':
        this._releaseKey('x');
        return;
      case 'KeyY':
        this._releaseKey('y');
        return;
    }
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
