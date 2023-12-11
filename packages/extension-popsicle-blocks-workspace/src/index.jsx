import { Text } from '@blockcode/ui';
import { locales as blocksLocales, buildMenus, codeTab, backpackPane } from '@blockcode/extension-blocks-workspace';

/* components */
import BlocksEditor from './components/blocks-editor/blocks-editor';
import Sidebar from './components/sidebar/sidebar';

/* assets */

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

export default function PopsicleBlocks({ addLocaleData, setLayout, openProject, changeFile }) {
  addLocaleData(blocksLocales);

  addLocaleData({
    en,
    'zh-Hans': zhHans,
  });

  // openProject(
  //   Object.assign(
  //     {
  //       selectedIndex: 0,
  //     },
  //     defaultProject
  //   )
  // );

  setLayout({
    menus: buildMenus(),

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

    pane: false, //backpackPane,

    tutorials: true,

    canEditProjectName: true,
  });
}
