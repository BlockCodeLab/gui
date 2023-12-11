import { useRef, useEffect } from 'preact/hooks';
import { useLocale } from '@blockcode/core';
import ScratchBlocks from './scratch-blocks';
import pythonGenerator from './generators/python';

import unifyLocale from './lib/unify-locale';
import makeToolboxXML from './lib/make-toolbox-xml';

import styles from './blocks-editor.module.css';

const BLOCKS_DEFAULT_SCALE = 0.7;

const BLOCKS_DEFAULT_TOOLBOX = makeToolboxXML();

const BLOCKS_DEFAULT_OPTIONS = {
  zoom: {
    controls: true,
    wheel: true,
    startScale: BLOCKS_DEFAULT_SCALE,
  },
  grid: {
    spacing: 40,
    length: 2,
    colour: '#DDD',
  },
  colours: {
    workspace: '#F9F9F9',
    flyout: '#F9F9F9',
    toolbox: '#FFFFFF',
    toolboxSelected: '#E9EEF2',
    scrollbar: '#CECDCE',
    scrollbarHover: '#CECDCE',
    insertionMarker: '#000000',
    insertionMarkerOpacity: 0.2,
    fieldShadow: 'rgba(255, 255, 255, 0.3)',
    dragShadowOpacity: 0.6,
  },
  comments: true,
  collapse: false,
  sounds: false,
};

const supportedEvents = new Set([
  ScratchBlocks.Events.BLOCK_CHANGE,
  ScratchBlocks.Events.BLOCK_CREATE,
  ScratchBlocks.Events.BLOCK_DELETE,
  ScratchBlocks.Events.BLOCK_MOVE,
]);

const ResizeObserver = globalThis.ResizeObserver;

export function BlocksEditor({ toolbox, media }) {
  const ref = useRef(null);
  const { language } = useLocale();

  ScratchBlocks.ScratchMsgs.setLocale(unifyLocale(language));

  toolbox = toolbox || BLOCKS_DEFAULT_TOOLBOX;
  if (typeof toolbox === 'function') {
    toolbox = toolbox();
  }

  if (ref.workspace) {
    ref.workspace.getFlyout().setRecyclingEnabled(false);
    ref.workspace.updateToolbox(toolbox);
    ref.workspace.getFlyout().setRecyclingEnabled(true);
  }

  useEffect(() => {
    if (ref.current) {
      ref.workspace = ScratchBlocks.inject(
        ref.current,
        Object.assign({}, BLOCKS_DEFAULT_OPTIONS, {
          toolbox,
          media,
        })
      );
      ref.workspace.addChangeListener((e) => {
        if (ref.workspace.isDragging()) return; // Don't update while changes are happening.
        if (!supportedEvents.has(e.type)) return;

        const code = pythonGenerator.workspaceToCode(ref.workspace);
        console.log(code);
      });
      ref.resizeObserver = new ResizeObserver(() => ScratchBlocks.svgResize(ref.workspace));
      ref.resizeObserver.observe(ref.current);
    }
    return () => {};
  }, [ref]);

  return (
    <div
      ref={ref}
      className={styles.editorWorkspace}
    />
  );
}
