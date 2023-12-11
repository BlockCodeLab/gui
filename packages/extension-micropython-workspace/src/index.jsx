import { Text } from '@blockcode/ui';

import getMenus from './lib/menus';

/* components */
import CodeEditor from './components/code-editor/code-editor';
import TerminalView from './components/terminal-view/terminal-view';
import Sidebar from './components/sidebar/sidebar';
import Pane from './components/pane/pane';

/* assets */
import defaultProject from './lib/default-project';
import codeIcon from './assets/icon-code.svg';
import replIcon from './assets/icon-repl.svg';

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

export default function MicroPython({ addLocaleData, setLayout, openProject, changeFile }) {
  addLocaleData({
    en,
    'zh-Hans': zhHans,
  });

  openProject(
    Object.assign(
      {
        selectedIndex: 0,
      },
      defaultProject
    )
  );

  setLayout({
    menus: getMenus(),

    tabs: [
      {
        icon: codeIcon,
        label: (
          <Text
            id="micropython.codeTab"
            defaultMessage="Code"
          />
        ),
        Content: CodeEditor,
      },
      {
        icon: replIcon,
        label: (
          <Text
            id="micropython.replTab"
            defaultMessage="REPL"
          />
        ),
        Content: TerminalView,
      },
    ],

    sidebars: [
      {
        expand: 'left',
        Content: Sidebar,
      },
    ],

    pane: {
      label: (
        <Text
          id="micropython.recordPane.title"
          defaultMessage="Record"
        />
      ),
      Content: Pane,
    },

    tutorials: true,

    canEditProjectName: true,
  });
}
