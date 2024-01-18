import { Text } from '@blockcode/ui';

import makeMenus from './lib/make-menus';
import defaultProject from './lib/default-project';

/* generator */
export { pythonGenerator } from './generators/python';

/* components */
import BlocksEditor from './components/blocks-editor/blocks-editor';
import Pane from './components/pane/pane';

/* assets */
import blocksIcon from './icon-blocks.svg';

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

const locales = {
  en,
  'zh-Hans': zhHans,
};

const CodeTab = {
  icon: blocksIcon,
  label: (
    <Text
      id="blocks.codeTab"
      defaultMessage="Code"
    />
  ),
  Content: BlocksEditor,
};

const BackpackPane = {
  label: (
    <Text
      id="blocks.backpackPane.title"
      defaultMessage="Backpack"
    />
  ),
  Content: Pane,
};

export default function BlocksWorkspace({ addLocaleData, setLayout, setPrompt, setAlert, removeAlert, openProject }) {
  addLocaleData(locales);

  const newProject = () => {
    openProject(
      Object.assign(
        {
          selectedIndex: 0,
        },
        defaultProject
      )
    );
  };
  newProject();

  setLayout({
    menus: makeMenus({ newProject, setPrompt, setAlert, removeAlert }),

    tabs: [CodeTab],

    sidebars: [],

    pane: BackpackPane,

    tutorials: true,

    canEditProjectName: true,
  });
}

export { locales, makeMenus, CodeTab, BackpackPane };
