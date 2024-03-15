import { useState } from 'preact/hooks';
import { classNames, Button } from '@blockcode/ui';
import styles from './getting-started.module.css';

export default function GettingStarted({ coverpages, className }) {
  const [index, setIndex] = useState(0);

  return (
    <div className={classNames(styles.coverWrapper, className)}>
      {coverpages.map((cover, index) => (
        <div
          key={index}
          className={styles.cover}
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
