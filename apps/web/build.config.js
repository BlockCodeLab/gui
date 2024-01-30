import { dirname, resolve, extname } from 'node:path';
import CSSLoader from 'bun-loader-css';
import YamlLoader from 'bun-loader-yaml';
import IndexPage from 'bun-index-page';
import CopyPlugin from 'bun-plugin-copy';
import HotServer from 'bun-hot-server';

const PROJECT_ROOT = import.meta.dir;
const SRC_DIR = resolve(PROJECT_ROOT, 'src');
const DIST_DIR = resolve(PROJECT_ROOT, 'dist');

const isRelease = Bun.env.BUN_ENV === 'production';
const isHotServer = !!Bun.env.HOT_SERVER;

const imports = Object.fromEntries(
  [
    'preact',
    'preact/hooks',
    `preact/jsx-${isRelease ? '' : 'dev-'}runtime`,
    '@blockcode/core',
    '@blockcode/ui',
    '@blockcode/device-pyboard',
    // codes
    '@blockcode/code-editor',
    '@blockcode/workspace-micropython',
    // blocks
    '@blockcode/blocks-editor',
    '@blockcode/blocks-player',
    '@blockcode/tone-player',
    '@blockcode/popsicle-player',
    '@blockcode/workspace-blocks',
    '@blockcode/workspace-popsicle',
    '@blockcode/workspace-picoed',
    '@blockcode/workspace-tankwar',
  ].map((moduleId) => [
    moduleId,
    `./${moduleId.includes('/') ? '' : `${moduleId}/`}${moduleId}${extname(import.meta.resolveSync(moduleId))}`,
  ])
);

const assets = [
  '@blockcode/ui',
  '@blockcode/blocks-editor',
  '@blockcode/workspace-micropython',
  '@blockcode/workspace-blocks',
  '@blockcode/workspace-popsicle',
  '@blockcode/workspace-picoed',
  '@blockcode/workspace-tankwar',
];

export default {
  entrypoints: [resolve(SRC_DIR, 'index.jsx')],
  root: SRC_DIR,
  outdir: DIST_DIR,
  minify: isRelease,
  naming: {
    asset: 'assets/[name]-[hash].[ext]',
  },
  external: Object.keys(imports),
  plugins: [
    CSSLoader(),
    YamlLoader(),
    IndexPage({
      entry: './index.js',
      template: resolve(SRC_DIR, 'template/index.hbs'),
      title: 'BlockCode GUI',
      importmap: JSON.stringify({ imports }),
    }),
    HotServer({
      enable: isHotServer,
    }),
    CopyPlugin({
      from: './public',
      watch: isHotServer,
    }),
    CopyPlugin({
      from: resolve(dirname(import.meta.resolveSync('@blockcode/code-editor')), 'workers'),
      to: 'workers/',
      watch: isHotServer,
    }),
  ].concat(
    Object.entries(imports).map(([moduleId, importPath]) =>
      CopyPlugin({
        from: import.meta.resolveSync(moduleId),
        to: importPath,
        singleFile: true,
        watch: isHotServer,
      })
    ),
    assets.map((moduleId) =>
      CopyPlugin({
        from: resolve(dirname(import.meta.resolveSync(moduleId)), 'assets'),
        to: 'assets/',
        watch: isHotServer,
      })
    )
  ),
};
