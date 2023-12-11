import classNames from 'classnames';
import { useLocale } from '@blockcode/core';
import { BlocksEditor as Editor } from '@blockcode/blocks-editor';
import styles from './blocks-editor.module.css';
import iconAddExtension from './icon-add-extension.svg';

export default function BlocksEditor({ toolbox }) {
  const { getText } = useLocale();
  return (
    <div className={styles.editorWrapper}>
      <Editor
        toolbox={toolbox}
        media="/assets/blocks-media/"
      />
      <div className={classNames('scratchCategoryMenu', styles.extensionButton)}>
        <button
          className={styles.button}
          title={getText('blocks.extensions.addExtension', 'Add Extension')}
        >
          <img
            className={styles.buttonIcon}
            src={iconAddExtension}
            alt="Add"
          />
        </button>
      </div>
    </div>
  );
}
