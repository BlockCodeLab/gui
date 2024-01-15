import { paperCore } from '@blockcode/blocks-player';

import imageTank1 from './tanks/tank_1.png';
import imageTurret1 from './tanks/turret_1.png';
import imageTank2 from './tanks/tank_2.png';
import imageTurret2 from './tanks/turret_2.png';
import imageTank3 from './tanks/tank_3.png';
import imageTurret3 from './tanks/turret_3.png';
import imageTank4 from './tanks/tank_4.png';
import imageTurret4 from './tanks/turret_4.png';

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

    this.reset();
  }

  reset() {
    this._speed = 0;
    this._health = 100;
  }

  set place(place) {
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

  attack(direction, distance) {
    this.turretRaster.rotation = direction;
  }

  move(direction, speed) {
    this.direction = direction;
    this.speed = speed;
  }

  get worldX() {
    return this.raster.position.x - paperCore.view.center.x;
  }

  get x() {
    return this.raster.position.x;
  }

  set x(value) {
    this.raster.position.x = this.turretRaster.position.x = value;
  }

  get worldY() {
    return paperCore.view.center.y - this.raster.position.y;
  }

  get y() {
    return this.raster.position.y;
  }

  set y(value) {
    this.raster.position.y = this.turretRaster.position.y = value;
  }

  get speed() {
    if (this._speed > 100) {
      return 100;
    }
    if (this._speed < 0) {
      return 0;
    }
    return this._speed;
  }

  set speed(value) {
    if (value > 100) {
      value = 100;
    }
    if (value < 0) {
      value = 0;
    }
    this._speed = value;
  }

  get direction() {
    let direction = this.raster.rotation % 360;
    if (direction > 180) {
      direction -= 360;
    }
    if (direction <= -180) {
      direction += 360;
    }
    return direction;
  }

  set direction(value) {
    this.raster.rotation = value % 360;
  }

  get health() {
    return this._health;
  }

  get death() {
    return this.health <= 0;
  }
}
