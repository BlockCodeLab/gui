import { useEffect, useRef, useState } from 'preact/hooks';
import { classNames, Text, BufferedInput, Button, Modal } from '@blockcode/ui';

import styles from './prompt.module.css';

export default function Prompt({ title, label, inputMode, defaultValue, onClose, onSubmit }) {
  const ref = useRef();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = () => {
    onSubmit(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') {
      onSubmit(ref.current.base.value, options);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.base.focus();
    }
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref]);

  return (
    <Modal
      title={title}
      className={styles.promptModal}
      onClose={onClose}
    >
      <div className={styles.promptContent}>
        <div className={classNames(styles.label, { [styles.inputLabel]: inputMode })}>{label}</div>
        {inputMode && (
          <BufferedInput
            autoFocus
            forceFocus
            ref={ref}
            className={styles.nameTextInput}
            defaultValue={value}
            name={label}
            onSubmit={setValue}
          />
        )}

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
              onClick={handleSubmit}
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
