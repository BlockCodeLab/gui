import { Text } from '@blockcode/ui';

import buildMenus from './lib/menus';

/* components */
import BlocksEditor from './components/blocks-editor/blocks-editor';
import Pane from './components/pane/pane';

/* assets */
import blocksIcon from './assets/icon-blocks.svg';

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

const locales = {
  en,
  'zh-Hans': zhHans,
};

const codeTab = {
  icon: blocksIcon,
  label: (
    <Text
      id="blocks.codeTab"
      defaultMessage="Code"
    />
  ),
  Content: BlocksEditor,
};

const backpackPane = {
  label: (
    <Text
      id="blocks.backpackPane.title"
      defaultMessage="Backpack"
    />
  ),
  Content: Pane,
};

export default function Blocks({ addLocaleData, setLayout, openProject, changeFile }) {
  addLocaleData(locales);

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

    tabs: [codeTab],

    sidebars: [],

    pane: backpackPane,

    tutorials: true,

    canEditProjectName: true,
  });
}

export { locales, buildMenus, codeTab, backpackPane };
