import { useEffect, useState } from 'preact/hooks';
import { useLocale, useEditor } from '@blockcode/core';
import { Library } from '@blockcode/ui';

export default function StoreLibrary({ onClose }) {
  const [data, setData] = useState([]);
  const { getText } = useLocale();
  const { listProjects, getProject, openProject } = useEditor();

  useEffect(async () => {
    const projects = await listProjects();
    setData(
      projects.map((project) => ({
        name: project.name || `${getText('gui.defaultProject.shortname', 'Project')} [${project.key.toUpperCase()}]`,
        image: project.image,
        onSelect: async () => {
          openProject(await getProject(project.key));
          onClose();
        },
      }))
    );
  }, []);

  return (
    <Library
      items={data}
      emptyText={getText('gui.projects.empty', 'No project!')}
      onClose={onClose}
    />
  );
}
