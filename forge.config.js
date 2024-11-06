module.exports = {
  packagerConfig: {
    name: 'BlockCode Playgrounds',
    icon: 'apps/desktop/res/icon',
    appCopyright: 'Copyright(c) BlockCode Lab, 2023-2024.',
    asar: true,
    ignore: [
      /^\/apps\/web\//g,
      /^\/components\//g,
      /^\/docs\//g,
      /^\/extensions\//g,
      /^\/workspaces\//g,
      /^\/node_modules\//g,
      /^\/out\//g,
      /\/public\//g,
      /\/src\//g,
      /\/res\//g,
      /^\./g,
      /(build|forge).config\.js$/g,
      'jsconfig.json',
      'bun.lockb',
      'README.md',
    ],
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: 'apps/desktop/res/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-dmg',
    },
  ],
  hooks: {
    readPackageJson: async (forgeConfig, packageJson) => {
      packageJson.scripts = {};
      return packageJson;
    },
  },
};
