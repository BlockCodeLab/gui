import { useEffect, useState } from 'preact/hooks';
import { useLocale, useEditor } from '@blockcode/core';
import { Library } from '@blockcode/ui';
import extensions from './extensions';

const loadingExtensions = Promise.all(extensions);

export default function ExtensionLibrary({ onSelect, onClose, onFilter, onShowPrompt, onShowAlert, onHideAlert }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { language, getText } = useLocale();

  const handleFilter = (extensionInfo) => {
    if (onFilter) {
      const tags = extensionInfo.tags || [];
      const filter = onFilter(tags);
      if (Array.isArray(filter)) {
        return filter.every((subfilter) => {
          if (Array.isArray(subfilter)) {
            return subfilter.some((item) => tags.includes(item));
          }
          return tags.includes(subfilter);
        });
      }
      return filter;
    }
    return true;
  };

  useEffect(() => {
    loadingExtensions.then((allExtensions) => {
      setData(
        allExtensions.filter(handleFilter).map((extensionInfo) =>
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
      setLoading(false);
    });
  }, []);

  return (
    <Library
      loading={loading}
      items={data}
      title={getText('blocks.extensions.addExtension', 'Add Extension')}
      emptyText={getText('blocks.extensions.empty', 'No extension!')}
      onClose={onClose}
    />
  );
}
