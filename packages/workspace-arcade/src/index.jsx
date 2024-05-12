import { Text } from '@blockcode/ui';
import { locales as blocksLocales, makeMenus, CodeTab } from '@blockcode/workspace-blocks';
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
import getDefaultProject from './lib/default-project';
import deviceIcon from './icon-device.svg';
import paintIcon from './icon-paint.svg';
import soundIcon from './icon-sound.svg';

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
  hideSplashScreen,
}) {
  addLocaleData(blocksLocales);
  addLocaleData(paintLocales);
  addLocaleData(soundLocales);

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

  const handlePaint = () => selectTab(1);

  const handleRecordWave = () => selectTab(2);

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

  const extendsMenu = [
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
              id="arcade.menu.device.manual"
              defaultMessage="Device manual"
            />
          ),
          onClick: () => {
            window.open('https://lab.blockcode.fun/#/2024/0501/');
          },
        },
      ],
    },
  ];

  const onSave = () => {
    const canvas = document.querySelector('#blockcode-blocks-player');
    return { thumb: canvas.toDataURL() };
  };

  const onDownload = async (fileList, assetList) => {
    return [].concat(generateMainFile(fileList[0], fileList.slice(1)), await generateAssets(assetList));
  };

  const onLoadFirmware = () => {};

  setLayout({
    menus: makeMenus({
      newProject,
      setAlert,
      removeAlert,
      extendsMenu,
      deviceFilters,
      onSave,
      onDownload,
      onLoadFirmware,
    }),

    tabs: [
      {
        ...CodeTab,
        Content: () => (
          <BlocksEditor
            onRecordWave={handleRecordWave}
            onShowPrompt={setPrompt}
            onShowAlert={setAlert}
            onHideAlert={removeAlert}
            onReady={hideSplashScreen}
          />
        ),
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
      // {
      //   icon: soundIcon,
      //   label: (
      //     <Text
      //       id="arcade.waveSurfer.sounds"
      //       defaultMessage="Sounds"
      //     />
      //   ),
      //   Content: () => (
      //     <WaveSurfer
      //       onShowAlert={setAlert}
      //       onHideAlert={removeAlert}
      //       onSetupLibrary={handleSetupLibrary}
      //     />
      //   ),
      // },
    ],

    sidebars: [
      {
        expand: 'right',
        Content: () => (
          <Sidebar
            onPaint={handlePaint}
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
