import { useCallback, useEffect } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { classNames } from '@blockcode/utils';
import { maybeTranslate, Text, BufferedInput, Button, Modal } from '@blockcode/core';
import styles from './prompt-modal.module.css';

export function InputsPromptModal({ title, inputItems, children, onClose, onSubmit }) {
  const data = useSignal(Object.fromEntries(inputItems.map(({ key, defaultValue }) => [key, defaultValue])));

  const handleKeyDown = useCallback((e) => {
    e.stopPropagation();
    if (e.key === 'Escape') onClose();
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(data.value);
    onClose();
  }, []);

  const wrapInputSubmit = useCallback(
    (key) => (value) => {
      data.value = {
        ...data.value,
        [key]: value,
      };
    },
    [],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Modal
      title={title}
      className={classNames(styles.promptModal, {
        [styles.auto]: children,
      })}
      onClose={onClose}
    >
      <div className={styles.promptContent}>
        {inputItems.map(({ key, label, placeholder, defaultValue }, index) => (
          <>
            {label && <div className={classNames(styles.label, styles.inputLabel)}>{label}</div>}
            <BufferedInput
              key={key}
              autoFocus={index === 0}
              className={styles.textInput}
              placeholder={maybeTranslate(placeholder)}
              defaultValue={defaultValue}
              onSubmit={wrapInputSubmit(key)}
            />
          </>
        ))}

        <div className={styles.content}>{children}</div>

        <div className={styles.buttonRow}>
          <Button
            className={styles.button}
            onClick={onClose}
          >
            <Text
              id="gui.prompt.cancel"
              defaultMessage="Cancel"
            />
          </Button>
          <Button
            className={classNames(styles.button, styles.okButton)}
            onClick={handleSubmit}
          >
            <Text
              id="gui.prompt.ok"
              defaultMessage="OK"
            />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
