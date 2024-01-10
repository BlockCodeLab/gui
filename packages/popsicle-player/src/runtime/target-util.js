import { paperCore } from '@blockcode/blocks-player';
import { EventEmitter } from 'node:events';

import sleep from '../lib/sleep';
import loadImage from '../lib/load-image';
import RotationStyle from '../lib/rotation-style';
import { degToRad, radToDeg } from '../lib/deg-rad';

import createContour from './create-contour';
import Runtime from './runtime';

const POSITION_PADDING = 8;

class Util extends EventEmitter {
  constructor(raster) {
    super();
    this._raster = raster;
    this._contour = null;
  }

  get raster() {
    return this._raster;
  }

  get running() {
    return !this.raster.layer.onMouseDown;
  }

  get data() {
    return this.raster.data;
  }

  get assets() {
    return this.data.assets;
  }

  get stageBounds() {
    return new paperCore.Rectangle(
      paperCore.view.center.x - Runtime.VIEW_WIDTH / 2,
      paperCore.view.center.y - Runtime.VIEW_HEIGHT / 2,
      Runtime.VIEW_WIDTH,
      Runtime.VIEW_HEIGHT
    );
  }

  get contour() {
    return this._contour;
  }

  async setImage(assetIndex, calcContour = true) {
    const asset = this.assets[assetIndex];
    if (!asset) return;

    const image = await loadImage(asset);
    this.raster.image = image;
    this.raster.pivot = new paperCore.Point(asset.centerX - asset.width / 2, asset.centerY - asset.height / 2);

    this.data.assetIndex = assetIndex;
    if (this.running) {
      this.emit('update');
    }

    if (calcContour) {
      this.createContour();
    }
  }

  createContour() {
    if (this._contour) {
      this._contour.remove();
      this._contour = null;
    }
    this._contour = createContour(this.raster);
  }

  received(...args) {
    this.on(...args);
  }
}

class StageUtil extends Util {
  get backdrop() {
    return this.data.assetIndex;
  }

  set backdrop(value) {
    if (typeof value === 'string') {
      value = isNaN(+value) ? this.assets.findIndex((asset) => asset.id === value) : +value;
    }
    const assetIndex = value % this.assets.length;
    if (assetIndex !== this.data.assetIndex) {
      this.setImage(assetIndex, false);
    }
  }
}

class SpriteUtil extends Util {
  get costume() {
    return this.data.assetIndex;
  }

  set costume(value) {
    if (typeof value === 'string') {
      value = isNaN(+value) ? this.assets.findIndex((asset) => asset.id === value) : +value;
    }
    const assetIndex = value % this.assets.length;
    if (assetIndex !== this.data.assetIndex) {
      this.setImage(assetIndex);
    }
  }

  get x() {
    return this.data.x;
  }

  set x(x) {
    if (x !== this.data.x || paperCore.view.zoom !== this.data.zoomRatio) {
      if (this.contour) {
        const dx = x - this.data.x;
        const left = this.contour.bounds.right - POSITION_PADDING + dx;
        const right = this.contour.bounds.left + POSITION_PADDING + dx;
        if (left < this.stageBounds.left) {
          x += this.stageBounds.left - left;
        }
        if (right > this.stageBounds.right) {
          x += this.stageBounds.right - right;
        }
      }
      this.data.x = x;
      if (this.running) {
        this.emit('update');
      }

      this.raster.position.x = paperCore.view.center.x + x;
      if (this.contour) {
        this.contour.position.x = this.raster.position.x;
      }
    }
  }

  get y() {
    return this.data.y;
  }

  set y(y) {
    if (y !== this.data.y || paperCore.view.zoom !== this.data.zoomRatio) {
      if (this.contour) {
        const dy = y - this.data.y;
        const top = this.contour.bounds.bottom - POSITION_PADDING - dy;
        const bottom = this.contour.bounds.top + POSITION_PADDING - dy;
        if (top < this.stageBounds.top) {
          y -= this.stageBounds.top - top;
        }
        if (bottom > this.stageBounds.bottom) {
          y -= this.stageBounds.bottom - bottom;
        }
      }
      this.data.y = y;
      if (this.running) {
        this.emit('update');
      }

      this.raster.position.y = paperCore.view.center.y - y;
      if (this.contour) {
        this.contour.position.y = this.raster.position.y;
      }
    }
  }

  _size(value) {
    let size = value < 5 ? 5 : value;
    const width = (this.raster.image.width * size) / 100;
    const height = (this.raster.image.height * size) / 100;
    const maxWidth = paperCore.view.viewSize.width * 2;
    const maxHeight = paperCore.view.viewSize.height * 2;
    if (width > maxWidth || height > maxHeight) {
      size = Math.floor(Math.min(maxWidth / this.raster.image.width, maxHeight / this.raster.image.height) * 100);
    }
    return size;
  }

  get size() {
    return this._size(this.data.size);
  }

  set size(value) {
    const size = this._size(value);
    if (size !== this.data.size) {
      this.data.size = size;
      if (this.running) {
        this.emit('update');
      }

      const scaling = size / 100;
      this.raster.scaling.x = scaling;
      this.raster.scaling.y = scaling;
      if (this.contour) {
        this.contour.scaling = this.raster.scaling;
      }
    }
  }

  get hidden() {
    return !this.raster.visible;
  }

  set hidden(value) {
    if (value === this.raster.visible) {
      this.raster.visible = !value;
      if (this.running) {
        this.emit('update');
      }
    }
  }

  _direction(value) {
    let direction = value % 360;
    if (direction <= -180) {
      direction += 360;
    } else if (direction > 180) {
      direction -= 360;
    }
    return direction;
  }

  get direction() {
    return this._direction(this.data.direction);
  }

  set direction(value) {
    const direction = this._direction(value);
    if (direction !== this.data.direction) {
      this.data.direction = direction;
      if (this.running) {
        this.emit('update');
      }

      if (this.data.rotationStyle === RotationStyle.ALL_AROUND) {
        this.raster.rotation = direction - Runtime.DEFAULT_DIRECTION;
      } else if (this.data.rotationStyle === RotationStyle.HORIZONTAL_FLIP) {
        this.raster.rotation = 0;

        const scalingX = Math.abs(this.raster.scaling.x);
        const scalingY = Math.abs(this.raster.scaling.y);
        this.raster.scaling.x = this.direction < 0 ? -scalingX : scalingX;
        this.raster.scaling.y = scalingY;
        if (this.contour) {
          this.contour.scaling.x = this.raster.scaling.x;
          this.contour.scaling.y = this.raster.scaling.y;
        }
      }
      if (this.contour) {
        this.contour.rotation = this.raster.rotation;
      }
    }
  }

  get layer() {}

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
    if (!this.contour) return;

    // Find the nearest edge.
    let nearestEdge;
    if (this.contour.bounds.top < this.stageBounds.top) {
      nearestEdge = 'top';
    }
    if (this.contour.bounds.left < this.stageBounds.left) {
      nearestEdge = 'left';
    }
    if (this.contour.bounds.right > this.stageBounds.right) {
      nearestEdge = 'right';
    }
    if (this.contour.bounds.bottom > this.stageBounds.bottom) {
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
    if (this.contour.bounds.top < this.stageBounds.top) {
      dy += this.stageBounds.top - this.contour.bounds.top;
    }
    if (this.contour.bounds.left < this.stageBounds.left) {
      dx += this.stageBounds.left - this.contour.bounds.left;
    }
    if (this.contour.bounds.right > this.stageBounds.right) {
      dx += this.stageBounds.right - this.contour.bounds.right;
    }
    if (this.contour.bounds.bottom > this.stageBounds.bottom) {
      dy += this.stageBounds.bottom - this.contour.bounds.bottom;
    }
    this.x += dx;
    this.y -= dy;
  }
}

export default function createUtil(raster, isStage = false) {
  return isStage ? new StageUtil(raster) : new SpriteUtil(raster);
}
