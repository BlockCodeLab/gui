import { Keys } from '@blockcode/core';
import { Text } from '@blockcode/ui';
import CodeEditor from './components/code-editor/code-editor';

import TerminalView from './components/terminal-view/terminal-view';
import Sidebar from './components/sidebar/sidebar';
import Pane from './components/pane/pane';

import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

/* assets */
import defaultProject from './lib/default-project';
import codeIcon from './icon-code.svg';
import replIcon from './icon-repl.svg';

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
    menus: [
      {
        label: (
          <Text
            id="micropython.menu.file"
            defaultMessage="File"
          />
        ),
        menuItems: [
          {
            label: (
              <Text
                id="micropython.menu.newProject"
                defaultMessage="New"
              />
            ),
            hotkey: [Keys.COMMAND, Keys.CONTROL, Keys.N],
            async onClick() {
              console.log('new');
            },
          },
        ],
      },
      {
        label: (
          <Text
            id="micropython.menu.edit"
            defaultMessage="Edit"
          />
        ),
        menuItems: [],
      },
    ],

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
  });
}
