import { useState } from 'preact/hooks';
import { useEditor } from '@blockcode/core';
import { BlocksPlayer, paperCore, javascriptGenerator } from '@blockcode/blocks-player';

import Tank from './tank';
import Runtime from './runtime';
import generate from './generate';

export function TankwarPlayer({ enemies, playing, onRequestStop }) {
  const [canvas, setCanvas] = useState(null);
  const [currentRuntime, setCurrentRuntime] = useState(false);
  const { fileList } = useEditor();
  const player = fileList[0];

  if (canvas) {
    const tanks = paperCore.project.activeLayer.children;

    if (playing) {
      if (!currentRuntime) {
        // start
        const code = generate(player.script);
        const runtime = new Runtime(code, onRequestStop);
        setCurrentRuntime(runtime);
      }
    } else {
      if (currentRuntime) {
        // stop
        currentRuntime.stop();
        setCurrentRuntime(false);
      } else {
        if (enemies === 1) {
          tanks['red'].util.place = Tank.PLACE.RIGHT;
        } else {
          tanks['red'].util.place = Tank.PLACE.RIGHT_TOP;
        }
        if (enemies > 1) {
          tanks['yellow'].util.place = Tank.PLACE.RIGHT_BOTTOM;
        } else {
          tanks['yellow'].util.hidden = true;
        }
        if (enemies > 2) {
          tanks['player'].util.place = Tank.PLACE.LEFT_TOP;
          tanks['green'].util.place = Tank.PLACE.LEFT_BOTTOM;
        } else {
          tanks['player'].util.place = Tank.PLACE.LEFT;
          tanks['green'].util.hidden = true;
        }
      }
    }
  }

  const handleSetup = (canvas) => {
    setCanvas(canvas);
    paperCore.view.zoom = 0.5;
    new Tank('player', Tank.STYLE.PLAYER, Tank.PLACE.LEFT);
    new Tank('red', Tank.STYLE.ENEMY_A, Tank.PLACE.RIGHT);
    new Tank('yellow', Tank.STYLE.ENEMY_B, Tank.PLACE.RIGHT_BOTTOM);
    new Tank('green', Tank.STYLE.ENEMY_C, Tank.PLACE.LEFT_BOTTOM);
  };

  return (
    <BlocksPlayer
      width={`480px`}
      height={`480px`}
      onSetup={handleSetup}
    />
  );
}
