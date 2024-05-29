import { useEditor, useLocale, exportFile } from '@blockcode/core';
import { IconSelector, ActionButton } from '@blockcode/ui';
import FileInfo from '../file-info/file-info';

import styles from './file-selector.module.css';

import newIcon from './icon-new.svg';
import fileUploadIcon from './icon-file-upload.svg';
import newCodeIcon from './icon-new-code.svg';
import newJSONIcon from './icon-new-json.svg';

import binaryIcon from './type-icons/icon-binary.svg';
import csvIcon from './type-icons/icon-csv.svg';
import iniIcon from './type-icons/icon-ini.svg';
import jsonIcon from './type-icons/icon-json.svg';
import markdownIcon from './type-icons/icon-markdown.svg';
import micropythonIcon from './type-icons/icon-micropython.svg';
import textIcon from './type-icons/icon-text.svg';
import imageIcon from './type-icons/icon-image.svg';
import svgIcon from './type-icons/icon-svg.svg';

const getSizeText = (size) => {
  if (size > 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)}MB`;
  if (size > 1024) return `${(size / 1024).toFixed(2)}KB`;
  return `${size}B`;
};

const getFileType = (name) => {
  if (name.endsWith('.csv')) return csvIcon;
  if (name.endsWith('.ini')) return iniIcon;
  if (name.endsWith('.json')) return jsonIcon;
  if (name.endsWith('.md')) return markdownIcon;
  if (name.endsWith('.py')) return micropythonIcon;
  if (name.endsWith('.txt')) return textIcon;
  if (name.endsWith('.svg')) return svgIcon;
  if (/$.*\.(png|jpg|jpeg|gif|bmp)$/.test(name)) return imageIcon;
  return binaryIcon;
};

export default function FileSelector() {
  const { getText } = useLocale();
  const { fileList, selectedIndex, addFile, openFile, deleteFile } = useEditor();

  const handleFileChange = async ({ target }) => {
    for (const file of target.files) {
      addFile({
        name: file.name,
        ...(/^(text|image\/svg).*$/i.test(file.type)
          ? { content: await file.text() }
          : {
              content: `------------------------------
${getText('micropython.fileInfo.title', 'File Info')}
------------------------------
${getText('micropython.fileInfo.name', 'File')}: ${file.name}
${getText('micropython.fileInfo.type', 'Type')}: ${file.type}
${getText('micropython.fileInfo.size', 'Size')}: ${getSizeText(file.size)}
${getText('micropython.fileInfo.modified', 'Modified')}: ${new Date(file.lastModified).toLocaleString()}`,
              buffer: await file.arrayBuffer(),
              readOnly: true,
            }),
      });
    }
  };

  return (
    <div className={styles.fileSelectorWrapper}>
      <FileInfo />

      <IconSelector
        items={fileList.map((file, index) => ({
          ...file,
          icon: getFileType(file.name),
          order: file.order || index,
          contextMenu: [
            [
              {
                label: getText('micropython.contextMenu.duplicate', 'duplicate'),
                onClick: () => addFile({ ...file, name: `${file.name.split('.')[0]}-${fileList.length + 1}.py` }),
              },
              {
                label: getText('micropython.contextMenu.export', 'export'),
                onClick: () => exportFile(file.content, file.name),
              },
            ],
            [
              {
                label: getText('micropython.contextMenu.delete', 'delete'),
                className: styles.deleteMenuItem,
                onClick: () => deleteFile(index),
              },
            ],
          ],
        }))}
        selectedIndex={selectedIndex}
        onSelect={openFile}
        onDelete={deleteFile}
      />

      <ActionButton
        className={styles.addButton}
        icon={newIcon}
        tooltip={getText('micropython.actionButton.newCode', 'Create new Code')}
        onClick={() => addFile({ name: `code-${fileList.length + 1}.py`, content: '' })}
        moreButtons={[
          {
            icon: fileUploadIcon,
            tooltip: getText('micropython.actionButton.upload', 'Upload File'),
            fileAccept: 'image/*,audio/*,video/*,text/*',
            fileMultiple: true,
            onFileChange: handleFileChange,
          },
          {
            icon: newJSONIcon,
            tooltip: getText('micropython.actionButton.newJSON', 'Create new JSON'),
            onClick: () => addFile({ name: `text-${fileList.length + 1}.json`, content: '{\n    \n}' }),
          },
          {
            icon: newCodeIcon,
            tooltip: getText('micropython.actionButton.newCode', 'Create new Code'),
            onClick: () => addFile({ name: `code-${fileList.length + 1}.py`, content: '' }),
          },
        ]}
      />
    </div>
  );
}
