import { Text } from '@blockcode/ui';
import { locales as blocksLocales, makeMenus, CodeTab, BackpackPane } from '@blockcode/workspace-blocks';
import { PixelPaint, locales as paintLocales } from '@blockcode/pixel-paint';
import generateMainFile from './lib/generate-main-file';

/* components */
import BlocksEditor from './components/blocks-editor/blocks-editor';
import Sidebar from './components/sidebar/sidebar';
import PaintText from './components/paint-text/paint-text';
import BackdropsLibrary from './components/libraries/backdrops-library';
import CostumesLibrary from './components/libraries/costumes-library';

/* assets */
import getDefaultProject from './lib/default-project';
import deviceIcon from './icon-device.svg';
import paintIcon from './icon-paint.svg';

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

export default function ArcadeBlocksWorkspace({
  addLocaleData,
  getText,
  setLayout,
  selectTab,
  setPrompt,
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

  const handleSetupLibrary = () => {
    return {
      BackdropsLibrary,
      CostumesLibrary,
    };
  };

  setLayout({
    menus: makeMenus({
      newProject,
      setAlert,
      removeAlert,
      extendsMenu: [
        {
          id: 'device',
          label: (
            <>
              <img src={deviceIcon} />
              <Text
                id="blocks.menu.device"
                defaultMessage="Device"
              />
            </>
          ),
          menuItems: [
            {
              label: (
                <Text
                  id="arcade.menus.device.updateFirmware"
                  defaultMessage="Update Arcade firmware..."
                />
              ),
              disabled: true,
              onClick: () => {},
            },
          ],
        },
      ],
      deviceFilters: [{ usbVendorId: 0 }],
      onDownload: (fileList, assetList) => [].concat(generateMainFile(fileList[0], fileList.slice(1)), assetList),
    }),

    tabs: [
      {
        ...CodeTab,
        Content: BlocksEditor,
      },
      {
        icon: paintIcon,
        label: <PaintText />,
        Content: () => (
          <PixelPaint
            onShowAlert={setAlert}
            onHideAlert={removeAlert}
            onSetupLibrary={handleSetupLibrary}
          />
        ),
      },
    ],

    sidebars: [
      {
        expand: 'right',
        Content: () => (
          <Sidebar
            onSelectTab={selectTab}
            onShowPrompt={setPrompt}
            onShowAlert={setAlert}
            onHideAlert={removeAlert}
          />
        ),
      },
    ],

    pane: false, //BackpackPane,

    tutorials: true,

    canEditProjectName: true,
  });
}
