import { useState } from 'preact/hooks';
import { useEditor } from '@blockcode/core';
import { BlocksPlayer, paperCore, javascriptGenerator } from '@blockcode/blocks-player';

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
      }
    } else {
      if (currentRuntime) {
        // stop
        currentRuntime.stop();
        setCurrentRuntime(false);
        picoedItems.A.onClick = null;
        picoedItems.B.onClick = null;
      }
    }
  }

  const handleSetup = (canvas) => {
    setCanvas(canvas);
    new paperCore.Raster({
      source: picoedImage,
      position: paperCore.view.center,
      scaling: new paperCore.Point(0.8, 0.8),
    });

    // led
    new paperCore.Path.Circle({
      name: 'led',
      center: [176, 77],
      radius: 3,
      fillColor: 'black',
      shadowBlur: 12,
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
    new paperCore.Path.Ellipse({
      name: `A`,
      point: [75.3, 156],
      size: [13, 19],
      fillColor: 'white',
      onClick() {
        console.log('A');
      },
    });
    new paperCore.Path.Ellipse({
      name: `B`,
      point: [332.8, 156],
      size: [13, 19],
      fillColor: 'white',
      onClick() {
        console.log('B');
      },
    });
  };

  return (
    <BlocksPlayer
      width={`420px`}
      height={`320px`}
      onSetup={handleSetup}
    />
  );
}
