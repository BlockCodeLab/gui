import { resolve } from 'node:path';
import CSSLoader from 'bun-loader-css';

const isRelease = Bun.env.BUN_ENV === 'production';

const PROJECT_ROOT = import.meta.dir;
const SRC_DIR = resolve(PROJECT_ROOT, 'src');
const DIST_DIR = resolve(PROJECT_ROOT, 'dist');

export default {
  entrypoints: [
    resolve(SRC_DIR, 'index.js'),
    resolve(SRC_DIR, 'workers/editor-worker.js'),
    resolve(SRC_DIR, 'workers/json-worker.js'),
    // resolve(SRC_DIR, 'workers/ts-worker.js'),
  ],
  root: SRC_DIR,
  outdir: DIST_DIR,
  minify: isRelease,
  plugins: [CSSLoader()],
  external: [
    'preact',
    'preact/hooks',
    `preact/jsx-${isRelease ? '' : 'dev-'}runtime`,
    '@blockcode/core',
    '@blockcode/ui',
  ],
};
