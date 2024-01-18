import { useLocale, useEditor } from '@blockcode/core';
import { classNames, Label, BufferedInput, Input } from '@blockcode/ui';

import styles from './file-info.module.css';

const getSizeText = (size) => {
  if (size > 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)}MB`;
  if (size > 1024) return `${(size / 1024).toFixed(2)}KB`;
  return `${size}B`;
};

export default function FileInfo() {
  const { getText } = useLocale();
  const { fileList, selectedIndex, renameFile } = useEditor();

  const file = selectedIndex >= 0 && fileList[selectedIndex];
  const disabled = selectedIndex === -1;

  const handleChangeName = (value) => renameFile(value);

  const name = file ? file.name.slice(0, file.name.lastIndexOf('.')) : '';
  const type = file ? file.name.slice(file.name.lastIndexOf('.') + 1) : '';

  return (
    <div className={styles.fileInfoWrapper}>
      <div className={classNames(styles.row, styles.rowPrimary)}>
        <Label text={getText('micropython.fileInfo.name', 'File')} />
        <BufferedInput
          className={styles.filenameInput}
          disabled={disabled}
          onSubmit={(value) => handleChangeName(`${value}.${type}`)}
          value={name}
        />
      </div>
      <div className={styles.row}>
        <Label
          secondary
          text={getText('micropython.fileInfo.type', 'Type')}
        >
          <BufferedInput
            small
            disabled={disabled || file.readOnly}
            onSubmit={(value) => handleChangeName(`${name}.${value}`)}
            value={type}
          />
        </Label>
        <Label
          secondary
          text={getText('micropython.fileInfo.size', 'Size')}
        >
          <Input
            small
            disabled
            className={styles.filesizeInput}
            value={file ? getSizeText(file.buffer ? file.buffer.byteLength : file.content.length) : ''}
          />
        </Label>
      </div>
    </div>
  );
}
