import { useState } from 'preact/hooks';
import { useEditor } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks-editor';
import { BlocksPlayer, paperCore } from '@blockcode/blocks-player';

import Runtime from './runtime/runtime';
import generate from './runtime/generate';
import createUtil from './runtime/target-util';

export function PopsiclePlayer({ stageSize, playing, onRequestStop }) {
  const [canvas, setCanvas] = useState(null);
  const [currentRuntime, setCurrentRuntime] = useState(false);
  const { fileList, assetList, selectedIndex, openFile, modifyFile } = useEditor();

  const zoomRatio = stageSize === 'small' ? 1 : 1.5;
  const viewSize = new paperCore.Size(Runtime.VIEW_WIDTH * zoomRatio, Runtime.VIEW_HEIGHT * zoomRatio);

  const updateTargetFromRaster = (raster, isStage = false) => {
    if (!raster || !raster.util) return;
    modifyFile(
      Object.assign(
        {
          id: raster.name,
        },
        isStage
          ? {
              backdrop: raster.util.backdrop,
            }
          : {
              costume: raster.util.costume,
              x: raster.util.x,
              y: raster.util.y,
              size: raster.util.size,
              direction: raster.util.direction,
              rotationStyle: raster.data.rotationStyle,
              hidden: !raster.visible,
            }
      )
    );
  };

  const setMouseUpHandler = (raster, index) => async (e) => {
    if (!raster.dragging) return;
    clearTimeout(raster.dragging);
    delete raster.dragging;

    raster.shadowColor = null;

    raster.util.goto(raster.position.x - paperCore.view.center.x, paperCore.view.center.y - raster.position.y);
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
      shadowColor: new paperCore.Color(0, 0, 0, 0.2),
      shadowBlur: 8,
    });
  };

  if (canvas) {
    paperCore.view.viewSize = viewSize;
    paperCore.view.zoom = zoomRatio;

    if (playing) {
      const spriteLayer = paperCore.project.layers['sprite'];
      spriteLayer.onMouseDown = false;
      if (!currentRuntime) {
        // start
        const code = generate(fileList);
        setCurrentRuntime(new Runtime(code, onRequestStop));
      }
    } else {
      if (currentRuntime) {
        // stop
        currentRuntime.stop();
        setCurrentRuntime(false);
      } else {
        const stageLayer = paperCore.project.layers['stage'];
        const spriteLayer = paperCore.project.layers['sprite'];

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

        // edit
        fileList.forEach(async (target, index) => {
          const isStage = index === 0;
          const layer = isStage ? stageLayer : spriteLayer;
          const assets = assetList.filter((asset) => target.assets.includes(asset.id));

          let raster = layer.children[target.id];
          if (!raster) {
            raster = new paperCore.Raster();
            raster.name = target.id;
            raster.data = { assets, zoomRatio };
            raster.util = createUtil(raster, isStage);
            raster.util.on('update', () => updateTargetFromRaster(raster, isStage));
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

        // remove deleted sprties
        spriteLayer.children.forEach((child) => {
          if (child instanceof paperCore.Path) return;
          if (fileList.find((file) => file.id === child.name)) return;
          if (child.util.contour) {
            child.util.contour.remove();
          }
          child.remove();
        });
      }
    }
  }

  const handleSetup = (canvas) => {
    setCanvas(canvas);
    const stageLayer = new paperCore.Layer();
    const spriteLayer = new paperCore.Layer();
    stageLayer.name = 'stage';
    spriteLayer.name = 'sprite';
  };

  return (
    <BlocksPlayer
      width={`${viewSize.width}px`}
      height={`${viewSize.height}px`}
      onSetup={handleSetup}
      onClick={() => globalThis.document.querySelectorAll('input:focus').forEach((e) => e.blur())}
    />
  );
}
