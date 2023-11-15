import { useRef, useEffect, useState } from 'preact/hooks';
import { useEdit } from '@blockcode/core';
import createEditor from './create-monaco';

import styles from './code-editor.module.css';
import { monaco } from '.';

const extname = (filename) => filename.split('.').at(-1);

const setModel = (editor, changeContent, file = { content: '', name: '' }) => {
  const model = monaco.editor.createModel(file.content, undefined, monaco.Uri.file(file.name));
  const oldModel = editor.getModel();
  model.onDidChangeContent(() => changeContent(model.getValue()));
  editor.setModel(model);
  oldModel.dispose();
};

export function CodeEditor() {
  const ref = useRef(null);

  const [filesCount, setFilesCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentExtname, setCurrentExtname] = useState('');

  const { fileList, selectedIndex, changeContent } = useEdit();
  const file = selectedIndex >= 0 && fileList[selectedIndex];

  if (ref.editor && file) {
    if (extname(file.name) !== currentExtname) {
      setCurrentExtname(extname(file.name));
      setModel(ref.editor, changeContent, file);
    }

    if (currentIndex !== selectedIndex || fileList.length !== filesCount) {
      setFilesCount(fileList.length);
      setCurrentIndex(selectedIndex);
      ref.editor.getModel().setValue(file.content);
      ref.editor.updateOptions({ readOnly: file.readOnly });
    }
  }

  useEffect(async () => {
    if (ref.current) {
      ref.editor = await createEditor(ref.current);
      if (file) {
        setFilesCount(fileList.length);
        setCurrentIndex(selectedIndex);
        setCurrentExtname(extname(file.name));
        ref.editor.updateOptions({ readOnly: file.readOnly });
      }
      setModel(ref.editor, changeContent, file);
    }
    return () => {
      if (ref.editor) {
        ref.editor.dispose();
        ref.editor = null;
      }
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={styles.editorWrapper}
    ></div>
  );
}
