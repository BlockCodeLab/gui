import { Keys } from '@blockcode/core';
import { Text } from '@blockcode/ui';

const isMac = /Mac/i.test(navigator.platform || navigator.userAgent);

export default () => [
  {
    label: (
      <Text
        id="micropython.menu.file"
        defaultMessage="File"
      />
    ),
    menuItems: [
      [
        {
          label: (
            <Text
              id="micropython.menu.newProject"
              defaultMessage="New"
            />
          ),
          hotkey: [isMac ? Keys.COMMAND : Keys.CONTROL, Keys.N],
          async onClick() {
            console.log('new');
          },
        },
      ],
      [
        {
          label: (
            <Text
              id="micropython.menu.openProject"
              defaultMessage="Open"
            />
          ),
          hotkey: [isMac ? Keys.COMMAND : Keys.CONTROL, Keys.O],
          async onClick() {
            console.log('open');
          },
        },
        {
          label: (
            <Text
              id="micropython.menu.saveProject"
              defaultMessage="Save"
            />
          ),
          hotkey: [isMac ? Keys.COMMAND : Keys.CONTROL, Keys.S],
          async onClick() {
            console.log('save');
          },
        },
      ],
      [
        {
          label: (
            <Text
              id="micropython.menu.uploadProject"
              defaultMessage="Load from your computer"
            />
          ),
          async onClick() {
            console.log('upload');
          },
        },
        {
          label: (
            <Text
              id="micropython.menu.downloadProject"
              defaultMessage="save to your computer"
            />
          ),
          async onClick() {
            console.log('download');
          },
        },
      ],
    ],
  },
  {
    label: (
      <Text
        id="micropython.menu.edit"
        defaultMessage="Edit"
      />
    ),
    menuItems: [
      [
        {
          label: (
            <Text
              id="micropython.menu.undo"
              defaultMessage="Undo"
            />
          ),
          hotkey: [isMac ? Keys.COMMAND : Keys.CONTROL, Keys.Z],
          async onClick() {
            console.log('undo');
          },
        },
        {
          label: (
            <Text
              id="micropython.menu.redo"
              defaultMessage="Redo"
            />
          ),
          hotkey: isMac ? [Keys.SHIFT, Keys.COMMAND, Keys.Z] : [Keys.CONTROL, Keys.Y],
          async onClick() {
            console.log('redo');
          },
        },
      ],
    ],
  },
];
