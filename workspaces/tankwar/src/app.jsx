import { locales as blocksLocales, makeMainMenu, codeTab } from '@blockcode/workspace-blocks/app';

/* components */
import BlocksEditor from './components/blocks-editor/blocks-editor';
import Sidebar from './components/sidebar/sidebar';

/* assets */
import defaultProject from './lib/default-project';

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

export default function TankwarBlocksWorkspace({ addLocaleData, createLayout, openProject, project }) {
  addLocaleData(blocksLocales);

  addLocaleData({
    en,
    'zh-Hans': zhHans,
  });

  const createDefaultProject = (project) => {
    openProject(
      Object.assign(
        {
          selectedIndex: 0,
        },
        project || defaultProject,
      ),
    );
  };
  createDefaultProject(project);

  const saveCurrentProject = () => {
    const canvas = document.querySelector('#blockcode-blocks-player');
    return { thumb: canvas.toDataURL() };
  };

  createLayout({
    mainMenu: makeMainMenu({
      createDefaultProject,
      saveCurrentProject,
    }).slice(0, 2),

    tabs: [
      {
        ...codeTab,
        Content: BlocksEditor,
      },
    ],

    sidebars: [
      {
        expand: 'right',
        Content: Sidebar,
      },
    ],

    pane: false,

    tutorials: true,

    canEditProjectName: true,
  });
}