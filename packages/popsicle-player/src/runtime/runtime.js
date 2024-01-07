import paperCore from 'paper/dist/paper-core';
import { EventEmitter } from 'node:events';
import { generate } from './generate';
import RotationStyle from '../lib/rotation-style';
import sleep from '../lib/sleep';

export default class Runtime extends EventEmitter {
  static VIEW_WIDTH = 280;
  static VIEW_HEIGHT = 240;

  static DEFAULT_FPS = 24;
  static DEFAULT_DIRECTION = 90;

  constructor(fileList, requestStop, fps = Runtime.DEFAULT_FPS) {
    super();
    this._fps = fps;
    this._spf = 1 / fps;
    this._running = false;
    this._requestStop = requestStop;
    this._timer = 0;

    const code = generate(fileList);
    const launch = new Function('runtime', code);
    launch(this);

    console.log(code);
  }

  get RotationStyle() {
    return RotationStyle;
  }

  get running() {
    return this._running;
  }

  get targets() {
    return this._fileList;
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

  get timer() {
    return Date.now() - this._timer;
  }

  getSpriteById(id) {
    const raster = this.sprites[id];
    raster.util.runtime = this;
    return raster;
  }

  emit(...args) {
    if (this.running) {
      super.emit(...args);
    }
  }

  start() {
    this._running = true;
    this.on('start', async () => {
      while (this.running) {
        this.emit('frame');
        await this.nextFrame();
      }
    });
    this._timer = Date.now();
    this.emit('start');
  }

  stop() {
    this._running = false;
    this._requestStop();
  }

  sleep(seconds) {
    return sleep(seconds * 1000);
  }

  nextFrame() {
    return this.sleep(this._spf);
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

  resetTimer() {
    this._timer = Date.now();
  }
}
