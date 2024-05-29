import { Runtime as BaseRuntime, paperCore } from '@blockcode/blocks-player';
import { Tone, Music } from '@blockcode/tone-player';
import { base64ToUint8Array } from '../../lib/base64-util';
import { fonts } from './fonts';

export default class Runtime extends BaseRuntime {
  static LEDS_COLS = 17;
  static LEDS_ROWS = 7;
  static BLANK_MATRIX = new Array(Runtime.LEDS_COLS).fill(0);

  get tone() {
    if (!this._tone) {
      this._tone = new Tone({ type: 'square' });
    }
    return this._tone;
  }

  get Music() {
    return Music;
  }

  stop() {
    if (this._tone) {
      this._tone.stop();
    }
    super.stop();
    this.led = false;
    this.matrix = Runtime.BLANK_MATRIX;
  }

  get picoed() {
    return paperCore.project.activeLayer.children;
  }

  get aPressed() {
    return this.picoed.A.data.pressed;
  }

  get bPressed() {
    return this.picoed.B.data.pressed;
  }

  get anyPressed() {
    return this.aPressed || this.bPressed;
  }

  get led() {
    return this._led;
  }

  set led(value) {
    this._led = !!value;

    if (this._led) {
      this.picoed.led.fillColor = 'red';
      this.picoed.led.shadowColor = 'red';
    } else {
      this.picoed.led.fillColor = 'rgba(0, 0, 0, 0.15)';
      this.picoed.led.shadowColor = null;
    }
  }

  toggleLED() {
    this.led = !this.led;
  }

  set matrix(buffer) {
    for (let x = 0; x < Runtime.LEDS_COLS; x++) {
      const col = buffer[x];
      for (let y = 0; y < Runtime.LEDS_ROWS; y++) {
        if ((1 << y) & col) {
          this.picoed[`${x},${y}`].fillColor = 'green';
          this.picoed[`${x},${y}`].shadowColor = 'green';
        } else {
          this.picoed[`${x},${y}`].fillColor = 'white';
          this.picoed[`${x},${y}`].shadowColor = null;
        }
      }
    }
  }

  async scroll(text) {
    let textBuffer = [].concat(
      ...text
        .split('')
        .map((char) => (fonts[char] ? Array.from(base64ToUint8Array(fonts[char])) : [0, 0, 0, 0]).concat(0))
    );

    if (textBuffer.length <= Runtime.LEDS_COLS) {
      this.matrix = textBuffer;
      return;
    }

    const blankCols = new Array(Runtime.LEDS_COLS).fill(0);
    textBuffer = [].concat(blankCols, textBuffer, blankCols);
    for (let i = 0; i < textBuffer.length - Runtime.LEDS_COLS; i++) {
      if (!this.running) break;
      this.matrix = textBuffer.slice(i, i + Runtime.LEDS_COLS);
      await this.nextFrame();
    }
  }
}
