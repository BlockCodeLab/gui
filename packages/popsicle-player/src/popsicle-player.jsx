import paperCore from 'paper/dist/paper-core';
import { useRef, useEffect, useState } from 'preact/hooks';
import { useEditor } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks-editor';
import javascriptGenerator from './generators/javascript';

import Runtime from './runtime/runtime';
import createUtil from './runtime/target-util';
import RotationStyle from './lib/rotation-style';

const supportedEvents = new Set([
  ScratchBlocks.Events.BLOCK_CHANGE,
  ScratchBlocks.Events.BLOCK_CREATE,
  ScratchBlocks.Events.BLOCK_DELETE,
  ScratchBlocks.Events.BLOCK_MOVE,
  ScratchBlocks.Events.COMMENT_CHANGE,
  ScratchBlocks.Events.COMMENT_CREATE,
  ScratchBlocks.Events.COMMENT_DELETE,
  ScratchBlocks.Events.COMMENT_MOVE,
  ScratchBlocks.Events.VAR_CREATE,
  ScratchBlocks.Events.VAR_DELETE,
  ScratchBlocks.Events.VAR_RENAME,
]);

export function PopsiclePlayer({ stageSize, playing, onRequestStop }) {
  const ref = useRef(null);
  const [currentXml, setCurrentXml] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [currentRuntime, setCurrentRuntime] = useState(false);
  const { fileList, assetList, selectedIndex, openFile, modifyFile } = useEditor();

  const zoomRatio = stageSize === 'small' ? 1 : 1.5;
  const viewSize = new paperCore.Size(Runtime.VIEW_WIDTH * zoomRatio, Runtime.VIEW_HEIGHT * zoomRatio);

  const setMouseUpHandler = (raster, index) => (e) => {
    if (!raster.dragging) return;

    if (
      Math.abs(e.point.x - paperCore.view.center.x) <= Runtime.VIEW_WIDTH / 2 &&
      Math.abs(e.point.y - paperCore.view.center.y) <= Runtime.VIEW_HEIGHT / 2
    ) {
      modifyFile({
        id: raster.name,
        x: raster.position.x - paperCore.view.center.x,
        y: paperCore.view.center.y - raster.position.y,
      });
    } else {
      raster.position = new paperCore.Point(
        paperCore.view.center.x + raster.data.x,
        paperCore.view.center.y - raster.data.y
      );
    }
    raster.shadowColor = null;

    clearTimeout(raster.dragging);
    delete raster.dragging;

    openFile(index);
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

  const updateTargetFromRaster = (raster, isStage) => {
    if (raster) {
      modifyFile(
        Object.assign(
          {
            id: raster.name,
            [raster.util.assetName]: raster.data.assetIndex,
          },
          isStage
            ? {}
            : {
                x: raster.data.x,
                y: raster.data.y,
                size: raster.data.size,
                direction: raster.data.direction,
                rotationStyle: raster.data.rotationStyle,
                hidden: !raster.visible,
              }
        )
      );
    }
  };

  const updateAllTargets = () => {
    const stageLayer = paperCore.project.layers['stage'];
    const spriteLayer = paperCore.project.layers['sprite'];
    fileList.forEach((target, index) => {
      const isStage = index === 0;
      const layer = isStage ? stageLayer : spriteLayer;
      const raster = layer.children[target.id];
      updateTargetFromRaster(raster, isStage);
    });
  };

  if (ref.current) {
    paperCore.view.viewSize = viewSize;
    paperCore.view.zoom = zoomRatio;

    if (playing) {
      const spriteLayer = paperCore.project.layers['sprite'];
      spriteLayer.onMouseDown = false;
      if (!currentRuntime) {
        // start
        const runtime = new Runtime(fileList, onRequestStop);
        runtime.on('frame', updateAllTargets);
        setCurrentRuntime(runtime);
      }
    } else {
      if (currentRuntime) {
        // stop
        currentRuntime.stop();
        setCurrentRuntime(false);
        updateAllTargets();
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
            layer.addChild(raster);
          }
          raster.data = { assets };

          raster.util = createUtil(raster, isStage);
          if (isStage) {
            raster.util.backdrop = target.backdrop;
          } else {
            raster.onMouseUp = setMouseUpHandler(raster, index);
            raster.data.x = target.x;
            raster.data.y = target.y;
            raster.data.size = target.size;
            raster.data.hidden = target.hidden;
            raster.data.direction = target.direction;
            raster.data.rotationStyle = target.rotationStyle;
            raster.util.costume = target.costume;
          }
        });

        // remove deleted sprties
        spriteLayer.children.forEach((child) => {
          if (fileList.find((file) => file.id === child.name)) return;
          child.remove();
        });
      }
    }
  }

  useEffect(() => {
    if (ref.current) {
      paperCore.setup(ref.current);

      const stageLayer = new paperCore.Layer();
      const spriteLayer = new paperCore.Layer();
      stageLayer.name = 'stage';
      spriteLayer.name = 'sprite';

      const redraw = async (raster, isStage = false) => {
        if (isStage) {
          raster.position = paperCore.view.center;
          return;
        }

        raster.visible = !raster.data.hidden;
        if (raster.data.hidden) {
          return;
        }

        const position = raster.position;
        raster.transform(raster.matrix.reset());
        raster.scale(raster.util.size / 100);

        if (raster.data.rotationStyle === RotationStyle.ALL_AROUND) {
          raster.rotate(raster.util.direction - Runtime.DEFAULT_DIRECTION);
        } else if (raster.data.rotationStyle === RotationStyle.HORIZONTAL_FLIP) {
          if (raster.util.direction > 180 && raster.util.direction < 360) {
            raster.scale(-1, 1);
          }
        }

        if (raster.dragging) {
          raster.position = position;
        } else {
          raster.position = new paperCore.Point(
            paperCore.view.center.x + raster.data.x,
            paperCore.view.center.y - raster.data.y
          );
        }
      };
      paperCore.view.onFrame = () => {
        stageLayer.children.forEach((raster) => redraw(raster, true));
        spriteLayer.children.forEach((raster) => redraw(raster));
      };

      let workspace;
      const checkWorkspace = () => {
        workspace = ScratchBlocks.getMainWorkspace();
        if (workspace) {
          workspace.addChangeListener((e) => {
            if (workspace.isDragging()) return; // Don't update while changes are happening.
            if (!supportedEvents.has(e.type)) return;

            const xmlDom = ScratchBlocks.Xml.workspaceToDom(workspace);
            // exclude broadcast messages variables
            const xml = ScratchBlocks.Xml.domToText(xmlDom).replace(
              /<variable type="broadcast_msg"[^>]+>[^<]+<\/variable>/gi,
              ''
            );
            if (xml !== currentXml || selectedIndex !== currentIndex) {
              modifyFile({
                script: javascriptGenerator.workspaceToCode(workspace),
              });
              if (xml !== currentXml) {
                setCurrentXml(xml);
              }
              if (selectedIndex !== currentIndex) {
                setCurrentIndex(selectedIndex);
              }
            }
          });
          return;
        }
        setTimeout(checkWorkspace);
      };
      checkWorkspace();
    }
    return () => {
      paperCore.project.clear();
      paperCore.project.remove();
    };
  }, [ref]);

  return (
    <canvas
      ref={ref}
      style={{
        width: `${viewSize.width}px`,
        height: `${viewSize.height}px`,
        imageRendering: 'pixelated',
      }}
      onClick={() => globalThis.document.querySelectorAll('input:focus').forEach((e) => e.blur())}
    />
  );
}
