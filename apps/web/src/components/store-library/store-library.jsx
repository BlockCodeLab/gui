import { useEffect, useState } from 'preact/hooks';
import { useLocale, useEditor } from '@blockcode/core';
import { Library } from '@blockcode/ui';

import styles from './store-library.module.css';

export default function StoreLibrary({ onRequestPrompt, onOpen, onClose }) {
  const [data, setData] = useState([]);
  const { getText } = useLocale();
  const { listProjects, getProject, renameProject, duplicateProject, deleteProject } = useEditor();

  const getData = async () => {
    const projects = await listProjects();
    setData(
      projects
        .map((item) => ({
          name: item.name || `${getText('gui.defaultProject.shortname', 'Project')} [${item.key.toUpperCase()}]`,
          image: item.image,
          onSelect: async () => onOpen(await getProject(item.key)),
          contextMenu: [
            [
              {
                label: getText('gui.projects.contextMenu.rename', 'rename'),
                onClick: () => {
                  onRequestPrompt({
                    title: getText('gui.projects.contextMenu.rename', 'rename'),
                    label: getText('gui.menuBar.projectTitlePlaceholder', 'Project title here'),
                    inputMode: true,
                    onSubmit: (name) => {
                      renameProject(item.key, name);
                      getData();
                    },
                  });
                },
              },
              {
                label: getText('gui.projects.contextMenu.duplicate', 'duplicate'),
                onClick: async () => {
                  await duplicateProject(item.key);
                  getData();
                },
              },
            ],
            [
              {
                label: getText('gui.projects.contextMenu.delete', 'delete'),
                className: styles.deleteMenuItem,
                onClick: async () => {
                  await deleteProject(item.key);
                  getData();
                },
              },
            ],
          ],
        }))
        .reverse()
    );
  };

  useEffect(getData, []);

  return (
    <Library
      items={data}
      emptyText={getText('gui.projects.empty', 'No project!')}
      onClose={onClose}
    />
  );
}
