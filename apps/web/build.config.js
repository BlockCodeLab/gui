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

const components = readdirSync(resolve(PROJECT_ROOT, '../../components'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => `@blockcode/${dirent.name}`);

const extensions = [].concat(
  ...readdirSync(resolve(PROJECT_ROOT, '../../extensions'), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => [`@blockcode/extension-${dirent.name}`, `@blockcode/extension-${dirent.name}/blocks`]),
);

const workspaces = [].concat(
  ...readdirSync(resolve(PROJECT_ROOT, '../../workspaces'), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => [`@blockcode/workspace-${dirent.name}`, `@blockcode/workspace-${dirent.name}/app`]),
);

const packages = [].concat(components, extensions, workspaces).filter((moduleId) => {
  try {
    return !!Bun.resolveSync(moduleId, PROJECT_ROOT);
  } catch (err) {
    return false;
  }
});

const imports = Object.fromEntries(
  ['preact', 'preact/hooks', `preact/jsx-${isRelease ? '' : 'dev-'}runtime`]
    .concat(packages)
    .map((moduleId) => [
      moduleId,
      `./${moduleId.includes('/') ? '' : `${moduleId}/`}${moduleId}${extname(Bun.resolveSync(moduleId, PROJECT_ROOT))}`,
    ]),
);

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
  ].concat(
    Object.entries(imports).map(([moduleId, importPath]) =>
      CopyPlugin({
        from: Bun.resolveSync(moduleId, PROJECT_ROOT),
        to: importPath,
        singleFile: true,
        watch: isHotServer,
      }),
    ),
    packages
      .filter((moduleId) => existsSync(resolve(dirname(Bun.resolveSync(moduleId, PROJECT_ROOT)), 'assets')))
      .map((moduleId) =>
        CopyPlugin({
          from: resolve(dirname(Bun.resolveSync(moduleId, PROJECT_ROOT)), 'assets'),
          to: 'assets/',
          watch: isHotServer,
        }),
      ),
  ),
};
