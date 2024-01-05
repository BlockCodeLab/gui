import { resolve, dirname } from 'node:path';
import CSSLoader from 'bun-loader-css';
import YamlLoader from 'bun-loader-yaml';
import CopyPlugin from 'bun-plugin-copy';

const isRelease = Bun.env.ENV === 'production';

const PROJECT_ROOT = import.meta.dir;
const SRC_DIR = resolve(PROJECT_ROOT, 'src');
const DIST_DIR = resolve(PROJECT_ROOT, 'dist');

export default {
  entrypoints: [resolve(SRC_DIR, 'index.jsx')],
  root: SRC_DIR,
  outdir: DIST_DIR,
  minify: isRelease,
  naming: {
    asset: 'assets/[name]-[hash].[ext]',
  },
  plugins: [
    CSSLoader(),
    YamlLoader(),
    CopyPlugin({
      from: resolve(dirname(import.meta.resolveSync('scratch-blocks/dist/vertical')), '../media'),
      to: 'assets/blocks-media/',
    }),
  ],
  external: [
    'preact',
    'preact/hooks',
    `preact/jsx-${isRelease ? '' : 'dev-'}runtime`,
    '@blockcode/core',
    '@blockcode/ui',
    '@blockcode/device-pyboard',
    '@blockcode/blocks-editor',
  ],
};
