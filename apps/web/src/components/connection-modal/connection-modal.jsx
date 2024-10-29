import { useState } from 'preact/hooks';
import { useLocale } from '@blockcode/core';
import { classNames, Text, Button, Modal } from '@blockcode/ui';

import styles from './connection-modal.module.css';
import searchingImage from './searching.png';

export default function ConnectionModal({ title, label, icon, devices, onClose, onSearch, onConnect }) {
  const { getText } = useLocale();

  const [selectedId, setSelectedId] = useState('');

  const handleConnect = () => {
    if (!selectedId) return;
    onConnect(selectedId);
    setSelectedId('');
  };

  return (
    <Modal
      title={title ?? getText('gui.connection.device', 'Device')}
      className={styles.promptModal}
      headerClassName={styles.header}
      onClose={onClose}
    >
      <div className={styles.promptContent}>
        <div className={styles.deviceList}>
          {Array.isArray(devices) && devices.length > 0 ? (
            devices.map((device) => (
              <div
                className={classNames(styles.deviceItem, {
                  [styles.selected]: device.id === selectedId,
                })}
                onClick={() => setSelectedId(device.id)}
              >
                <div className={styles.deviceNameBar}>
                  {icon && <img />}
                  <div className={styles.deviceNameWrapper}>
                    <div className={styles.deviceNameLabel}>
                      <Text
                        id="gui.connection.deviceName"
                        defaultMessage="Device name"
                      />
                    </div>
                    <div className={styles.deviceNameText}>{device.name}</div>
                  </div>
                </div>
                {device.rssi && <div className={styles.deviceSignalBar}></div>}
              </div>
            ))
          ) : (
            <div className={styles.deviceSearch}>
              <img
                className={classNames(styles.deviceSearchIcon, {
                  [styles.deviceSearchingIcon]: Array.isArray(devices),
                })}
                src={searchingImage}
              />
            </div>
          )}
        </div>

        <div className={styles.buttonRow}>
          {devices === true ? (
            <Button
              className={classNames(styles.button, styles.okButton)}
              onClick={() => onSearch()}
            >
              <Text
                id="gui.connection.search"
                defaultMessage="Start Searching"
              />
            </Button>
          ) : (
            <Button
              disabled={!selectedId}
              className={classNames(styles.button, styles.okButton)}
              onClick={handleConnect}
            >
              {!selectedId ? (
                <Text
                  id="gui.connection.searching"
                  defaultMessage="Searching"
                />
              ) : (
                <Text
                  id="gui.connection.connect"
                  defaultMessage="Start Connecting"
                />
              )}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
