import paperCore from 'paper/dist/paper-core';
import { EventEmitter } from 'node:events';
import loadImage from '../lib/load-image';
import Runtime from './runtime';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const degToRad = (deg) => (deg * Math.PI) / 180;
const radToDeg = (rad) => (rad * 180) / Math.PI;

class Util extends EventEmitter {
  constructor(raster) {
    super();
    this._raster = raster;
  }

  get raster() {
    return this._raster;
  }

  get data() {
    return this.raster.data;
  }

  get bounds() {
    return this.raster.bounds;
  }

  get assets() {
    return this.data.assets;
  }

  async setImage(assetIndex) {
    const asset = this.assets[assetIndex];
    const image = await loadImage(asset);
    this.raster.image = image;
    this.raster.pivot = new paperCore.Point(image.width / 2 - asset.centerX, image.height / 2 - asset.centerY);
  }

  get stageBounds() {
    return new paperCore.Rectangle(
      paperCore.view.center.x - Runtime.VIEW_WIDTH / 2,
      paperCore.view.center.y - Runtime.VIEW_HEIGHT / 2,
      Runtime.VIEW_WIDTH,
      Runtime.VIEW_HEIGHT
    );
  }

  received(...args) {
    this.on(...args);
  }
}

class StageUtil extends Util {
  get assetName() {
    return 'backdrop';
  }

  get backdrop() {
    return this.data.assetIndex;
  }

  set backdrop(value) {
    this.data.assetIndex = value % this.assets.length;
    this.setImage(this.data.assetIndex);
  }
}

class SpriteUtil extends Util {
  get assetName() {
    return 'costume';
  }

  get costume() {
    return this.data.assetIndex;
  }

  set costume(value) {
    this.data.assetIndex = value % this.assets.length;
    this.setImage(this.data.assetIndex);
  }

  get x() {
    return this.data.x;
  }

  set x(value) {
    this.data.x = value;
  }

  get y() {
    return this.data.y;
  }

  set y(value) {
    this.data.y = value;
  }

  get size() {
    const size = this.data.size < 5 ? 5 : this.data.size;
    return size;
  }

  set size(value) {
    this.data.size = value < 5 ? 5 : value;
  }

  get direction() {
    let direction = this.data.direction % 360;
    direction = direction < 0 ? direction + 360 : direction;
    return direction;
  }

  set direction(value) {
    this.data.direction = value % 360;
  }

  move(steps) {
    const radian = degToRad(this.direction - Runtime.DEFAULT_DIRECTION);
    const dx = steps * Math.cos(radian);
    const dy = steps * Math.sin(radian);
    this.x += dx;
    this.y -= dy;
  }

  goto(x, y) {
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    this.x = x;
    this.y = y;
  }

  towards(target) {
    if (typeof target === 'number') {
      this.direction = target;
    } else {
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      this.direction = Runtime.DEFAULT_DIRECTION - radToDeg(Math.atan2(dy, dx));
    }
  }

  async glide(duration, x, y) {
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }

    if (duration <= 0) {
      this.goto(x, y);
      return;
    }
    duration *= 1000;

    const startx = this.x;
    const starty = this.y;
    const dx = x - startx;
    const dy = y - starty;
    let frac;
    let elapsed = 0;
    let start = Date.now();
    while (true) {
      await sleep(0);
      elapsed = Date.now() - start;
      if (elapsed < duration) {
        frac = elapsed / duration;
        this.goto(startx + dx * frac, starty + dy * frac);
      } else {
        this.goto(x, y);
        break;
      }
      if (!this.runtime.running) break;
    }
  }

  async edgeBounce() {
    // Find the nearest edge.
    let nearestEdge;
    if (this.bounds.top < this.stageBounds.top) {
      nearestEdge = 'top';
    }
    if (this.bounds.left < this.stageBounds.left) {
      nearestEdge = 'left';
    }
    if (this.bounds.right > this.stageBounds.right) {
      nearestEdge = 'right';
    }
    if (this.bounds.bottom > this.stageBounds.bottom) {
      nearestEdge = 'bottom';
    }
    if (!nearestEdge) return; // Not touching any edge.

    // Point away from the nearest edge.
    const radians = degToRad(Runtime.DEFAULT_DIRECTION - this.direction);
    let dx = Math.cos(radians);
    let dy = -Math.sin(radians);
    if (nearestEdge === 'left') {
      dx = Math.max(0.2, Math.abs(dx));
    } else if (nearestEdge === 'top') {
      dy = Math.max(0.2, Math.abs(dy));
    } else if (nearestEdge === 'right') {
      dx = 0 - Math.max(0.2, Math.abs(dx));
    } else if (nearestEdge === 'bottom') {
      dy = 0 - Math.max(0.2, Math.abs(dy));
    }
    this.direction = radToDeg(Math.atan2(dy, dx)) + Runtime.DEFAULT_DIRECTION;

    // Keep within the stage.
    dx = 0;
    dy = 0;
    if (this.bounds.top < this.stageBounds.top) {
      dy += this.stageBounds.top - this.bounds.top;
    }
    if (this.bounds.left < this.stageBounds.left) {
      dx += this.stageBounds.left - this.bounds.left;
    }
    if (this.bounds.right > this.stageBounds.right) {
      dx += this.stageBounds.right - this.bounds.right;
    }
    if (this.bounds.bottom > this.stageBounds.bottom) {
      dy += this.stageBounds.bottom - this.bounds.bottom;
    }
    console.log(dx, dy);
    this.goto(this.x + dx, this.y - dy);
  }
}

export default function createUtil(raster, isStage = false) {
  return isStage ? new StageUtil(raster) : new SpriteUtil(raster);
}
