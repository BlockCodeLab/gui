import { classNames, Text, Spinner } from '@blockcode/ui';
import styles from './splash-screen.module.css';

export default function SplashScreen({ error }) {
  return (
    <div className={classNames(styles.splashScreen, { [styles.error]: error })}>
      {!error && (
        <Spinner
          large
          level="info"
          className={styles.spinner}
        />
      )}
      <div className={styles.title}>
        {error ? (
          <Text
            id="gui.splashScreen.errorTitle"
            defaultMessage="Error occurred"
          />
        ) : (
          <Text
            id="gui.splashScreen.loadingTitle"
            defaultMessage="Loading project..."
          />
        )}
      </div>
      <div className={styles.label}>
        {error && (
          <Text
            id="gui.splashScreen.errorLabel"
            defaultMessage="Please refresh the page and reopen it."
          />
        )}
      </div>
    </div>
  );
}
