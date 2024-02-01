var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/tone.js
var ARTICULATION_MS = 10;
var MIDDLE_FREQUENCIES = [440, 494, 262, 294, 330, 349, 392];
var MIDDLE_SHARPS_FREQUENCIES = [466, 0, 277, 311, 0, 370, 415];
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Tone {
  constructor(option = {}) {
    this.ticks = option.ticks || 4;
    this.bpm = option.bpm || 120;
    this._type = option.type || "sine";
    this._octave = 4;
    this._duration = 4;
    this._playing = false;
  }
  get duration() {
    return this._duration * (60000 / this.bpm / this.ticks);
  }
  _init() {
    if (this._audioContext) {
      this._clear();
    }
    this._audioContext = new AudioContext;
    this._oscillator = this._audioContext.createOscillator();
    this._oscillator.type = this._type;
    this._oscillator.connect(this._audioContext.destination);
  }
  _clear() {
    if (this._oscillator) {
      try {
        this._oscillator.stop();
      } catch (e) {
      }
      this._audioContext.close();
    }
    this._oscillator = null;
    this._audioContext = null;
  }
  stop() {
    this._playing = false;
    this._clear();
  }
  start() {
    this._init();
    this._oscillator.start();
    this._playing = true;
  }
  async play(music) {
    this._octave = 4;
    this._duration = 4;
    if (typeof music === "string") {
      music = [music];
    }
    this.start();
    for (const noteStr of music) {
      if (!this._playing)
        break;
      const frequency = this._getFrequency(noteStr);
      await this._tone(frequency, this.duration);
    }
    this.stop();
  }
  async _tone(frequency, duration = -1) {
    if (!this._oscillator)
      return;
    this._oscillator.frequency.value = frequency;
    if (duration > 0) {
      duration -= ARTICULATION_MS;
      if (duration < 0) {
        duration = 10;
      }
      await sleep(duration);
      if (!this._oscillator)
        return;
      this._oscillator.frequency.value = 0;
      await sleep(ARTICULATION_MS);
    }
  }
  _getFrequency(noteStr) {
    const noteArr = noteStr.toLowerCase().split(":");
    if (noteArr.length > 1) {
      const duration = parseInt(noteArr[1]);
      if (duration !== NaN) {
        this._duration = duration;
      }
    }
    const note = noteArr.length > 0 ? noteArr[0] : "r";
    let noteIndex = note.charCodeAt(0) - "a".charCodeAt(0);
    let sharp = false;
    if (note.length === 2) {
      const octave = parseInt(note[1]);
      if (octave !== NaN) {
        this._octave = octave;
      } else {
        sharp = true;
        if (note[1] === "b" && noteIndex <= 6) {
          noteIndex -= 1;
        }
      }
    } else if (note.length === 3) {
      const octave = parseInt(note[2]);
      if (octave !== NaN) {
        this._octave = octave;
      }
      sharp = true;
      if (note[1] === "b" && noteIndex <= 6) {
        noteIndex -= 1;
      }
    }
    let frequency = 0;
    if (noteIndex <= 6) {
      const shiftCount = self._octave - 4;
      if (sharp) {
        if (shiftCount > 0) {
          frequency = MIDDLE_SHARPS_FREQUENCIES[noteIndex] << shiftCount;
        } else {
          frequency = MIDDLE_SHARPS_FREQUENCIES[noteIndex] >> -shiftCount;
        }
      } else {
        if (shiftCount > 0) {
          frequency = MIDDLE_FREQUENCIES[noteIndex] << shiftCount;
        } else {
          frequency = MIDDLE_FREQUENCIES[noteIndex] >> -shiftCount;
        }
      }
    }
    return frequency;
  }
}
// src/music.js
var exports_music = {};
__export(exports_music, {
  WEDDING: () => {
    {
      return WEDDING;
    }
  },
  WAWAWAWAA: () => {
    {
      return WAWAWAWAA;
    }
  },
  SILENT: () => {
    {
      return SILENT;
    }
  },
  RINGTONE: () => {
    {
      return RINGTONE;
    }
  },
  PYTHON: () => {
    {
      return PYTHON;
    }
  },
  PUNCHLINE: () => {
    {
      return PUNCHLINE;
    }
  },
  PRELUDE: () => {
    {
      return PRELUDE;
    }
  },
  POWER_UP: () => {
    {
      return POWER_UP;
    }
  },
  POWER_DOWN: () => {
    {
      return POWER_DOWN;
    }
  },
  ODE: () => {
    {
      return ODE;
    }
  },
  NYAN: () => {
    {
      return NYAN;
    }
  },
  JUMP_UP: () => {
    {
      return JUMP_UP;
    }
  },
  JUMP_DOWN: () => {
    {
      return JUMP_DOWN;
    }
  },
  FUNK: () => {
    {
      return FUNK;
    }
  },
  FUNERAL: () => {
    {
      return FUNERAL;
    }
  },
  ENTERTAINER: () => {
    {
      return ENTERTAINER;
    }
  },
  DADADADUM: () => {
    {
      return DADADADUM;
    }
  },
  CHASE: () => {
    {
      return CHASE;
    }
  },
  BLUES: () => {
    {
      return BLUES;
    }
  },
  BIRTHDAY: () => {
    {
      return BIRTHDAY;
    }
  },
  BA_DING: () => {
    {
      return BA_DING;
    }
  },
  BADDY: () => {
    {
      return BADDY;
    }
  }
});
var SILENT = ["r"];
var DADADADUM = ["r4:2", "g", "g", "g", "eb:8", "r:2", "f", "f", "f", "d:8"];
var ENTERTAINER = [
  "d4:1",
  "d#",
  "e",
  "c5:2",
  "e4:1",
  "c5:2",
  "e4:1",
  "c5:3",
  "c:1",
  "d",
  "d#",
  "e",
  "c",
  "d",
  "e:2",
  "b4:1",
  "d5:2",
  "c:4"
];
var PRELUDE = [
  "c4:1",
  "e",
  "g",
  "c5",
  "e",
  "g4",
  "c5",
  "e",
  "c4",
  "e",
  "g",
  "c5",
  "e",
  "g4",
  "c5",
  "e",
  "c4",
  "d",
  "g",
  "d5",
  "f",
  "g4",
  "d5",
  "f",
  "c4",
  "d",
  "g",
  "d5",
  "f",
  "g4",
  "d5",
  "f",
  "b3",
  "d4",
  "g",
  "d5",
  "f",
  "g4",
  "d5",
  "f",
  "b3",
  "d4",
  "g",
  "d5",
  "f",
  "g4",
  "d5",
  "f",
  "c4",
  "e",
  "g",
  "c5",
  "e",
  "g4",
  "c5",
  "e",
  "c4",
  "e",
  "g",
  "c5",
  "e",
  "g4",
  "c5",
  "e"
];
var ODE = [
  "e4",
  "e",
  "f",
  "g",
  "g",
  "f",
  "e",
  "d",
  "c",
  "c",
  "d",
  "e",
  "e:6",
  "d:2",
  "d:8",
  "e:4",
  "e",
  "f",
  "g",
  "g",
  "f",
  "e",
  "d",
  "c",
  "c",
  "d",
  "e",
  "d:6",
  "c:2",
  "c:8"
];
var NYAN = [
  "f#5:2",
  "g#",
  "c#:1",
  "d#:2",
  "b4:1",
  "d5:1",
  "c#",
  "b4:2",
  "b",
  "c#5",
  "d",
  "d:1",
  "c#",
  "b4:1",
  "c#5:1",
  "d#",
  "f#",
  "g#",
  "d#",
  "f#",
  "c#",
  "d",
  "b4",
  "c#5",
  "b4",
  "d#5:2",
  "f#",
  "g#:1",
  "d#",
  "f#",
  "c#",
  "d#",
  "b4",
  "d5",
  "d#",
  "d",
  "c#",
  "b4",
  "c#5",
  "d:2",
  "b4:1",
  "c#5",
  "d#",
  "f#",
  "c#",
  "d",
  "c#",
  "b4",
  "c#5:2",
  "b4",
  "c#5",
  "b4",
  "f#:1",
  "g#",
  "b:2",
  "f#:1",
  "g#",
  "b",
  "c#5",
  "d#",
  "b4",
  "e5",
  "d#",
  "e",
  "f#",
  "b4:2",
  "b",
  "f#:1",
  "g#",
  "b",
  "f#",
  "e5",
  "d#",
  "c#",
  "b4",
  "f#",
  "d#",
  "e",
  "f#",
  "b:2",
  "f#:1",
  "g#",
  "b:2",
  "f#:1",
  "g#",
  "b",
  "b",
  "c#5",
  "d#",
  "b4",
  "f#",
  "g#",
  "f#",
  "b:2",
  "b:1",
  "a#",
  "b",
  "f#",
  "g#",
  "b",
  "e5",
  "d#",
  "e",
  "f#",
  "b4:2",
  "c#5"
];
var RINGTONE = ["c4:1", "d", "e:2", "g", "d:1", "e", "f:2", "a", "e:1", "f", "g:2", "b", "c5:4"];
var FUNK = [
  "c2:2",
  "c",
  "d#",
  "c:1",
  "f:2",
  "c:1",
  "f:2",
  "f#",
  "g",
  "c",
  "c",
  "g",
  "c:1",
  "f#:2",
  "c:1",
  "f#:2",
  "f",
  "d#"
];
var BLUES = [
  "c2:2",
  "e",
  "g",
  "a",
  "a#",
  "a",
  "g",
  "e",
  "c2:2",
  "e",
  "g",
  "a",
  "a#",
  "a",
  "g",
  "e",
  "f",
  "a",
  "c3",
  "d",
  "d#",
  "d",
  "c",
  "a2",
  "c2:2",
  "e",
  "g",
  "a",
  "a#",
  "a",
  "g",
  "e",
  "g",
  "b",
  "d3",
  "f",
  "f2",
  "a",
  "c3",
  "d#",
  "c2:2",
  "e",
  "g",
  "e",
  "g",
  "f",
  "e",
  "d"
];
var BIRTHDAY = [
  "c4:3",
  "c:1",
  "d:4",
  "c:4",
  "f",
  "e:8",
  "c:3",
  "c:1",
  "d:4",
  "c:4",
  "g",
  "f:8",
  "c:3",
  "c:1",
  "c5:4",
  "a4",
  "f",
  "e",
  "d",
  "a#:3",
  "a#:1",
  "a:4",
  "f",
  "g",
  "f:8"
];
var WEDDING = [
  "c4:4",
  "f:3",
  "f:1",
  "f:8",
  "c:4",
  "g:3",
  "e:1",
  "f:8",
  "c:4",
  "f:3",
  "a:1",
  "c5:4",
  "a4:3",
  "f:1",
  "f:4",
  "e:3",
  "f:1",
  "g:8"
];
var FUNERAL = ["c3:4", "c:3", "c:1", "c:4", "d#:3", "d:1", "d:3", "c:1", "c:3", "b2:1", "c3:4"];
var PUNCHLINE = ["c4:3", "g3:1", "f#", "g", "g#:3", "g", "r", "b", "c4"];
var PYTHON = [
  "d5:1",
  "b4",
  "r",
  "b",
  "b",
  "a#",
  "b",
  "g5",
  "r",
  "d",
  "d",
  "r",
  "b4",
  "c5",
  "r",
  "c",
  "c",
  "r",
  "d",
  "e:5",
  "c:1",
  "a4",
  "r",
  "a",
  "a",
  "g#",
  "a",
  "f#5",
  "r",
  "e",
  "e",
  "r",
  "c",
  "b4",
  "r",
  "b",
  "b",
  "r",
  "c5",
  "d:5",
  "d:1",
  "b4",
  "r",
  "b",
  "b",
  "a#",
  "b",
  "b5",
  "r",
  "g",
  "g",
  "r",
  "d",
  "c#",
  "r",
  "a",
  "a",
  "r",
  "a",
  "a:5",
  "g:1",
  "f#:2",
  "a:1",
  "a",
  "g#",
  "a",
  "e:2",
  "a:1",
  "a",
  "g#",
  "a",
  "d",
  "r",
  "c#",
  "d",
  "r",
  "c#",
  "d:2",
  "r:3"
];
var BADDY = ["c3:3", "r", "d:2", "d#", "r", "c", "r", "f#:8"];
var CHASE = [
  "a4:1",
  "b",
  "c5",
  "b4",
  "a:2",
  "r",
  "a:1",
  "b",
  "c5",
  "b4",
  "a:2",
  "r",
  "a:2",
  "e5",
  "d#",
  "e",
  "f",
  "e",
  "d#",
  "e",
  "b4:1",
  "c5",
  "d",
  "c",
  "b4:2",
  "r",
  "b:1",
  "c5",
  "d",
  "c",
  "b4:2",
  "r",
  "b:2",
  "e5",
  "d#",
  "e",
  "f",
  "e",
  "d#",
  "e"
];
var BA_DING = ["b5:1", "e6:3"];
var WAWAWAWAA = ["e3:3", "r:1", "d#:3", "r:1", "d:4", "r:1", "c#:8"];
var JUMP_UP = ["c5:1", "d", "e", "f", "g"];
var JUMP_DOWN = ["g5:1", "f", "e", "d", "c"];
var POWER_UP = ["g4:1", "c5", "e", "g:2", "e:1", "g:3"];
var POWER_DOWN = ["g5:1", "d#", "c", "g4:2", "b:1", "c5:3"];
export {
  Tone,
  exports_music as Music
};
