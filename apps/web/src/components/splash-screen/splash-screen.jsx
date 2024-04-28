import { Text, Spinner } from '@blockcode/ui';
import styles from './splash-screen.module.css';

export default function SplashScreen() {
  return (
    <div className={styles.splashScreen}>
      <Spinner
        large
        level="info"
      />
      <div className={styles.label}>
        <Text
          id="gui.splashScreen.loadingProject"
          defaultMessage="Loading project"
        />
      </div>
    </div>
  );
}
