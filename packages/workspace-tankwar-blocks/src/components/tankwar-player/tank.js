import { paperCore } from '@blockcode/blocks-player';
import loadImage from '../../lib/load-image';

import imageTank1 from './tanks/tank_1.png';
import imageTurret1 from './tanks/turret_1.png';
import imageTank2 from './tanks/tank_2.png';
import imageTurret2 from './tanks/turret_2.png';
import imageTank3 from './tanks/tank_3.png';
import imageTurret3 from './tanks/turret_3.png';
import imageTank4 from './tanks/tank_4.png';
import imageTurret4 from './tanks/turret_4.png';
import imageBroken from './tanks/broken.png';
import imageBullet from './tanks/bullet.png';
import imageBoom1 from './tanks/boom1.png';
import imageBoom2 from './tanks/boom2.png';
import imageBoom3 from './tanks/boom3.png';

const SPEED_RATIO = 20;
const DEFAULT_SCAN_WIDTH = 4;
const MAX_SCAN_WIDTH = 40;
const MAX_SCAN_DISTANCE = 500;
const MIN_ATTACK_DISTANCE = 70;
const MAX_ATTACK_DISTANCE = 400;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const calcDistance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

const number = (n) => (isNaN(n) ? 0 : +n);
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

const calcDegrees = (deg) => parseInt(((deg % 360) + 360) % 360);
const equalDegrees = (deg1, deg2) => calcDegrees(deg1) === calcDegrees(deg2);

export default class Tank {
  static PLACE = {
    LEFT: {
      get position() {
        return new paperCore.Point(paperCore.view.center.x - 300, paperCore.view.center.y);
      },
      rotation: 90,
    },
    RIGHT: {
      get position() {
        return new paperCore.Point(paperCore.view.center.x + 300, paperCore.view.center.y);
      },
      rotation: -90,
    },
    LEFT_TOP: {
      get position() {
        return new paperCore.Point(paperCore.view.center.x - 300, paperCore.view.center.y - 300);
      },
      rotation: 135,
    },
    RIGHT_TOP: {
      get position() {
        return new paperCore.Point(paperCore.view.center.x + 300, paperCore.view.center.y - 300);
      },
      rotation: -135,
    },
    LEFT_BOTTOM: {
      get position() {
        return new paperCore.Point(paperCore.view.center.x - 300, paperCore.view.center.y + 300);
      },
      rotation: 45,
    },
    RIGHT_BOTTOM: {
      get position() {
        return new paperCore.Point(paperCore.view.center.x + 300, paperCore.view.center.y + 300);
      },
      rotation: -45,
    },
  };

  static STYLE = {
    PLAYER: {
      tank: imageTank1,
      turret: imageTurret1,
    },
    ENEMY_A: {
      tank: imageTank2,
      turret: imageTurret2,
    },
    ENEMY_B: {
      tank: imageTank3,
      turret: imageTurret3,
    },
    ENEMY_C: {
      tank: imageTank4,
      turret: imageTurret4,
    },
  };

  constructor(name, style = Tank.STYLE.PLAYER, place = Tank.PLACE.LEFT) {
    const scaling = 0.2;
    this.raster = new paperCore.Raster({
      name,
      scaling,
      source: style.tank,
      position: place.position,
      rotation: place.rotation,
      visible: style === Tank.STYLE.PLAYER,
    });
    this.turretRaster = new paperCore.Raster({
      scaling,
      source: style.turret,
      position: place.position,
      rotation: place.rotation,
      visible: style === Tank.STYLE.PLAYER,
    });
    this.raster.util = this;
    this.turretRaster.owner = this;

    this._imageCache = {};

    this.reset();
  }

  reset() {
    this._speed = 0;
    this._health = 100;
    this._scanWidth = DEFAULT_SCAN_WIDTH;
    this._attacking = false;
    clearTimeout(this._turretReady);
  }

  bringToFront() {
    this.raster.bringToFront();
    this.turretRaster.bringToFront();
  }

  get running() {
    return this._running;
  }

  set running(value) {
    this.reset();
    this._running = value;
  }

  get bullseye() {
    if (!this._bullseye) {
      this._bullseye = (Math.min(this.raster.width, this.raster.height) * this.raster.scaling.x) / 4;
    }
    return this._bullseye;
  }

  get enemies() {
    if (!this._enemies) {
      this._enemies = ['red', 'yellow', 'green', 'player']
        .filter((n) => n !== this.raster.name)
        .map((n) => paperCore.project.activeLayer.children[n]);
    }
    return this._enemies;
  }

  set place(place) {
    if (this.running) return;
    this.raster.position = this.turretRaster.position = place.position;
    this.raster.rotation = this.turretRaster.rotation = place.rotation;
    this.hidden = false;
  }

  get hidden() {
    return !this.raster.visible;
  }

  set hidden(value) {
    this.raster.visible = this.turretRaster.visible = !value;
  }

  async _turn(target, direction) {
    if (!equalDegrees(target.rotation, direction)) {
      let degress = calcDegrees(direction) - calcDegrees(target.rotation);
      if (degress > 180) degress -= 360;
      if (degress < -180) degress += 360;
      await target.tween({ rotation: target.rotation + degress }, 500 * (Math.abs(degress) / 360));
    }
  }

  async attack(direction, distance) {
    if (!this.running) return;
    if (this._attacking || this.death) return;
    this._attacking = true;

    direction = Math.round(number(direction));
    distance = number(distance);

    clearTimeout(this._turretReady);
    await this._turn(this.turretRaster, direction);

    const degrees = calcDegrees(direction);
    const radian = ((90 - degrees) * Math.PI) / 180;
    let step = 10;
    let dx = step * Math.cos(radian);
    let dy = step * Math.sin(radian);

    if (!this._imageCache.buttet) {
      this._imageCache.buttet = await loadImage(imageBullet);
    }
    const bullet = new paperCore.Raster({
      image: this._imageCache.buttet,
      position: this.raster.position,
      rotation: this.raster.rotation,
      scaling: this.raster.scaling,
    });

    distance = clamp(distance, MIN_ATTACK_DISTANCE, MAX_ATTACK_DISTANCE);

    const half = distance / 2;
    const scaling = step / distance / 2;

    while (distance > 0) {
      await sleep(15);
      if (distance < step) {
        dx = distance * Math.cos(radian);
        dy = distance * Math.sin(radian);
      }
      distance -= step;
      bullet.position.x += dx;
      bullet.position.y -= dy;
      bullet.scaling.x += distance > half ? scaling : -scaling;
      bullet.scaling.y = bullet.scaling.x;
      if (bullet.scaling.x < this.raster.scaling.x) {
        bullet.scaling = this.raster.scaling;
      }
    }
    this._boom(bullet.position);

    this._hit(bullet, (enemy) => {
      if (calcDistance(enemy.position, bullet.position) < enemy.util.bullseye) {
        enemy.util.hurt(10);
      } else {
        enemy.util.hurt(5);
      }
    });
    this._attacking = false;
    this._turretReady = setTimeout(() => this._turn(this.turretRaster, this.raster.rotation), 1000);
  }

  async _boom(position) {
    if (!this.running) return;
    if (!this._imageCache.booms) {
      this._imageCache.booms = [await loadImage(imageBoom1), await loadImage(imageBoom2), await loadImage(imageBoom3)];
    }
    const boom = new paperCore.Raster({
      image: this._imageCache.booms[0],
      position,
    });
    await sleep(30);
    boom.image = this._imageCache.booms[1];
    await sleep(50);
    boom.image = this._imageCache.booms[2];
    await sleep(90);
    boom.remove();
  }

  _hit(tester, hit) {
    if (this.running && !this.death) {
      this.enemies.forEach((enemy) => {
        if (enemy.util.death || enemy.util.hidden) return;
        if (tester.intersects(enemy) || enemy.contains(tester.position)) {
          hit(enemy);
        }
      });
    }
    tester.remove();
  }

  async move(direction, speed) {
    if (!this.running) return;
    if (this.death) return;
    await this.setDirection(direction);
    this.speed = number(speed);
  }

  drive() {
    if (!this.running) return;
    if (this.speed === 0) return;
    if (this.hidden || this.death) return;
    const radian = ((90 - this.direction) * Math.PI) / 180;
    const dx = (this.speed / SPEED_RATIO) * Math.cos(radian);
    const dy = (this.speed / SPEED_RATIO) * Math.sin(radian);
    this.raster.position.x += dx;
    this.raster.position.y -= dy;
    this.turretRaster.position = this.raster.position;
  }

  get x() {
    return this.raster.position.x - paperCore.view.center.x;
  }

  get y() {
    return paperCore.view.center.y - this.raster.position.y;
  }

  get speed() {
    return clamp(this._speed, 0, 100);
  }

  set speed(value) {
    if (!this.running) return;
    this._speed = clamp(value, 0, 100);
  }

  get direction() {
    let direction = this.raster.rotation % 360;
    if (direction > 180) direction -= 360;
    if (direction <= -180) direction += 360;
    return direction;
  }

  async setDirection(direction) {
    if (!this.running) return;
    direction = Math.round(number(direction));
    clearTimeout(this._turretReady);
    this._turn(this.turretRaster, direction);
    await this._turn(this.raster, direction);
  }

  turnRight(degrees) {
    let direction = this.raster.rotation; // % 360;
    direction += number(degrees);
    return this.setDirection(direction);
  }

  turnLeft(degrees) {
    return this.turnRight(-number(degrees));
  }

  hurt(value) {
    if (!this.running) return;
    this._health -= Math.abs(value);
    if (this.death) {
      this.hidden = true;
      new paperCore.Raster({
        source: imageBroken,
        scaling: this.raster.scaling,
        position: this.raster.position,
        rotation: this.raster.rotation,
      }).sendToBack();
    }
  }

  get health() {
    if (this._health < 0) return 0;
    return this._health;
  }

  get death() {
    return this.health <= 0;
  }

  get scanWidth() {
    return this._scanWidth;
  }

  set scanWidth(width) {
    width = number(width);
    this._scanWidth = clamp(width, 1, MAX_SCAN_WIDTH);
  }

  async scan(direction) {
    if (!this.running) return Infinity;
    if (this._scanning || this.death) return Infinity;
    this._scanning = true;

    direction = number(direction);

    const scanDistance = MAX_SCAN_DISTANCE * (1 - 0.3 * (this.scanWidth / MAX_SCAN_WIDTH));
    const radian1 = ((90 - (direction - this.scanWidth / 2)) * Math.PI) / 180;
    const d1x = scanDistance * Math.cos(radian1);
    const d1y = scanDistance * Math.sin(radian1);
    const point1 = new paperCore.Point(this.raster.position.x + d1x, this.raster.position.y - d1y);

    const radian2 = ((90 - (direction + this.scanWidth / 2)) * Math.PI) / 180;
    const d2x = scanDistance * Math.cos(radian2);
    const d2y = scanDistance * Math.sin(radian2);
    const point2 = new paperCore.Point(this.raster.position.x + d2x, this.raster.position.y - d2y);

    const scanShape = new paperCore.Path({
      segments: [this.raster.position, point1, point2],
      closed: true,
      fillColor: {
        gradient: {
          stops: [
            ['rgb(255 0 0 0.4)', 0],
            ['rgb(255 0 0 0)', 0.7],
          ],
          radial: true,
        },
        origin: this.raster.position,
        destination: point1,
      },
    });
    await sleep(10);

    let result = Infinity;
    this._hit(scanShape, (enemy) => {
      const distance = calcDistance(this.raster.position, enemy.position);
      if (distance < result) result = distance;
    });
    this._scanning = false;
    return result;
  }
}
