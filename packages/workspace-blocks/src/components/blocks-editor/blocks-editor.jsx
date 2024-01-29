import { useState } from 'preact/hooks';
import { useLocale, useEditor } from '@blockcode/core';
import { classNames, ComingSoon } from '@blockcode/ui';
import { BlocksEditor as Editor, ScratchBlocks, makeToolboxXML } from '@blockcode/blocks-editor';
import { pythonGenerator } from '../../generators/python';

import DataPrompt from '../data-prompt/data-prompt';

import styles from './blocks-editor.module.css';
import iconAddExtension from './icon-add-extension.svg';

export default function BlocksEditor({
  toolbox,
  messages,
  xml,
  enableMultiTargets,
  enableLocalVariable,
  disableGenerator,
  disableExtension,
  onChange,
}) {
  const { getText } = useLocale();
  const { fileList, selectedIndex, modifyFile } = useEditor();
  const [workspace, setWorkspace] = useState();
  const [prompt, setPrompt] = useState(false);

  messages = {
    EVENT_WHENPROGRAMSTART: getText('blocks.event.programStart', 'when program start'),
    CONTROL_STOP_OTHER: getText('blocks.control.stopOther', 'other scripts'),
    ...(messages || []),
  };

  ScratchBlocks.prompt = (message, defaultValue, callback, optTitle, optVarType) => {
    const prompt = { callback, message, defaultValue };
    prompt.title = optTitle ? optTitle : ScratchBlocks.Msg.VARIABLE_MODAL_TITLE;
    prompt.varType = typeof optVarType === 'string' ? optVarType : ScratchBlocks.SCALAR_VARIABLE_TYPE;
    prompt.showVariableOptions = // This flag means that we should show variable/list options about scope
      enableMultiTargets &&
      optVarType !== ScratchBlocks.BROADCAST_MESSAGE_VARIABLE_TYPE &&
      prompt.title !== ScratchBlocks.Msg.RENAME_VARIABLE_MODAL_TITLE &&
      prompt.title !== ScratchBlocks.Msg.RENAME_LIST_MODAL_TITLE;
    prompt.showCloudOption = optVarType === ScratchBlocks.SCALAR_VARIABLE_TYPE && this.props.canUseCloud;
    setPrompt(prompt);
  };

  toolbox = toolbox || makeToolboxXML();
  if (!xml && selectedIndex !== -1) {
    const file = fileList[selectedIndex];
    xml = file && file.xml;
  }

  // global variables
  let variables;
  if (workspace) {
    variables = workspace.getAllVariables().filter((variable) => {
      if (variable.isLocal) return false;

      if (variable.type === ScratchBlocks.BROADCAST_MESSAGE_VARIABLE_TYPE) {
        if (variable.name === ScratchBlocks.Msg.DEFAULT_BROADCAST_MESSAGE_NAME) return false;

        const id = variable.id_.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`<field name="BROADCAST_OPTION" id="${id}"[^>]+>[^<]+</field>`, 'g');
        for (const target of fileList) {
          if (re.test(target.xml)) return true;
        }
        return false;
      }

      return true;
    });
  }

  const handleChange =
    onChange ||
    ((xml, workspace) => {
      const modifies = { xml };
      if (!disableGenerator) {
        modifies.content = pythonGenerator.workspaceToCode(workspace);
      }
      modifyFile(modifies);
    });

  const handlePromptSubmit = (input, options) => {
    prompt.callback(input, [], options);
    setPrompt(false);
  };

  const handlePromptClose = () => setPrompt(false);

  return (
    <div className={styles.editorWrapper}>
      <Editor
        toolbox={toolbox}
        messages={messages}
        xml={xml}
        variables={variables}
        onWorkspaceCreated={setWorkspace}
        onChange={selectedIndex !== -1 ? handleChange : null}
      />
      {disableExtension ? null : (
        <div className={classNames('scratchCategoryMenu', styles.extensionButton)}>
          <ComingSoon>
            <button
              className={styles.addButton}
              title={getText('blocks.extensions.addExtension', 'Add Extension')}
            >
              <img
                src={iconAddExtension}
                title="Add Extension"
              />
            </button>
          </ComingSoon>
        </div>
      )}
      {prompt && (
        <DataPrompt
          title={prompt.title}
          label={prompt.message}
          defaultValue={prompt.defaultValue}
          enableLocalVariable={enableLocalVariable}
          showListMessage={prompt.varType === ScratchBlocks.LIST_VARIABLE_TYPE}
          showVariableOptions={prompt.showVariableOptions}
          showCloudOption={prompt.showCloudOption}
          onClose={handlePromptClose}
          onSubmit={handlePromptSubmit}
        />
      )}
    </div>
  );
}
