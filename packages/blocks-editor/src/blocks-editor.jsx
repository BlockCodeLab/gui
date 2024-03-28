import { useState, useRef, useEffect } from 'preact/hooks';
import { useLocale } from '@blockcode/core';
import ScratchBlocks from './scratch-blocks';
import makeToolboxXML from './lib/make-toolbox-xml';
import unifyLocale from './lib/unify-locale';
import styles from './blocks-editor.module.css';

const BLOCKS_DEFAULT_SCALE = 0.7;

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
  ScratchBlocks.Events.COMMENT_CHANGE,
  ScratchBlocks.Events.COMMENT_CREATE,
  ScratchBlocks.Events.COMMENT_DELETE,
  ScratchBlocks.Events.COMMENT_MOVE,
  ScratchBlocks.Events.VAR_CREATE,
  ScratchBlocks.Events.VAR_DELETE,
  ScratchBlocks.Events.VAR_RENAME,
]);

const makeXml = (toolbox) => `<xml style="display: none">\n${toolbox}\n</xml>`;

export function BlocksEditor({ toolbox, messages, xml, variables, onWorkspaceCreated, onChange }) {
  const ref = useRef(null);
  const { language } = useLocale();
  const [currentXml, setCurrentXml] = useState();
  const [currentToolbox, setCurrentToolbox] = useState();

  const locale = unifyLocale(language);
  if (ScratchBlocks.ScratchMsgs.currentLocale_ !== locale) {
    ScratchBlocks.ScratchMsgs.setLocale(locale);
  }

  let needUpdateToolbox = false;
  Object.entries(messages).forEach(([key, value]) => {
    needUpdateToolbox = needUpdateToolbox || ScratchBlocks.Msg[key] !== value;
    ScratchBlocks.Msg[key] = value;
  });

  toolbox = toolbox || makeToolboxXML();
  if (typeof toolbox === 'function') {
    toolbox = toolbox();
  }

  const loadXmlToWorkspace = (force) => {
    if (xml === currentXml && !force) return;
    setCurrentXml(xml);

    let xmlDom = xml || '';
    if (typeof xmlDom === 'string') {
      xmlDom = ScratchBlocks.Xml.textToDom(xmlDom);
    }
    ScratchBlocks.Xml.clearWorkspaceAndLoadFromXml(xmlDom, ref.workspace);

    // include global variables
    if (variables) {
      const varDom = ScratchBlocks.Xml.variablesToDom(variables);
      ScratchBlocks.Xml.domToVariables(varDom, ref.workspace);
    }

    if (!force) {
      ref.workspace.clearUndo();
    }
  };

  const updateToolbox = (force) => {
    if (toolbox === currentToolbox && !force) return;
    setCurrentToolbox(toolbox);

    const categoryId = ref.workspace.toolbox_.getSelectedCategoryId();
    const offset = ref.workspace.toolbox_.getCategoryScrollOffset();
    ref.workspace.getFlyout().setRecyclingEnabled(false);
    ScratchBlocks.DropDownDiv.hideWithoutAnimation();

    setTimeout(() => {
      ref.workspace.updateToolbox(makeXml(toolbox));
      loadXmlToWorkspace(true);

      const currentCategoryPos = ref.workspace.toolbox_.getCategoryPositionById(categoryId);
      const currentCategoryLen = ref.workspace.toolbox_.getCategoryLengthById(categoryId);
      if (offset < currentCategoryLen) {
        ref.workspace.toolbox_.setFlyoutScrollPos(currentCategoryPos + offset);
      } else {
        ref.workspace.toolbox_.setFlyoutScrollPos(currentCategoryPos);
      }
      ref.workspace.getFlyout().setRecyclingEnabled(true);
    });
  };

  const handleChange = () => {
    if (ref.workspace) {
      const xmlDom = ScratchBlocks.Xml.workspaceToDom(ref.workspace);
      // exclude broadcast messages variables
      const newXml = ScratchBlocks.Xml.domToText(xmlDom).replace(
        /<variable type="broadcast_msg"[^>]+>[^<]+<\/variable>/gi,
        '',
      );
      if (newXml !== currentXml) {
        setCurrentXml(newXml);
        if (onChange) {
          onChange(newXml, ref.workspace);
        }
      }
    }
  };

  if (ref.workspace) {
    loadXmlToWorkspace();
    updateToolbox(needUpdateToolbox);
    if (!xml) handleChange();
  }

  useEffect(() => {
    if (ref.current) {
      ref.workspace = ScratchBlocks.inject(
        ref.current,
        Object.assign({}, BLOCKS_DEFAULT_OPTIONS, {
          toolbox: makeXml(toolbox),
          media: './assets/blocks-media/',
        }),
      );
      if (onWorkspaceCreated) {
        onWorkspaceCreated(ref.workspace);
      }
      ref.workspace.addChangeListener((e) => {
        if (ref.workspace.isDragging()) return; // Don't update while changes are happening.
        if (!supportedEvents.has(e.type)) return;
        handleChange();
      });
      ref.resizeObserver = new ResizeObserver(() => ScratchBlocks.svgResize(ref.workspace));
      ref.resizeObserver.observe(ref.current);
      if (!xml) handleChange();
    }
    return () => {
      if (ref.workspace) {
        ref.workspace.dispose();
      }
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={styles.editorWorkspace}
    />
  );
}
