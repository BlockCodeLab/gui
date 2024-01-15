import { locales as blocksLocales, makeMenus, CodeTab, BackpackPane } from '@blockcode/workspace-blocks';

/* components */
import BlocksEditor from './components/blocks-editor/blocks-editor';
import Sidebar from './components/sidebar/sidebar';

/* assets */
import getDefaultProject from './lib/default-project';

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

export default function PopsicleBlocksWorkspace({
  addLocaleData,
  getText,
  setLayout,
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
      Object.assign(getDefaultProject(getText), {
        selectedIndex: 0,
      })
    );
  };
  newProject();

  const extendsMenu = [
    {
      id: 'device',
      disable: true,
    },
  ];

  setLayout({
    menus: makeMenus({ newProject, setAlert, removeAlert, extendsMenu }),

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
