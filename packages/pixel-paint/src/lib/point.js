export const DRAW_WIDTH = 320;
export const DRAW_HEIGHT = 240;

export class Point {
  static get DrawWidth() {
    return DRAW_WIDTH;
  }

  static get DrawHeight() {
    return DRAW_HEIGHT;
  }

  static from(index) {
    const i = index >> 2;
    const y = Math.floor(i / DRAW_WIDTH);
    const x = i - y * DRAW_WIDTH;
    return new Point(x, y);
  }

  constructor(x, y) {
    this.setXY(x, y);
  }

  get x() {
    return this._x;
  }

  set x(x) {
    this._x = x;
    this._index = (this.x + this.y * DRAW_WIDTH) << 2;
  }

  get y() {
    return this._y;
  }

  set y(y) {
    this._y = y;
    this._index = (this.x + this.y * DRAW_WIDTH) << 2;
  }

  get index() {
    return this._index;
  }

  get valid() {
    return this.x >= 0 && this.x < DRAW_WIDTH && this.y >= 0 && this.y < DRAW_HEIGHT;
  }

  get invalid() {
    return !this.valid;
  }

  get topPoint() {
    return new Point(this.x, this.y - 1);
  }

  get leftPoint() {
    return new Point(this.x - 1, this.y);
  }

  get rightPoint() {
    return new Point(this.x + 1, this.y);
  }

  get bottomPoint() {
    return new Point(this.x, this.y + 1);
  }

  get topLeftPoint() {
    return new Point(this.x - 1, this.y - 1);
  }

  get topRightPoint() {
    return new Point(this.x + 1, this.y - 1);
  }

  get bottomLeftPoint() {
    return new Point(this.x - 1, this.y + 1);
  }

  get bottomRightPoint() {
    return new Point(this.x + 1, this.y + 1);
  }

  setXY(x, y) {
    this._x = x;
    this._y = y;
    this._index = (this.x + this.y * DRAW_WIDTH) << 2;
    return this;
  }

  equals(point) {
    return this.x == point.x && this.y == point.y;
  }
}
