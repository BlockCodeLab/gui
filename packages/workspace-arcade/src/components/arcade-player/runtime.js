import { paperCore, Runtime as BaseRuntime } from '@blockcode/blocks-player';
import { Tone, Music } from '@blockcode/tone-player';
import RotationStyle from '../../lib/rotation-style';
import { VIEW_WIDTH, VIEW_HEIGHT, DEFAULT_DIRECTION } from '../../lib/default-project';

import '../../generators/javascript';

export default class Runtime extends BaseRuntime {
  static VIEW_WIDTH = VIEW_WIDTH;
  static VIEW_HEIGHT = VIEW_HEIGHT;
  static DEFAULT_DIRECTION = DEFAULT_DIRECTION;

  when(eventName, listener, raster = null) {
    if (raster) {
      super.when(eventName, (done) => {
        listener(raster, done);
        raster.util.clones.forEach((clone) => listener(clone, done));
      });
    } else {
      super.when(eventName, listener);
    }
  }

  whenGreaterThen(name, value, listener, raster = null) {
    const key = `${name}>${value}`;
    this._greaterThen[key] = false;
    this.when(`greaterthen:${key}`, listener, raster);
  }

  whenCloneStart(raster, listener) {
    this.on(`clonestart:${raster.name}`, listener);
  }

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

  getSpriteByIdOrName(idOrName) {
    const raster = this.sprites[idOrName] || this.sprites.find((sprite) => sprite.data.name === idOrName);
    if (raster) {
      raster.util._runtime = this;
      return raster;
    }
  }

  get fnKey() {
    return !!this._fnKey;
  }

  get upKey() {
    return !!this._upKey;
  }

  get leftKey() {
    return !!this._leftKey;
  }

  get downKey() {
    return !!this._downKey;
  }

  get rightKey() {
    return !!this._rightKey;
  }

  get aKey() {
    return !!this._aKey;
  }

  get bKey() {
    return !!this._bKey;
  }

  get xKey() {
    return !!this._xKey;
  }

  get yKey() {
    return !!this._yKey;
  }

  get anyKey() {
    return (
      this.fnKey ||
      this.upKey ||
      this.leftKey ||
      this.downKey ||
      this.rightKey ||
      this.aKey ||
      this.bKey ||
      this.xKey ||
      this.yKey
    );
  }

  _fireKey(key) {
    this[`_${key}Key`] = true;
    this.fire(`keypressed:${key}`);
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
      case 'ArrowDown':
        this._fireKey('down');
        return;
      case 'ArrowRight':
        this._fireKey('right');
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
    if (this.fnKey && !e.altKey) {
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
      case 'ArrowDown':
        this._releaseKey('down');
        return;
      case 'ArrowRight':
        this._releaseKey('right');
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
