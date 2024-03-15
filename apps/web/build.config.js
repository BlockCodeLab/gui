import { dirname, resolve, extname } from 'node:path';
import { readdirSync, existsSync } from 'node:fs';
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

const packages = readdirSync(resolve(PROJECT_ROOT, '../../packages'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => `@blockcode/${dirent.name}`);

const extensions = [].concat(
  ...readdirSync(resolve(PROJECT_ROOT, '../../extensions'), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => [`@blockcode/extension-${dirent.name}`, `@blockcode/extension-${dirent.name}/blocks`])
);

const imports = Object.fromEntries(
  ['preact', 'preact/hooks', `preact/jsx-${isRelease ? '' : 'dev-'}runtime`]
    .concat(packages, extensions)
    .map((moduleId) => [
      moduleId,
      `./${moduleId.includes('/') ? '' : `${moduleId}/`}${moduleId}${extname(import.meta.resolveSync(moduleId))}`,
    ])
);

const assets = [].concat(packages, extensions);

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
      title: 'BlockCode Playgrounds',
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
    assets
      .filter((moduleId) => existsSync(resolve(dirname(import.meta.resolveSync(moduleId)), 'assets')))
      .map((moduleId) =>
        CopyPlugin({
          from: resolve(dirname(import.meta.resolveSync(moduleId)), 'assets'),
          to: 'assets/',
          watch: isHotServer,
        })
      )
  ),
};
