import Toolbar from './toolbar';
import FileSelector from '../file-selector/file-selector';

import styles from './sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebarWrapper}>
      <Toolbar />

      <div className={styles.listWrapper}>
        <FileSelector />
      </div>
    </div>
  );
}
