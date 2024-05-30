import { useLayout } from '@blockcode/core';
import { classNames, Text } from '@blockcode/ui';

import styles from './menu-bar.module.css';
import coursesIcon from './icons/icon-courses.svg';
import tutorialsIcon from './icons/icon-tutorials.svg';

export default function TutorialsButton({ onClick }) {
  const { tutorials } = useLayout();

  return (
    <>
      <div className={styles.divider} />
      <div
        className={classNames(styles.menuBarItem, styles.menuLabel, styles.hoverable)}
        onClick={onClick}
      >
        {tutorials?.type === 'course' ? (
          <>
            <img
              className={styles.tutorialsIcon}
              src={coursesIcon}
            />
            <Text
              id="gui.menuBar.courses"
              defaultMessage="Courses"
            />
          </>
        ) : (
          <>
            <img
              className={styles.tutorialsIcon}
              src={tutorialsIcon}
            />
            <Text
              id="gui.menuBar.tutorials"
              defaultMessage="Tutorials"
            />
          </>
        )}
      </div>
    </>
  );
}
