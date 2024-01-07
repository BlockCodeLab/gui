import paperCore from 'paper/dist/paper-core';
import { useRef, useEffect, useState } from 'preact/hooks';
import { useEditor } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks-editor';

import javascriptGenerator from './generators/javascript';
import Runtime from './runtime/runtime';
import createUtil from './runtime/target-util';

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
    openFile(index);

    raster.util.goto(raster.position.x - paperCore.view.center.x, paperCore.view.center.y - raster.position.y);
    updateTargetFromRaster(raster);
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

  if (ref.current) {
    paperCore.view.viewSize = viewSize;
    paperCore.view.zoom = zoomRatio;

    if (playing) {
      const spriteLayer = paperCore.project.layers['sprite'];
      spriteLayer.onMouseDown = false;
      if (!currentRuntime) {
        // start
        setCurrentRuntime(new Runtime(fileList, onRequestStop));
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
            raster.data = { assets };
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

  useEffect(() => {
    if (ref.current) {
      paperCore.setup(ref.current);

      const stageLayer = new paperCore.Layer();
      const spriteLayer = new paperCore.Layer();
      stageLayer.name = 'stage';
      spriteLayer.name = 'sprite';

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
