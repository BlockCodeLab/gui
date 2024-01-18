import { classNames, Text } from '@blockcode/ui';

import styles from './menu-bar.module.css';
import tutorialsIcon from './icon-tutorials.svg';

export default function TutorialsButton() {
  return (
    <>
      <div className={styles.divider} />
      <div className={classNames(styles.menuBarItem, styles.hoverable)}>
        <img
          className={styles.tutorialsIcon}
          src={tutorialsIcon}
        />
        <Text
          id="gui.menuBar.tutorials"
          defaultMessage="Tutorials"
        />
      </div>
    </>
  );
}
