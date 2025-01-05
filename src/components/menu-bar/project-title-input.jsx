import { useProjectContext, BufferedInput } from '@blockcode/core';
import styles from './menu-bar.module.css';

export function ProjectTitleInput({ placeholder, defaultValue }) {
  const { name } = useProjectContext();
  return (
    <>
      <div className={styles.divider} />
      <div className={styles.menuBarItem}>
        <BufferedInput
          className={styles.titleField}
          placeholder={placeholder}
          value={name.value || defaultValue}
          onSubmit={(val) => (name.value = val)}
        />
      </div>
    </>
  );
}
