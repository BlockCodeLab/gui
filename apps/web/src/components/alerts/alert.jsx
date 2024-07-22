import { classNames } from '@blockcode/ui';
import styles from './alerts.module.css';

export default function Alert({ mode, icon, message, onOk, onCancel, onClose }) {
  const hasButtons = onOk || onCancel || onClose;
  return (
    <div className={classNames(styles.alertWrapper, styles[mode])}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.message}>{message}</div>
      {hasButtons && <div className={styles.buttons}></div>}
    </div>
  );
}
