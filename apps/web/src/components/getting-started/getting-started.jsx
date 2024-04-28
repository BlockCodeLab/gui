import { useState } from 'preact/hooks';
import { classNames, Button } from '@blockcode/ui';
import styles from './getting-started.module.css';

export default function GettingStarted({ coverpages, className }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  setTimeout(() => setCurrentIndex((currentIndex + 1) % coverpages.length), 7000);

  return (
    <div className={classNames(styles.coverWrapper, className)}>
      {coverpages.map((cover, index) => (
        <div
          key={index}
          className={classNames(styles.cover, {
            [styles.hidden]: index !== currentIndex,
          })}
          style={{ backgroundImage: `url(${cover.backgroundImage})` }}
        >
          <div>
            <div className={styles.title}>{cover.title}</div>
            <Button
              className={styles.button}
              onClick={cover.onClick}
            >
              {cover.buttonText}
            </Button>
          </div>
          <img
            className={styles.feature}
            src={cover.featureImage}
          />
        </div>
      ))}
    </div>
  );
}
