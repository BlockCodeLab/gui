import { resolve, dirname } from 'node:path';
import CSSLoader from 'bun-loader-css';
import CopyPlugin from 'bun-plugin-copy';

const isRelease = Bun.env.BUN_ENV === 'production';

const PROJECT_ROOT = import.meta.dir;
const SRC_DIR = resolve(PROJECT_ROOT, 'src');
const DIST_DIR = resolve(PROJECT_ROOT, 'dist');

export default {
  entrypoints: [resolve(SRC_DIR, 'index.js')],
  root: SRC_DIR,
  outdir: DIST_DIR,
  minify: isRelease,
  plugins: [
    CSSLoader(),
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
  ],
};
