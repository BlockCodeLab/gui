import { EventEmitter } from 'node:events';

export default class Runtime extends EventEmitter {
  static DEFAULT_FPS = 24;

  constructor(code, requestStop, fps = Runtime.DEFAULT_FPS) {
    super();
    this._fps = fps;
    this._spf = 1 / fps;
    this._running = false;
    this._requestStop = requestStop;
    this._timer = 0;
    this._timers = [];

    this._idCounter = 0;
    this._eventsGroups = {};
    this.openEventsGroup('global');

    const launch = new Function('runtime', code);
    launch(this);

    console.log(code);
  }

  get running() {
    return this._running;
  }

  get timer() {
    return (Date.now() - this._timer) / 1000;
  }

  openEventsGroup(groupName) {
    this._currentGroupName = groupName;
    this._eventsGroups[groupName] = this._eventsGroups[groupName] || [];
  }

  closeEventsGroup() {
    this._currentGroupName = 'global';
  }

  abort(id) {
    const groupName = id.split(':')[0];
    const newGroup = [];
    this._eventsGroups[groupName].forEach((listener) => {
      if (listener.id === id) {
        newGroup.push(listener);
      } else {
        listener._aborted = true;
      }
    });
    this._eventsGroups[groupName] = newGroup;
  }

  on(eventName, listener) {
    const groupName = this._currentGroupName;
    Object.defineProperties(listener, {
      id: {
        get: () => listener._id,
      },
      aborted: {
        get: () => listener._aborted || !this.running,
      },
    });
    super.on(eventName, (...args) => {
      listener._id = `${groupName}:${++this._idCounter}`;
      listener._aborted = false;
      this._eventsGroups[groupName].push(listener);
      listener(...args);
    });
  }

  onGreaterThen(name, value, listener) {
    if (name === 'TIMER') {
      listener._done = false;
      this.on('frame', () => {
        if (this.timer > value && !listener._done) {
          listener();
        }
        listener._done = this.timer > value;
      });
    }
  }

  emit(...args) {
    if (this.running) {
      super.emit(...args);
    }
  }

  broadcast(message) {
    return new Promise((resolve) => {
      this.emit(message, resolve);
    });
  }

  start() {
    this._running = true;
    this.emit('beforeStart');
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
    this._timers.forEach(clearTimeout);
    this._timers.length = 0;
    this._requestStop();
  }

  sleep(seconds) {
    return new Promise((resolve) => this._timers.push(setTimeout(resolve, seconds * 1000)));
  }

  nextFrame() {
    return this.sleep(this._spf);
  }

  random(min = 1, max = 10) {
    min = Math.ceil(Math.min(min, max));
    max = Math.floor(Math.max(min, max));
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  resetTimer() {
    this._timer = Date.now();
  }
}
