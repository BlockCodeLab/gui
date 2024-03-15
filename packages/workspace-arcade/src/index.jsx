import { locales as blocksLocales, makeMenus, CodeTab, BackpackPane } from '@blockcode/workspace-blocks';
import { PixelPaint, locales as paintLocales } from '@blockcode/pixel-paint';

/* components */
import BlocksEditor from './components/blocks-editor/blocks-editor';
import Sidebar from './components/sidebar/sidebar';
import PaintText from './components/paint-text/paint-text';

/* assets */
import getDefaultProject from './lib/default-project';
import paintIcon from './paint-icon.svg';

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

export default function ArcadeBlocksWorkspace({
  addLocaleData,
  getText,
  setLayout,
  setAlert,
  removeAlert,
  openProject,
}) {
  addLocaleData(blocksLocales);
  addLocaleData(paintLocales);

  addLocaleData({
    en,
    'zh-Hans': zhHans,
  });

  const newProject = () => {
    openProject(
      Object.assign(getDefaultProject(getText), {
        selectedIndex: 1,
      }),
    );
  };
  newProject();

  setLayout({
    menus: makeMenus({ newProject, setAlert, removeAlert }),

    tabs: [
      {
        ...CodeTab,
        Content: BlocksEditor,
      },
      {
        icon: paintIcon,
        label: <PaintText />,
        Content: PixelPaint,
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
