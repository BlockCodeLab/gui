import { useRef, useEffect, useState } from 'preact/hooks';
import { classNames, Text, Button, Modal, BufferedInput } from '@blockcode/ui';

import styles from './data-prompt.module.css';

export default function DataPrompt({
  title,
  label,
  defaultValue,
  enableLocalVariable,
  showListMessage,
  showVariableOptions,
  showCloudOption,
  onClose,
  onSubmit,
}) {
  const [value, setValue] = useState(defaultValue);
  const [options, setOptions] = useState({
    scope: 'global',
    isCloud: false,
  });

  const handleSubmit = () => {
    onSubmit(value, options);
  };

  return (
    <Modal
      title={title}
      className={styles.promptModal}
      onClose={onClose}
    >
      <div className={styles.promptContent}>
        <div className={styles.label}>{label}</div>
        <BufferedInput
          autoFocus
          className={styles.variableNameTextInput}
          defaultValue={value}
          name={label}
          onSubmit={setValue}
        />
        {showVariableOptions && (
          <div>
            {enableLocalVariable ? (
              <div className={styles.options}>
                <label>
                  <input
                    checked={options.scope === 'global'}
                    name="variableScopeOption"
                    type="radio"
                    value="global"
                    onChange={() => setOptions({ ...options, scope: 'global' })}
                  />
                  <Text
                    id="blocks.dataPrompt.forAllTargets"
                    defaultValue="For all targets"
                  />
                </label>
                <label>
                  <input
                    checked={options.scope === 'local'}
                    name="variableScopeOption"
                    type="radio"
                    value="local"
                    onChange={() => setOptions({ ...options, scope: 'local' })}
                  />
                  <Text
                    id="blocks.dataPrompt.forThisTarget"
                    defaultValue="For this target only"
                  />
                </label>
              </div>
            ) : (
              <div className={styles.infoMessage}>
                {showListMessage ? (
                  <Text
                    id={'blocks.dataPrompt.listAvailableToAllTargets'}
                    defaultValue="This list will be available to all targets."
                  />
                ) : (
                  <Text
                    id={'blocks.dataPrompt.availableToAllTargets'}
                    defaultValue="This variable will be available to all targets."
                  />
                )}
              </div>
            )}
          </div>
        )}

        <div className={styles.buttonRow}>
          <Button
            className={styles.button}
            onClick={onClose}
          >
            <Text
              id="blocks.dataPrompt.cancel"
              defaultValue="Cancel"
            />
          </Button>
          <Button
            className={classNames(styles.button, styles.okButton)}
            onClick={handleSubmit}
          >
            <Text
              id="blocks.dataPrompt.ok"
              defaultValue="OK"
            />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
