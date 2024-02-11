import { locales as blocksLocales, makeMenus, CodeTab, BackpackPane } from '@blockcode/workspace-blocks';

/* components */
import BlocksEditor from './components/blocks-editor/blocks-editor';
import Sidebar from './components/sidebar/sidebar';

/* assets */
import defaultProject from './lib/default-project';

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

export default function PopsicleBlocksWorkspace({
  addLocaleData,
  getText,
  setLayout,
  openStoreLibrary,
  closeStoreLibrary,
  setPrompt,
  setAlert,
  removeAlert,
  openProject,
}) {
  addLocaleData(blocksLocales);

  addLocaleData({
    en,
    'zh-Hans': zhHans,
  });

  const newProject = () => {
    openProject(
      Object.assign(defaultProject, {
        selectedIndex: 0,
      })
    );
  };
  newProject();

  setLayout({
    menus: makeMenus({
      openStoreLibrary,
      closeStoreLibrary,
      newProject,
      setPrompt,
      setAlert,
      removeAlert,
    }),

    tabs: [
      {
        ...CodeTab,
        Content: BlocksEditor,
      },
    ],

    sidebars: [
      {
        expand: 'right',
        Content: Sidebar,
      },
    ],

    pane: false, //BackpackPane,

    tutorials: true,

    canEditProjectName: true,
  });
}
