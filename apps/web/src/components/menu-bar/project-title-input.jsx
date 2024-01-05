import { useLocale, useEditor } from '@blockcode/core';
import { BufferedInput } from '@blockcode/ui';

import styles from './menu-bar.module.css';

export default function ProjectTitleInput({ placeholder, defaultValue }) {
  const { name, setProjectName } = useEditor();

  const handleChange = (value) => {
    if (value !== name) {
      setProjectName(value);
    }
  };

  return (
    <>
      <div className={styles.divider} />
      <div className={styles.menuBarItem}>
        <BufferedInput
          className={styles.titleField}
          placeholder={placeholder}
          value={name || defaultValue}
          onSubmit={handleChange}
        />
      </div>
    </>
  );
}
