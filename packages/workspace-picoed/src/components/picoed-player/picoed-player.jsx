import { useState } from 'preact/hooks';
import { useEditor } from '@blockcode/core';
import { BlocksPlayer, paperCore } from '@blockcode/blocks-player';

import Runtime from './runtime';
import generate from './generate';

import picoedImage from './picoed.png';

export function PicoedPlayer({ playing, onRequestStop }) {
  const [canvas, setCanvas] = useState(null);
  const [currentRuntime, setCurrentRuntime] = useState(false);
  const { fileList } = useEditor();
  const picoed = fileList[0];

  if (canvas) {
    const picoedItems = paperCore.project.activeLayer.children;

    let handleKeyPress = null;
    if (playing) {
      if (!currentRuntime) {
        // start
        const code = generate(picoed.script);
        const runtime = new Runtime(code, onRequestStop);
        setCurrentRuntime(runtime);

        picoedItems.A.onClick = () => {
          runtime.emit('keypressed_a');
          runtime.emit('keypressed_any');
        };
        picoedItems.B.onClick = () => {
          runtime.emit('keypressed_b');
          runtime.emit('keypressed_any');
        };
        handleKeyPress = (e) => {
          if (e.key === 'a') {
            runtime.emit('keypressed_a');
            runtime.emit('keypressed_any');
          }
          if (e.key === 'b') {
            runtime.emit('keypressed_b');
            runtime.emit('keypressed_any');
          }
        };
        document.addEventListener('keypress', handleKeyPress);
      }
    } else {
      if (currentRuntime) {
        // stop
        currentRuntime.stop();
        setCurrentRuntime(false);
        picoedItems.A.onClick = null;
        picoedItems.B.onClick = null;
        document.removeEventListener('keypress', handleKeyPress);
        handleKeyPress = null;
      }
    }
  }

  const handleSetup = (canvas) => {
    setCanvas(canvas);
    new paperCore.Raster({
      source: picoedImage,
      position: paperCore.view.center,
      scaling: 0.8,
    });

    // led
    new paperCore.Path.Circle({
      name: 'led',
      center: [176, 77],
      radius: 3,
      fillColor: 'rgba(0, 0, 0, 0.15)',
      shadowBlur: 8,
    });

    // leds matrix
    for (let x = 0; x < 17; x++) {
      for (let y = 0; y < 7; y++) {
        new paperCore.Path.Rectangle({
          name: `${x},${y}`,
          point: [103 + x * 12.9, 124 + y * 12.9],
          size: [10, 6],
          fillColor: 'white',
          rotation: -45,
          shadowBlur: 12,
        });
      }
    }

    // buttons
    const buttonProps = {
      size: [13, 19],
      fillColor: 'white',
      onMouseEnter() {
        if (!this.data.pressed) {
          this.fillColor = 'rgba(0, 0, 0, 0.05)';
        } else {
          this.fillColor = 'rgba(255, 0, 0, 0.15)';
        }
      },
      onMouseDown() {
        this.data.pressed = true;
        this.fillColor = 'rgba(255, 0, 0, 0.15)';
      },
      onMouseUp() {
        this.data.pressed = false;
        this.fillColor = 'rgba(0, 0, 0, 0.05)';
      },
      onMouseLeave() {
        this.data.pressed = false;
        this.fillColor = 'white';
      },
    };
    const buttonA = new paperCore.Path.Ellipse({
      name: `A`,
      point: [75.3, 156],
      ...buttonProps,
    });
    const buttonB = new paperCore.Path.Ellipse({
      name: `B`,
      point: [332.8, 156],
      ...buttonProps,
    });
    document.addEventListener('keydown', ({ key }) => {
      if (key === 'a') {
        buttonA.data.pressed = true;
        buttonA.fillColor = 'rgba(255, 0, 0, 0.15)';
      }
      if (key === 'b') {
        buttonB.data.pressed = true;
        buttonB.fillColor = 'rgba(255, 0, 0, 0.15)';
      }
    });
    document.addEventListener('keyup', ({ key }) => {
      if (key === 'a') {
        buttonA.data.pressed = false;
        buttonA.fillColor = 'white';
      }
      if (key === 'b') {
        buttonB.data.pressed = false;
        buttonB.fillColor = 'white';
      }
    });
  };

  return (
    <BlocksPlayer
      width="420px"
      height="320px"
      onSetup={handleSetup}
    />
  );
}
