import { EventEmitter } from 'node:events';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default class Runtime extends EventEmitter {
  static DEFAULT_FPS = 24;

  constructor(code, requestStop, fps = Runtime.DEFAULT_FPS) {
    super();
    this._fps = fps;
    this._spf = 1 / fps;
    this._running = false;
    this._requestStop = requestStop;
    this._timer = 0;

    const launch = new Function('runtime', code);
    launch(this);

    console.log(code);
  }

  get running() {
    return this._running;
  }

  get timer() {
    return Date.now() - this._timer;
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

  async stop() {
    this._running = false;
    await this.nextFrame();
    this._requestStop();
  }

  sleep(seconds) {
    return sleep(seconds * 1000);
  }

  nextFrame() {
    return this.sleep(this._spf);
  }

  random(min = 1, max = 10) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  resetTimer() {
    this._timer = Date.now();
  }
}
