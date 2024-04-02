import { useEffect, useRef, useState } from 'preact/hooks';
import { classNames, Text, BufferedInput, Button, Modal } from '@blockcode/ui';

import styles from './prompt.module.css';

export default function Prompt({ title, label, content, inputMode, defaultValue, onClose, onSubmit }) {
  const ref = useRef();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = () => {
    onSubmit(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') {
      onSubmit(ref.current && ref.current.base.value);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.base.focus();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref]);

  return (
    <Modal
      title={title}
      className={content ? styles.promptWideModal : styles.promptModal}
      onClose={onClose}
    >
      <div className={styles.promptContent}>
        {label && <div className={classNames(styles.label, { [styles.inputLabel]: inputMode })}>{label}</div>}

        {inputMode && (
          <BufferedInput
            autoFocus
            forceFocus
            ref={ref}
            className={styles.nameTextInput}
            defaultValue={defaultValue}
            onSubmit={setValue}
          />
        )}

        {content && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }}
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
