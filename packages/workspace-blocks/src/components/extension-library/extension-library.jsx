import { useEffect, useState } from 'preact/hooks';
import { useLocale, useEditor } from '@blockcode/core';
import { Library } from '@blockcode/ui';
import extensions from './extensions';

const loadingExtensions = Promise.all(extensions);

export default function ExtensionLibrary({ onSelect, onClose, onShowPrompt, onShowAlert, onHideAlert }) {
  const [data, setData] = useState([]);
  const { language, getText } = useLocale();

  useEffect(() => {
    loadingExtensions.then((allExtensions) => {
      setData(
        allExtensions.map((extensionInfo) =>
          Object.assign(
            {
              ...extensionInfo,
              featured: true,
              onSelect: async () => {
                onShowAlert('importing', { id: extensionInfo.id });
                const { default: extensionObject } = await import(`@blockcode/extension-${extensionInfo.id}/blocks`);
                extensionObject.id = extensionInfo.id;
                onSelect(extensionObject);
                onHideAlert(extensionInfo.id);
                onClose();
              },
            },
            // translations
            extensionInfo.translations && extensionInfo.translations[language]
              ? {
                  name: extensionInfo.translations[language].name || extensionInfo.name,
                  description: extensionInfo.translations[language].description || extensionInfo.description,
                  collaborator: extensionInfo.translations[language].collaborator || extensionInfo.collaborator,
                }
              : {},
          ),
        ),
      );
    });
  }, []);

  return (
    <Library
      loading={true}
      items={data}
      title={getText('blocks.extensions.addExtension', 'Add Extension')}
      emptyText={getText('blocks.extensions.empty', 'No extension!')}
      onClose={onClose}
    />
  );
}
