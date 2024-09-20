import { useEffect, useRef, useState } from 'preact/hooks';
import { useLocale } from '@blockcode/core';
import { classNames, Text, BufferedInput, Button, Modal } from '@blockcode/ui';

import styles from './prompt.module.css';

export default function Prompt({ title, label, content, inputMode, placeholder, defaultValue, onClose, onSubmit }) {
  const ref = useRef();
  const { maybeLocaleText } = useLocale();
  const [value, setValue] = useState(defaultValue);

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === 'Escape' || e.key === 'Enter') onClose();
  };

  const handleSubmit = (val, e) => {
    setValue(val);
    if (e.key === 'Enter') {
      e.stopPropagation();
      if (onSubmit) {
        onSubmit(val);
      } else {
        onClose();
      }
    }
  };

  useEffect(() => {
    if (Array.isArray(inputMode)) {
      setValue(Object.fromEntries(inputMode.map((item) => [item.name, item.defaultValue])));
    } else {
      setValue(defaultValue);
    }
  }, [inputMode, defaultValue]);

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

        {Array.isArray(inputMode)
          ? inputMode.map((inputItem, index) => (
              <BufferedInput
                key={index}
                ref={index === 0 && ref}
                autoFocus={index === 0}
                className={styles.nameTextInput}
                placeholder={maybeLocaleText(inputItem.placeholder)}
                defaultValue={inputItem.defaultValue}
                onSubmit={(val) => {
                  value[inputItem.name] = val;
                  setValue(value);
                }}
              />
            ))
          : inputMode && (
              <BufferedInput
                autoFocus
                forceFocus
                ref={ref}
                placeholder={maybeLocaleText(placeholder)}
                className={styles.nameTextInput}
                defaultValue={defaultValue}
                onSubmit={handleSubmit}
              />
            )}

        {content && (
          <div
            className={styles.content}
            // dangerouslySetInnerHTML={{ __html: maybeLocaleText(content) }}
          >
            {content}
          </div>
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
              onClick={() => onSubmit(value)}
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
