import { Text, MenuSection, MenuItem } from '@blockcode/ui';
import { locales as blocksLocales, makeMainMenu, codeTab } from '@blockcode/workspace-blocks/app';
import { PixelPaint, locales as paintLocales } from '@blockcode/pixel-paint';
import { WaveSurfer, locales as soundLocales } from '@blockcode/wave-surfer';
import generateMainFile from './lib/generate-main-file';
import generateAssets from './lib/generate-assets';

/* components */
import BlocksEditor from './components/blocks-editor/blocks-editor';
import Sidebar from './components/sidebar/sidebar';
import PaintText from './components/paint-text/paint-text';
import BackdropsLibrary from './components/libraries/backdrops-library';
import CostumesLibrary from './components/libraries/costumes-library';
import SoundsLibrary from './components/libraries/sounds-library';

/* assets */
import defaultProject from './lib/default-project';
import deviceIcon from './icon-device.svg';
import paintIcon from './icon-paint.svg';
import soundIcon from './icon-sound.svg';

/* languages */
import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

export default function ArcadeBlocksWorkspace({ addLocaleData, createLayout, openProject, project }) {
  addLocaleData(blocksLocales);
  addLocaleData(paintLocales);
  addLocaleData(soundLocales);

  addLocaleData({
    en,
    'zh-Hans': zhHans,
  });

  const createDefaultProject = (project) => {
    openProject(
      Object.assign(
        {
          selectedIndex: 1,
        },
        project || defaultProject,
      ),
    );
  };
  createDefaultProject(project);

  const handleSetupLibrary = () => {
    return {
      BackdropsLibrary,
      CostumesLibrary,
      SoundsLibrary,
    };
  };

  const deviceFilters = [
    {
      usbVendorId: 12346, // Espressif Vendor ID
    },
  ];

  const saveCurrentProject = () => {
    const canvas = document.querySelector('#blockcode-blocks-player');
    return { thumb: canvas.toDataURL() };
  };

  const downloadProjectToDevice = async (fileList, assetList) => {
    return [].concat(generateMainFile(fileList[0], fileList.slice(1)), await generateAssets(assetList));
  };

  const deviceName = (
    <Text
      id="arcade.menu.device"
      defaultMessage="Arcade"
    />
  );

  const mainMenu = makeMainMenu({
    deviceName,
    deviceFilters,
    createDefaultProject,
    saveCurrentProject,
    downloadProjectToDevice,
    showDownloadScreen: 'arcade',
  });

  // extends device menu
  const deviceMenu = mainMenu[2];
  const DeviceMenu = deviceMenu.Menu;
  deviceMenu.icon = deviceIcon;
  deviceMenu.Menu = ({ itemClassName }) => {
    return (
      <DeviceMenu itemClassName={itemClassName}>
        <MenuSection>
          <MenuItem
            className={itemClassName}
            label={
              <Text
                id="arcade.menu.device.manual"
                defaultMessage="Arcade manual"
              />
            }
            onClick={() => window.open('https://lab.blockcode.fun/#/2024/0501/')}
          />
        </MenuSection>
      </DeviceMenu>
    );
  };

  createLayout({
    mainMenu,

    tabs: [
      {
        ...codeTab,
        Content: BlocksEditor,
      },
      {
        icon: paintIcon,
        label: <PaintText />,
        Content: () => <PixelPaint onSetupLibrary={handleSetupLibrary} />,
      },
      {
        icon: soundIcon,
        label: (
          <Text
            id="arcade.waveSurfer.sounds"
            defaultMessage="Sounds"
          />
        ),
        Content: () => <WaveSurfer onSetupLibrary={handleSetupLibrary} />,
      },
    ],

    sidebars: [
      {
        expand: 'right',
        Content: Sidebar,
      },
    ],

    pane: false,

    tutorials: true,

    canEditProjectName: true,
  });
}
