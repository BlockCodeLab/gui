import { useEffect } from 'preact/hooks';
import { classNames, Text, Button, Modal } from '@blockcode/ui';

import styles from './prompt.module.css';

export default function DataPrompt({ title, label, onClose, onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (onSubmit && e.key === 'Enter') onSubmit();
  };

  useEffect(() => {
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Modal
      title={title}
      className={styles.promptModal}
      onClose={onClose}
    >
      <div className={styles.promptContent}>
        <div className={styles.label}>{label}</div>

        <div className={styles.buttonRow}>
          <Button
            className={styles.button}
            onClick={onClose}
          >
            {onSubmit ? (
              <Text
                id="gui.prompt.cancel"
                defaultMessage="Cancel"
              />
            ) : (
              <Text
                id="gui.prompt.close"
                defaultMessage="Close"
              />
            )}
          </Button>
          {onSubmit && (
            <Button
              className={classNames(styles.button, styles.okButton)}
              onClick={onSubmit}
            >
              <Text
                id="gui.prompt.ok"
                defaultMessage="OK"
              />
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
