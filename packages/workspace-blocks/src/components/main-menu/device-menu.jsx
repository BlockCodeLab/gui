import { useState } from 'preact/hooks';
import { useLayout, useEditor } from '@blockcode/core';
import { Text, Spinner, MenuSection, MenuItem } from '@blockcode/ui';
import { connectDevice, disconnectDevice, downloadDevice } from '@blockcode/device-pyboard';
import defaultDeviceFilters from '../../lib/device-filters.yaml';

export default function DeviceMenu({ itemClassName, deviceFilters, onDownload, children }) {
  const [downloadDisabled, setDownloadDisabled] = useState(false);
  const { createAlert, removeAlert } = useLayout();
  const { fileList, assetList, device, setDevice } = useEditor();

  const enableDownload = () => setDownloadDisabled(false);
  const disableDownload = () => setDownloadDisabled(true);

  const downloadingAlert = (progress) => {
    if (!downloadingAlert.id) {
      downloadingAlert.id = `download.${Date.now()}`;
      disableDownload();
    }
    if (progress < 100) {
      createAlert({
        id: downloadingAlert.id,
        icon: <Spinner level="success" />,
        message: (
          <Text
            id="blocks.alert.downloading"
            defaultMessage="Downloading...{progress}%"
            progress={progress}
          />
        ),
      });
    } else {
      createAlert({
        id: downloadingAlert.id,
        icon: null,
        message: (
          <Text
            id="blocks.alert.downloadCompleted"
            defaultMessage="Download completed."
          />
        ),
      });
      setTimeout(() => {
        removeAlert(downloadingAlert.id);
        enableDownload();
        delete downloadingAlert.id;
      }, 1000);
    }
  };

  return (
    <>
      <MenuSection>
        <MenuItem
          className={itemClassName}
          label={
            device ? (
              <Text
                id="blocks.menu.device.disconnect"
                defaultMessage="Disconnect this device"
              />
            ) : (
              <Text
                id="blocks.menu.device.connect"
                defaultMessage="Connect your device"
              />
            )
          }
          onClick={async () => {
            if (device) {
              await disconnectDevice(device, setDevice);
              disableDownload();
              if (downloadingAlert.id) {
                removeAlert(downloadingAlert.id);
                delete downloadingAlert.id;
              }
            } else {
              try {
                await connectDevice(deviceFilters || defaultDeviceFilters, setDevice);
              } catch (err) {}
              enableDownload();
            }
          }}
        />

        <MenuItem
          disabled={downloadDisabled}
          className={itemClassName}
          label={
            <Text
              id="blocks.menu.device.download"
              defaultMessage="Download program"
            />
          }
          onClick={async () => {
            if (downloadingAlert.id) return;
            try {
              downloadDevice(
                device || (await connectDevice(deviceFilters || defaultDeviceFilters, setDevice)),
                onDownload ? await onDownload(fileList, assetList) : [].concat((fileList, assetList)),
                downloadingAlert,
              );
            } catch (err) {}
          }}
        />
      </MenuSection>

      {children}
    </>
  );
}
