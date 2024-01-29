// src/popsicle-player.jsx
import {useState} from "preact/hooks";
import {useEditor} from "@blockcode/core";
import {ScratchBlocks as ScratchBlocks3} from "@blockcode/blocks-editor";
import {BlocksPlayer, paperCore as paperCore4} from "@blockcode/blocks-player";

// src/runtime/runtime.js
import {paperCore, Runtime as BaseRuntime} from "@blockcode/blocks-player";

// /Users/yeqin/Developer/blockcode-gui/node_modules/@blockcode/tone-player/dist/index.js
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
    this._audioContext = new globalThis.AudioContext;
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

// src/lib/rotation-style.js
var rotation_style_default = {
  DONOT_ROTATE: 0,
  HORIZONTAL_FLIP: 1,
  ALL_AROUND: 2
};

// src/generators/javascript.js
import {javascriptGenerator as javascriptGenerator7} from "@blockcode/blocks-player";

// src/generators/javascript/control.js
import {javascriptGenerator} from "@blockcode/blocks-player";
javascriptGenerator["control_start_as_clone"] = (block) => {
};
javascriptGenerator["control_create_clone_of"] = (block) => {
};
javascriptGenerator["control_delete_this_clone"] = (block) => {
};

// src/generators/javascript/event.js
import {ScratchBlocks as ScratchBlocks2} from "@blockcode/blocks-editor";
import {javascriptGenerator as javascriptGenerator2} from "@blockcode/blocks-player";
javascriptGenerator2["event_whenkeypressed"] = (block) => {
  let code = "";
  const keyCode = block.getFieldValue("KEY_OPTION");
  code += `runtime.on('keypressed_${keyCode}', async () => {/* nextCode */});\n`;
  return code;
};
javascriptGenerator2["event_whenbackdropswitchesto"] = (block) => {
  let code = "";
  const backdropCode = block.getFieldValue("BACKDROP");
  code += `runtime.on('backdropswitchesto_${backdropCode}', async () => {/* nextCode */});\n`;
  return code;
};
javascriptGenerator2["event_whengreaterthan"] = (block) => {
};
javascriptGenerator2["event_whenbroadcastreceived"] = (block) => {
  let code = "";
  const messageName = javascriptGenerator2.variableDB_.getName(block.getFieldValue("BROADCAST_OPTION"), ScratchBlocks2.Variables.NAME_TYPE);
  code += `runtime.received('${messageName}', async (sprite) => {/* nextCode */});\n`;
  return code;
};

// src/generators/javascript/looks.js
import {javascriptGenerator as javascriptGenerator3} from "@blockcode/blocks-player";
javascriptGenerator3["looks_sayforsecs"] = (block) => {
};
javascriptGenerator3["looks_say"] = (block) => {
};
javascriptGenerator3["looks_thinkforsecs"] = (block) => {
};
javascriptGenerator3["looks_think"] = (block) => {
};
javascriptGenerator3["looks_show"] = (block) => {
  let code = "";
  if (javascriptGenerator3.STATEMENT_PREFIX) {
    code += javascriptGenerator3.injectId(javascriptGenerator3.STATEMENT_PREFIX, block);
  }
  code += `sprite.util.hidden = false;\n`;
  return code;
};
javascriptGenerator3["looks_hide"] = (block) => {
  let code = "";
  if (javascriptGenerator3.STATEMENT_PREFIX) {
    code += javascriptGenerator3.injectId(javascriptGenerator3.STATEMENT_PREFIX, block);
  }
  code += `sprite.util.hidden = true;\n`;
  return code;
};
javascriptGenerator3["looks_changesizeby"] = (block) => {
  let code = "";
  if (javascriptGenerator3.STATEMENT_PREFIX) {
    code += javascriptGenerator3.injectId(javascriptGenerator3.STATEMENT_PREFIX, block);
  }
  const changeValue = javascriptGenerator3.valueToCode(block, "CHANGE", javascriptGenerator3.ORDER_NONE);
  code += `sprite.util.size += ${changeValue};\n`;
  return code;
};
javascriptGenerator3["looks_setsizeto"] = (block) => {
  let code = "";
  if (javascriptGenerator3.STATEMENT_PREFIX) {
    code += javascriptGenerator3.injectId(javascriptGenerator3.STATEMENT_PREFIX, block);
  }
  const sizeValue = javascriptGenerator3.valueToCode(block, "SIZE", javascriptGenerator3.ORDER_NONE);
  code += `sprite.util.size = ${sizeValue};\n`;
  return code;
};
javascriptGenerator3["looks_size"] = (block) => {
  const code = "sprite.util.size";
  return [code, javascriptGenerator3.ORDER_NONE];
};
javascriptGenerator3["looks_costume"] = (block) => {
  const code = block.getFieldValue("COSTUME");
  return [code, javascriptGenerator3.ORDER_ATOMIC];
};
javascriptGenerator3["looks_switchcostumeto"] = (block) => {
  let code = "";
  if (javascriptGenerator3.STATEMENT_PREFIX) {
    code += javascriptGenerator3.injectId(javascriptGenerator3.STATEMENT_PREFIX, block);
  }
  const costumeValue = javascriptGenerator3.valueToCode(block, "COSTUME", javascriptGenerator3.ORDER_NONE);
  code += `sprite.util.costume = '${costumeValue}';\n`;
  return code;
};
javascriptGenerator3["looks_nextcostume"] = (block) => {
  let code = "";
  if (javascriptGenerator3.STATEMENT_PREFIX) {
    code += javascriptGenerator3.injectId(javascriptGenerator3.STATEMENT_PREFIX, block);
  }
  code += `sprite.util.costume++;\n`;
  return code;
};
javascriptGenerator3["looks_backdrops"] = (block) => {
  const code = block.getFieldValue("BACKDROP");
  return [code, javascriptGenerator3.ORDER_ATOMIC];
};
javascriptGenerator3["looks_switchbackdropto"] = (block) => {
  let code = "";
  if (javascriptGenerator3.STATEMENT_PREFIX) {
    code += javascriptGenerator3.injectId(javascriptGenerator3.STATEMENT_PREFIX, block);
  }
  const backdropValue = javascriptGenerator3.valueToCode(block, "BACKDROP", javascriptGenerator3.ORDER_NONE);
  code += `stage.util.backdrop = '${backdropValue}';\n`;
  return code;
};
javascriptGenerator3["looks_nextbackdrop"] = (block) => {
  let code = "";
  if (javascriptGenerator3.STATEMENT_PREFIX) {
    code += javascriptGenerator3.injectId(javascriptGenerator3.STATEMENT_PREFIX, block);
  }
  code += `stage.util.backdrop++;\n`;
  return code;
};
javascriptGenerator3["looks_gotofrontback"] = (block) => {
  let code = "";
  if (javascriptGenerator3.STATEMENT_PREFIX) {
    code += javascriptGenerator3.injectId(javascriptGenerator3.STATEMENT_PREFIX, block);
  }
  const frontOrBack = block.getFieldValue("FRONT_BACK");
  code += `stage.util.layer = ${frontOrBack};\n`;
  return code;
};
javascriptGenerator3["looks_goforwardbackwardlayers"] = (block) => {
  let code = "";
  if (javascriptGenerator3.STATEMENT_PREFIX) {
    code += javascriptGenerator3.injectId(javascriptGenerator3.STATEMENT_PREFIX, block);
  }
  const forwardOrBackward = block.getFieldValue("FORWARD_BACKWARD");
  const changeValue = javascriptGenerator3.valueToCode(block, "NUM", javascriptGenerator3.ORDER_NONE);
  code += `stage.util.layer ${forwardOrBackward === "backward" ? "-" : "+"}= ${changeValue};\n`;
  return code;
};
javascriptGenerator3["looks_backdropnumbername"] = (block) => {
};
javascriptGenerator3["looks_costumenumbername"] = (block) => {
};
javascriptGenerator3["looks_switchbackdroptoandwait"] = (block) => {
};

// src/generators/javascript/motion.js
import {javascriptGenerator as javascriptGenerator4} from "@blockcode/blocks-player";
javascriptGenerator4["motion_movesteps"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const stepCode = javascriptGenerator4.valueToCode(block, "STEPS", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.move(${stepCode});\n`;
  return code;
};
javascriptGenerator4["motion_turnright"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const degreesCode = javascriptGenerator4.valueToCode(block, "DEGREES", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.direction += ${degreesCode};\n`;
  return code;
};
javascriptGenerator4["motion_turnleft"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const degreesCode = javascriptGenerator4.valueToCode(block, "DEGREES", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.direction -= ${degreesCode};\n`;
  return code;
};
javascriptGenerator4["motion_pointindirection"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const directionCode = javascriptGenerator4.valueToCode(block, "DIRECTION", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.direction = ${directionCode};\n`;
  return code;
};
javascriptGenerator4["motion_pointtowards_menu"] = (block) => {
  let code, order;
  const towards = block.getFieldValue("TOWARDS");
  if (towards === "_random_") {
    code = `runtime.random(1, 360)`;
    order = javascriptGenerator4.ORDER_FUNCTION_CALL;
  } else {
    code = `runtime.getSpriteById('${towards}').data`;
    order = javascriptGenerator4.ORDER_MEMBER;
  }
  return [code, order];
};
javascriptGenerator4["motion_pointtowards"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const towardsCode = javascriptGenerator4.valueToCode(block, "TOWARDS", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.towards(${towardsCode});\n`;
  return code;
};
javascriptGenerator4["motion_gotoxy"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const xCode = javascriptGenerator4.valueToCode(block, "X", javascriptGenerator4.ORDER_NONE);
  const yCode = javascriptGenerator4.valueToCode(block, "Y", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.goto(${xCode}, ${yCode});\n`;
  return code;
};
javascriptGenerator4["motion_goto_menu"] = (block) => {
  let code, order;
  const toPlace = block.getFieldValue("TO");
  if (toPlace === "_random_") {
    code = `{ x: runtime.random('width'), y: runtime.random('height') }`;
    order = javascriptGenerator4.ORDER_ATOMIC;
  } else {
    code = `runtime.getSpriteById('${toPlace}').data`;
    order = javascriptGenerator4.ORDER_MEMBER;
  }
  return [code, order];
};
javascriptGenerator4["motion_goto"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const toCode = javascriptGenerator4.valueToCode(block, "TO", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.goto(${toCode});\n`;
  return code;
};
javascriptGenerator4["motion_glidesecstoxy"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const secsCode = javascriptGenerator4.valueToCode(block, "SECS", javascriptGenerator4.ORDER_NONE);
  const xCode = javascriptGenerator4.valueToCode(block, "X", javascriptGenerator4.ORDER_NONE);
  const yCode = javascriptGenerator4.valueToCode(block, "Y", javascriptGenerator4.ORDER_NONE);
  code += `await sprite.util.glide(${secsCode}, ${xCode}, ${yCode});\n`;
  return code;
};
javascriptGenerator4["motion_glideto_menu"] = javascriptGenerator4["motion_goto_menu"];
javascriptGenerator4["motion_glideto"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const secsCode = javascriptGenerator4.valueToCode(block, "SECS", javascriptGenerator4.ORDER_NONE);
  const toCode = javascriptGenerator4.valueToCode(block, "TO", javascriptGenerator4.ORDER_NONE);
  code += `await sprite.util.glide(${secsCode}, ${toCode});\n`;
  return code;
};
javascriptGenerator4["motion_changexby"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const dxCode = javascriptGenerator4.valueToCode(block, "DX", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.x += ${dxCode};\n`;
  return code;
};
javascriptGenerator4["motion_setx"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const xCode = javascriptGenerator4.valueToCode(block, "X", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.x = ${xCode};\n`;
  return code;
};
javascriptGenerator4["motion_changeyby"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const dyCode = javascriptGenerator4.valueToCode(block, "DY", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.y += ${dyCode};\n`;
  return code;
};
javascriptGenerator4["motion_sety"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  const yCode = javascriptGenerator4.valueToCode(block, "Y", javascriptGenerator4.ORDER_NONE);
  code += `sprite.util.y = ${yCode};\n`;
  return code;
};
javascriptGenerator4["motion_ifonedgebounce"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  code += "sprite.util.edgeBounce();\n";
  return code;
};
javascriptGenerator4["motion_setrotationstyle"] = (block) => {
  let code = "";
  if (javascriptGenerator4.STATEMENT_PREFIX) {
    code += javascriptGenerator4.injectId(javascriptGenerator4.STATEMENT_PREFIX, block);
  }
  let styleCode;
  const rotationStyle = block.getFieldValue("STYLE");
  switch (rotationStyle) {
    case "left-right":
      styleCode = "HORIZONTAL_FLIP";
      break;
    case `don't rotate`:
      styleCode = "DONOT_ROTATE";
      break;
    case "all around":
      styleCode = "ALL_AROUND";
    default:
      break;
  }
  code += `sprite.data.rotationStyle = runtime.RotationStyle.${styleCode};\n`;
  return code;
};
javascriptGenerator4["motion_xposition"] = (block) => {
  const code = "sprite.util.x";
  return [code, javascriptGenerator4.ORDER_NONE];
};
javascriptGenerator4["motion_yposition"] = (block) => {
  const code = "sprite.util.y";
  return [code, javascriptGenerator4.ORDER_NONE];
};
javascriptGenerator4["motion_direction"] = (block) => {
  const code = "sprite.util.direction";
  return [code, javascriptGenerator4.ORDER_NONE];
};

// src/generators/javascript/sensing.js
import {javascriptGenerator as javascriptGenerator5} from "@blockcode/blocks-player";

// src/generators/javascript/sound.js
import {javascriptGenerator as javascriptGenerator6} from "@blockcode/blocks-player";
javascriptGenerator6["sound_sounds_menu"] = (block) => {
  const soundName = block.getFieldValue("SOUND_MENU");
  return [soundName, javascriptGenerator6.ORDER_ATOMIC];
};
javascriptGenerator6["sound_play"] = (block) => {
  let code = "";
  if (javascriptGenerator6.STATEMENT_PREFIX) {
    code += javascriptGenerator6.injectId(javascriptGenerator6.STATEMENT_PREFIX, block);
  }
  const soundName = javascriptGenerator6.valueToCode(block, "SOUND_MENU", javascriptGenerator6.ORDER_NONE) || "SILENT";
  code += `runtime.tone.play(runtime.Music.${soundName})\n`;
  return code;
};
javascriptGenerator6["sound_playuntildone"] = (block) => {
  let code = "";
  if (javascriptGenerator6.STATEMENT_PREFIX) {
    code += javascriptGenerator6.injectId(javascriptGenerator6.STATEMENT_PREFIX, block);
  }
  const soundName = javascriptGenerator6.valueToCode(block, "SOUND_MENU", javascriptGenerator6.ORDER_NONE) || "SILENT";
  code += `await runtime.tone.play(runtime.Music.${soundName})\n`;
  return code;
};
javascriptGenerator6["sound_stopallsounds"] = (block) => {
  let code = "";
  if (javascriptGenerator6.STATEMENT_PREFIX) {
    code += javascriptGenerator6.injectId(javascriptGenerator6.STATEMENT_PREFIX, block);
  }
  code += `await runtime.tone.stop()\n`;
  return code;
};

// src/generators/javascript.js
javascriptGenerator7.scrub_ = function(block, code) {
  var commentCode = "";
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    var comment = block.getCommentText();
    comment = ScratchBlocks.utils.wrap(comment, javascriptGenerator7.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        commentCode += "/**\n" + javascriptGenerator7.prefixLines(comment + "\n", " * ") + " */\n";
      } else {
        commentCode += javascriptGenerator7.prefixLines(comment + "\n", "// ");
      }
    }
    for (var i = 0;i < block.inputList.length; i++) {
      if (block.inputList[i].type == ScratchBlocks.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = javascriptGenerator7.allNestedComments(childBlock);
          if (comment) {
            commentCode += javascriptGenerator7.prefixLines(comment, "// ");
          }
        }
      }
    }
  }
  if (block.startHat_) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    let nextCode = javascriptGenerator7.blockToCode(nextBlock);
    if (nextCode) {
      nextCode = javascriptGenerator7.prefixLines(`counter++;\n${nextCode}counter--;\n`, javascriptGenerator7.INDENT);
      code = code.replace(`/* nextCode */`, `\n${nextCode}`);
    }
    return commentCode + code;
  }
  if (block.parentBlock_) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = javascriptGenerator7.blockToCode(nextBlock);
    return commentCode + code + nextCode;
  }
  return "";
};

// src/runtime/runtime.js
class Runtime extends BaseRuntime {
  static VIEW_WIDTH = 280;
  static VIEW_HEIGHT = 240;
  static DEFAULT_DIRECTION = 90;
  get tone() {
    if (!this._tone) {
      this._tone = new Tone({ type: "square" });
    }
    return this._tone;
  }
  get Music() {
    return exports_music;
  }
  get RotationStyle() {
    return rotation_style_default;
  }
  get stage() {
    const stageLayer = paperCore.project.layers["stage"];
    const raster = stageLayer.children[0];
    raster.util.runtime = this;
    return raster;
  }
  get sprites() {
    const spriteLayer = paperCore.project.layers["sprite"];
    return spriteLayer.children;
  }
  getSpriteById(id) {
    const raster = this.sprites[id];
    raster.util.runtime = this;
    return raster;
  }
  random(min = 1, max = 10) {
    if (min === "width") {
      max = Runtime.VIEW_WIDTH / 2;
      min = -max;
    }
    if (min === "height") {
      max = Runtime.VIEW_HEIGHT / 2;
      min = -max;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  stop() {
    this.tone.stop();
    super.stop();
  }
}

// src/runtime/generate.js
var targetCode = (target, index) => `
(()=>{//${target.name}
counter++;
const stage = runtime.stage;
${index > 0 ? `const sprite = runtime.getSpriteById('${target.id}');\n` : ""}
${target.script || ""}
counter--;
})();
`;
var generate_default = (targets) => `
let counter = 0;
${targets.map(targetCode).join("")}
runtime.on('frame', () => {
  if (counter === 0) runtime.stop();
});
runtime.start();
`;

// src/runtime/target-util.js
import {paperCore as paperCore3} from "@blockcode/blocks-player";

// node:events
var x = function(t) {
  console && console.warn && console.warn(t);
};
var o = function() {
  o.init.call(this);
};
var v = function(t) {
  if (typeof t != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
};
var m = function(t) {
  return t._maxListeners === undefined ? o.defaultMaxListeners : t._maxListeners;
};
var y = function(t, e, n, r) {
  var i, f, s;
  if (v(n), f = t._events, f === undefined ? (f = t._events = Object.create(null), t._eventsCount = 0) : (f.newListener !== undefined && (t.emit("newListener", e, n.listener ? n.listener : n), f = t._events), s = f[e]), s === undefined)
    s = f[e] = n, ++t._eventsCount;
  else if (typeof s == "function" ? s = f[e] = r ? [n, s] : [s, n] : r ? s.unshift(n) : s.push(n), i = m(t), i > 0 && s.length > i && !s.warned) {
    s.warned = true;
    var u = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    u.name = "MaxListenersExceededWarning", u.emitter = t, u.type = e, u.count = s.length, x(u);
  }
  return t;
};
var C = function() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
};
var g = function(t, e, n) {
  var r = { fired: false, wrapFn: undefined, target: t, type: e, listener: n }, i = C.bind(r);
  return i.listener = n, r.wrapFn = i, i;
};
var _ = function(t, e, n) {
  var r = t._events;
  if (r === undefined)
    return [];
  var i = r[e];
  return i === undefined ? [] : typeof i == "function" ? n ? [i.listener || i] : [i] : n ? R(i) : b(i, i.length);
};
var w = function(t) {
  var e = this._events;
  if (e !== undefined) {
    var n = e[t];
    if (typeof n == "function")
      return 1;
    if (n !== undefined)
      return n.length;
  }
  return 0;
};
var b = function(t, e) {
  for (var n = new Array(e), r = 0;r < e; ++r)
    n[r] = t[r];
  return n;
};
var j = function(t, e) {
  for (;e + 1 < t.length; e++)
    t[e] = t[e + 1];
  t.pop();
};
var R = function(t) {
  for (var e = new Array(t.length), n = 0;n < e.length; ++n)
    e[n] = t[n].listener || t[n];
  return e;
};
var a = typeof Reflect == "object" ? Reflect : null;
var d = a && typeof a.apply == "function" ? a.apply : function(e, n, r) {
  return Function.prototype.apply.call(e, n, r);
};
var l;
a && typeof a.ownKeys == "function" ? l = a.ownKeys : Object.getOwnPropertySymbols ? l = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : l = function(e) {
  return Object.getOwnPropertyNames(e);
};
var L = Number.isNaN || function(e) {
  return e !== e;
};
o.EventEmitter = o;
o.prototype._events = undefined;
o.prototype._eventsCount = 0;
o.prototype._maxListeners = undefined;
var h = 10;
Object.defineProperty(o, "defaultMaxListeners", { enumerable: true, get: function() {
  return h;
}, set: function(t) {
  if (typeof t != "number" || t < 0 || L(t))
    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
  h = t;
} });
o.init = function() {
  (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || undefined;
};
o.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || L(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
o.prototype.getMaxListeners = function() {
  return m(this);
};
o.prototype.emit = function(e) {
  for (var n = [], r = 1;r < arguments.length; r++)
    n.push(arguments[r]);
  var i = e === "error", f = this._events;
  if (f !== undefined)
    i = i && f.error === undefined;
  else if (!i)
    return false;
  if (i) {
    var s;
    if (n.length > 0 && (s = n[0]), s instanceof Error)
      throw s;
    var u = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
    throw u.context = s, u;
  }
  var c = f[e];
  if (c === undefined)
    return false;
  if (typeof c == "function")
    d(c, this, n);
  else
    for (var p = c.length, O = b(c, p), r = 0;r < p; ++r)
      d(O[r], this, n);
  return true;
};
o.prototype.addListener = function(e, n) {
  return y(this, e, n, false);
};
o.prototype.on = o.prototype.addListener;
o.prototype.prependListener = function(e, n) {
  return y(this, e, n, true);
};
o.prototype.once = function(e, n) {
  return v(n), this.on(e, g(this, e, n)), this;
};
o.prototype.prependOnceListener = function(e, n) {
  return v(n), this.prependListener(e, g(this, e, n)), this;
};
o.prototype.removeListener = function(e, n) {
  var r, i, f, s, u;
  if (v(n), i = this._events, i === undefined)
    return this;
  if (r = i[e], r === undefined)
    return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0 ? this._events = Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, r.listener || n));
  else if (typeof r != "function") {
    for (f = -1, s = r.length - 1;s >= 0; s--)
      if (r[s] === n || r[s].listener === n) {
        u = r[s].listener, f = s;
        break;
      }
    if (f < 0)
      return this;
    f === 0 ? r.shift() : j(r, f), r.length === 1 && (i[e] = r[0]), i.removeListener !== undefined && this.emit("removeListener", e, u || n);
  }
  return this;
};
o.prototype.off = o.prototype.removeListener;
o.prototype.removeAllListeners = function(e) {
  var n, r, i;
  if (r = this._events, r === undefined)
    return this;
  if (r.removeListener === undefined)
    return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : r[e] !== undefined && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete r[e]), this;
  if (arguments.length === 0) {
    var f = Object.keys(r), s;
    for (i = 0;i < f.length; ++i)
      s = f[i], s !== "removeListener" && this.removeAllListeners(s);
    return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
  }
  if (n = r[e], typeof n == "function")
    this.removeListener(e, n);
  else if (n !== undefined)
    for (i = n.length - 1;i >= 0; i--)
      this.removeListener(e, n[i]);
  return this;
};
o.prototype.listeners = function(e) {
  return _(this, e, true);
};
o.prototype.rawListeners = function(e) {
  return _(this, e, false);
};
o.listenerCount = function(t, e) {
  return typeof t.listenerCount == "function" ? t.listenerCount(e) : w.call(t, e);
};
o.prototype.listenerCount = w;
o.prototype.eventNames = function() {
  return this._eventsCount > 0 ? l(this._events) : [];
};
var P = o.prototype;

// src/lib/sleep.js
function sleep_default(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// src/lib/load-image.js
function load_image_default(asset) {
  return new Promise(async (resolve) => {
    const image = new globalThis.Image;
    image.src = typeof asset === "string" ? asset : `data:${asset.type};base64,${asset.data}`;
    image.addEventListener("load", () => resolve(image));
  });
}

// src/lib/deg-rad.js
var degToRad = (deg) => deg * Math.PI / 180;
var radToDeg = (rad) => rad * 180 / Math.PI;

// src/runtime/create-contour.js
import {paperCore as paperCore2} from "@blockcode/blocks-player";
function create_contour_default(raster) {
  const image = raster.image;
  const ctx = raster.context;
  const points = new Set;
  for (let y2 = 0;y2 < image.height; y2++) {
    for (let x2 = 0;x2 < image.width; x2++) {
      const [r, g2, b2, a2] = ctx.getImageData(x2, y2, 1, 1).data;
      if (a2 !== 0) {
        points.add(`${x2},${y2}`);
        break;
      }
    }
  }
  for (let x2 = 0;x2 < image.width; x2++) {
    for (let y2 = image.height - 1;y2 >= 0; y2--) {
      const [r, g2, b2, a2] = ctx.getImageData(x2, y2, 1, 1).data;
      if (a2 !== 0) {
        points.add(`${x2},${y2}`);
        break;
      }
    }
  }
  for (let y2 = image.height - 1;y2 >= 0; y2--) {
    for (let x2 = image.width - 1;x2 >= 0; x2--) {
      const [r, g2, b2, a2] = ctx.getImageData(x2, y2, 1, 1).data;
      if (a2 !== 0) {
        points.add(`${x2},${y2}`);
        break;
      }
    }
  }
  for (let x2 = image.width - 1;x2 >= 0; x2--) {
    for (let y2 = 0;y2 < image.height; y2++) {
      const [r, g2, b2, a2] = ctx.getImageData(x2, y2, 1, 1).data;
      if (a2 !== 0) {
        points.add(`${x2},${y2}`);
        break;
      }
    }
  }
  if (!points.size)
    return;
  return new paperCore2.Path({
    segments: Array.from(points).map((point) => new paperCore2.Point(point.split(",").map((n) => parseInt(n)))),
    pivot: new paperCore2.Point(raster.pivot.x + image.width / 2, raster.pivot.y + image.height / 2),
    position: raster.position,
    scaling: raster.scaling,
    rotation: raster.rotation,
    closed: true,
    visible: true,
    applyMatrix: false,
    locked: true,
    strokeColor: "red"
  });
}

// src/runtime/target-util.js
var POSITION_PADDING = 8;

class Util extends o {
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
    return new paperCore3.Rectangle(paperCore3.view.center.x - Runtime.VIEW_WIDTH / 2, paperCore3.view.center.y - Runtime.VIEW_HEIGHT / 2, Runtime.VIEW_WIDTH, Runtime.VIEW_HEIGHT);
  }
  get contour() {
    return this._contour;
  }
  async setImage(assetIndex, calcContour = true) {
    const asset = this.assets[assetIndex];
    if (!asset)
      return;
    const image = await load_image_default(asset);
    this.raster.image = image;
    this.raster.pivot = new paperCore3.Point(asset.centerX - asset.width / 2, asset.centerY - asset.height / 2);
    this.data.assetIndex = assetIndex;
    if (this.running) {
      this.emit("update");
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
    this._contour = create_contour_default(this.raster);
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
    if (typeof value === "string") {
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
    if (typeof value === "string") {
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
  set x(x2) {
    if (x2 !== this.data.x || paperCore3.view.zoom !== this.data.zoomRatio) {
      if (this.contour) {
        const dx = x2 - this.data.x;
        const left = this.contour.bounds.right - POSITION_PADDING + dx;
        const right = this.contour.bounds.left + POSITION_PADDING + dx;
        if (left < this.stageBounds.left) {
          x2 += this.stageBounds.left - left;
        }
        if (right > this.stageBounds.right) {
          x2 += this.stageBounds.right - right;
        }
      }
      this.data.x = x2;
      if (this.running) {
        this.emit("update");
      }
      this.raster.position.x = paperCore3.view.center.x + x2;
      if (this.contour) {
        this.contour.position.x = this.raster.position.x;
      }
    }
  }
  get y() {
    return this.data.y;
  }
  set y(y2) {
    if (y2 !== this.data.y || paperCore3.view.zoom !== this.data.zoomRatio) {
      if (this.contour) {
        const dy = y2 - this.data.y;
        const top = this.contour.bounds.bottom - POSITION_PADDING - dy;
        const bottom = this.contour.bounds.top + POSITION_PADDING - dy;
        if (top < this.stageBounds.top) {
          y2 -= this.stageBounds.top - top;
        }
        if (bottom > this.stageBounds.bottom) {
          y2 -= this.stageBounds.bottom - bottom;
        }
      }
      this.data.y = y2;
      if (this.running) {
        this.emit("update");
      }
      this.raster.position.y = paperCore3.view.center.y - y2;
      if (this.contour) {
        this.contour.position.y = this.raster.position.y;
      }
    }
  }
  _size(value) {
    let size = value < 5 ? 5 : value;
    const width = this.raster.image.width * size / 100;
    const height = this.raster.image.height * size / 100;
    const maxWidth = paperCore3.view.viewSize.width * 2;
    const maxHeight = paperCore3.view.viewSize.height * 2;
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
        this.emit("update");
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
        this.emit("update");
      }
      if (this.contour) {
        this.contour.visible = this.raster.visible;
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
        this.emit("update");
      }
      if (this.data.rotationStyle === rotation_style_default.ALL_AROUND) {
        this.raster.rotation = direction - Runtime.DEFAULT_DIRECTION;
      } else if (this.data.rotationStyle === rotation_style_default.HORIZONTAL_FLIP) {
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
  get layer() {
  }
  move(steps) {
    const radian = degToRad(this.direction - Runtime.DEFAULT_DIRECTION);
    const dx = steps * Math.cos(radian);
    const dy = steps * Math.sin(radian);
    this.x += dx;
    this.y -= dy;
  }
  goto(x2, y2) {
    if (typeof x2 === "object") {
      y2 = x2.y;
      x2 = x2.x;
    }
    this.x = x2;
    this.y = y2;
  }
  towards(target) {
    if (typeof target === "number") {
      this.direction = target;
    } else {
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      this.direction = Runtime.DEFAULT_DIRECTION - radToDeg(Math.atan2(dy, dx));
    }
  }
  async glide(duration, x2, y2) {
    if (typeof x2 === "object") {
      y2 = x2.y;
      x2 = x2.x;
    }
    if (duration <= 0) {
      this.goto(x2, y2);
      return;
    }
    duration *= 1000;
    const startx = this.x;
    const starty = this.y;
    const dx = x2 - startx;
    const dy = y2 - starty;
    let frac;
    let elapsed = 0;
    let start = Date.now();
    while (true) {
      await sleep_default(0);
      elapsed = Date.now() - start;
      if (elapsed < duration) {
        frac = elapsed / duration;
        this.goto(startx + dx * frac, starty + dy * frac);
      } else {
        this.goto(x2, y2);
        break;
      }
      if (!this.runtime.running)
        break;
    }
  }
  async edgeBounce() {
    if (!this.contour)
      return;
    let nearestEdge;
    if (this.contour.bounds.top < this.stageBounds.top) {
      nearestEdge = "top";
    }
    if (this.contour.bounds.left < this.stageBounds.left) {
      nearestEdge = "left";
    }
    if (this.contour.bounds.right > this.stageBounds.right) {
      nearestEdge = "right";
    }
    if (this.contour.bounds.bottom > this.stageBounds.bottom) {
      nearestEdge = "bottom";
    }
    if (!nearestEdge)
      return;
    const radians = degToRad(Runtime.DEFAULT_DIRECTION - this.direction);
    let dx = Math.cos(radians);
    let dy = -Math.sin(radians);
    if (nearestEdge === "left") {
      dx = Math.max(0.2, Math.abs(dx));
    } else if (nearestEdge === "top") {
      dy = Math.max(0.2, Math.abs(dy));
    } else if (nearestEdge === "right") {
      dx = 0 - Math.max(0.2, Math.abs(dx));
    } else if (nearestEdge === "bottom") {
      dy = 0 - Math.max(0.2, Math.abs(dy));
    }
    this.direction = radToDeg(Math.atan2(dy, dx)) + Runtime.DEFAULT_DIRECTION;
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
function createUtil(raster, isStage = false) {
  return isStage ? new StageUtil(raster) : new SpriteUtil(raster);
}

// src/popsicle-player.jsx
function PopsiclePlayer({ stageSize, playing, onRequestStop }) {
  const [canvas, setCanvas] = useState(null);
  const [currentRuntime, setCurrentRuntime] = useState(false);
  const { fileList, assetList, selectedIndex, openFile, modifyFile } = useEditor();
  const zoomRatio = stageSize === "small" ? 1 : 1.5;
  const viewSize = new paperCore4.Size(Runtime.VIEW_WIDTH * zoomRatio, Runtime.VIEW_HEIGHT * zoomRatio);
  const updateTargetFromRaster = (raster, isStage = false) => {
    if (!raster || !raster.util)
      return;
    modifyFile(Object.assign({
      id: raster.name
    }, isStage ? {
      backdrop: raster.util.backdrop
    } : {
      costume: raster.util.costume,
      x: raster.util.x,
      y: raster.util.y,
      size: raster.util.size,
      direction: raster.util.direction,
      rotationStyle: raster.data.rotationStyle,
      hidden: !raster.visible
    }));
  };
  const setMouseUpHandler = (raster, index) => async (e) => {
    if (!raster.dragging)
      return;
    clearTimeout(raster.dragging);
    delete raster.dragging;
    raster.shadowColor = null;
    raster.util.goto(raster.position.x - paperCore4.view.center.x, paperCore4.view.center.y - raster.position.y);
    updateTargetFromRaster(raster);
    if (index !== selectedIndex) {
      openFile(index);
    }
  };
  const setSelected = (raster) => {
    if (raster.dragging !== true) {
      clearTimeout(raster.dragging);
    }
    raster.dragging = true;
    raster.bringToFront();
    raster.set({
      shadowColor: new paperCore4.Color(0, 0, 0, 0.2),
      shadowBlur: 8
    });
  };
  if (canvas) {
    paperCore4.view.viewSize = viewSize;
    paperCore4.view.zoom = zoomRatio;
    if (playing) {
      const spriteLayer = paperCore4.project.layers["sprite"];
      spriteLayer.onMouseDown = false;
      if (!currentRuntime) {
        const code = generate_default(fileList);
        setCurrentRuntime(new Runtime(code, onRequestStop));
      }
    } else {
      if (currentRuntime) {
        currentRuntime.stop();
        setCurrentRuntime(false);
      } else {
        const stageLayer = paperCore4.project.layers["stage"];
        const spriteLayer = paperCore4.project.layers["sprite"];
        spriteLayer.onMouseDown = (e) => {
          for (const hitTarget of spriteLayer.hitTestAll(e.point)) {
            if (hitTarget.item.getAverageColor(e.point)) {
              hitTarget.item.dragging = setTimeout(() => setSelected(hitTarget.item), 1000);
              return;
            }
          }
        };
        spriteLayer.onMouseDrag = (e) => {
          const raster = spriteLayer.children.find((child) => child.dragging);
          if (raster) {
            setSelected(raster);
            raster.position.x += e.delta.x;
            raster.position.y += e.delta.y;
          }
        };
        fileList.forEach(async (target, index) => {
          const isStage = index === 0;
          const layer = isStage ? stageLayer : spriteLayer;
          const assets = assetList.filter((asset) => target.assets.includes(asset.id));
          let raster = layer.children[target.id];
          if (!raster) {
            raster = new paperCore4.Raster;
            raster.name = target.id;
            raster.data = { assets, zoomRatio };
            raster.util = createUtil(raster, isStage);
            raster.util.on("update", () => updateTargetFromRaster(raster, isStage));
            layer.addChild(raster);
          }
          raster.data.assets = assets;
          if (isStage) {
            raster.util.backdrop = target.backdrop;
          } else {
            raster.onMouseUp = setMouseUpHandler(raster, index);
            raster.util.costume = target.costume;
            raster.util.x = target.x;
            raster.util.y = target.y;
            raster.util.size = target.size;
            raster.util.hidden = target.hidden;
            raster.util.direction = target.direction;
            raster.data.rotationStyle = target.rotationStyle;
            raster.data.zoomRatio = zoomRatio;
          }
        });
        spriteLayer.children.forEach((child) => {
          if (child instanceof paperCore4.Path)
            return;
          if (fileList.find((file) => file.id === child.name))
            return;
          if (child.util.contour) {
            child.util.contour.remove();
          }
          child.remove();
        });
      }
    }
  }
  const handleSetup = (canvas2) => {
    setCanvas(canvas2);
    const stageLayer = new paperCore4.Layer;
    const spriteLayer = new paperCore4.Layer;
    stageLayer.name = "stage";
    spriteLayer.name = "sprite";
  };
  return jsxDEV(BlocksPlayer, {
    width: `${viewSize.width}px`,
    height: `${viewSize.height}px`,
    onSetup: handleSetup,
    onClick: () => globalThis.document.querySelectorAll("input:focus").forEach((e) => e.blur())
  }, undefined, false, undefined, this);
}
import {
jsxDEV
} from "preact/jsx-dev-runtime";
export {
  PopsiclePlayer
};
