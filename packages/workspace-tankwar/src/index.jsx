import { locales as blocksLocales, makeMenus, CodeTab, BackpackPane } from '@blockcode/workspace-blocks';

/* components */
import BlocksEditor from './components/blocks-editor/blocks-editor';
import Sidebar from './components/sidebar/sidebar';

/* assets */
import defaultProject from './lib/default-project';

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

export default function TankwarBlocksWorkspace({
  addLocaleData,
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

  const extendsMenu = [
    {
      id: 'device',
      hidden: true,
    },
  ];

  setLayout({
    menus: makeMenus({
      openStoreLibrary,
      closeStoreLibrary,
      newProject,
      setPrompt,
      setAlert,
      removeAlert,
      extendsMenu,
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
