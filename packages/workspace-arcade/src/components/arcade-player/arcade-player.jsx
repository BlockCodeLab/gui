import { useState } from 'preact/hooks';
import { useEditor } from '@blockcode/core';
import { BlocksPlayer, paperCore } from '@blockcode/blocks-player';

import Runtime from './runtime';
import generate from './generate';
import createUtil from './target-util';

export default function ArcadePlayer({ stageSize, playing, onRequestStop }) {
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
              frame: raster.util.backdrop - 1,
            }
          : {
              frame: raster.util.costume - 1,
              x: raster.util.x,
              y: raster.util.y,
              size: raster.util.size,
              direction: raster.util.direction,
              rotationStyle: raster.data.rotationStyle,
              hidden: !raster.visible,
            },
      ),
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

    const stageLayer = paperCore.project.layers.stage;
    const spriteLayer = paperCore.project.layers.sprite;
    const contourLayer = paperCore.project.layers.contour;
    const dialogLayer = paperCore.project.layers.dialog;

    if (playing) {
      spriteLayer.onMouseDown = false;
      if (!currentRuntime) {
        // start
        const code = generate(fileList);
        setCurrentRuntime(new Runtime(code, onRequestStop));
      }
    } else {
      if (currentRuntime) {
        // stop
        currentRuntime.stop().then(() => {
          dialogLayer.removeChildren();
          setCurrentRuntime(false);
        });
      } else {
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
            raster = layer.addChild(new paperCore.Raster());
            raster.name = target.id;
            raster.data = { assets };
            raster.util = createUtil(raster, isStage);
            raster.util.on('update', () => updateTargetFromRaster(raster, isStage));
          }
          raster.data.assets = assets;

          if (isStage) {
            raster.util.backdrop = target.frame + 1;
          } else {
            raster.onMouseUp = setMouseUpHandler(raster, index);
            raster.util.costume = target.frame + 1;
            raster.util.x = target.x;
            raster.util.y = target.y;
            raster.util.size = target.size;
            raster.util.hidden = target.hidden;
            raster.util.direction = target.direction;
            raster.data.rotationStyle = target.rotationStyle;
          }
        });

        // remove clones and deleted sprties
        spriteLayer.children.forEach((child) => {
          if (fileList.find((file) => child.name === file.id)) return;
          child.remove();
        });
        // and contours
        contourLayer.children.forEach((child) => {
          if (fileList.find((file) => child.name === file.id)) return;
          child.remove();
        });
      }
    }
  }

  const handleSetup = (canvas) => {
    setCanvas(canvas);
    new paperCore.Layer({ name: 'stage' });
    new paperCore.Layer({ name: 'contour' });
    new paperCore.Layer({ name: 'sprite' });
    new paperCore.Layer({ name: 'dialog' });
    paperCore.project.layers.sprite.activate();
  };

  return (
    <BlocksPlayer
      width={`${viewSize.width}px`}
      height={`${viewSize.height}px`}
      onSetup={handleSetup}
      onClick={() => document.querySelectorAll('input:focus').forEach((e) => e.blur())}
    />
  );
}
