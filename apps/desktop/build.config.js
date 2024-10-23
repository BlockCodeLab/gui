import { resolve } from 'node:path';
import CopyPlugin from 'bun-plugin-copy';

const PROJECT_ROOT = import.meta.dir;
const SRC_DIR = resolve(PROJECT_ROOT, 'src');
const DIST_DIR = resolve(PROJECT_ROOT, 'dist');

const isRelease = Bun.env.BUN_ENV === 'production';

export default {
  entrypoints: [resolve(SRC_DIR, 'main.js'), resolve(SRC_DIR, 'preload.js')],
  root: SRC_DIR,
  outdir: DIST_DIR,
  format: 'cjs',
  target: 'node',
  minify: isRelease,
  naming: {
    asset: 'assets/[name]-[hash].[ext]',
  },
  define: {
    DEVELOPMENT: JSON.stringify(Bun.env.BUN_ENV !== 'production'),
  },
  plugins: [
    CopyPlugin({
      from: '../web/dist',
      to: 'packaged',
    }),
  ],
  external: ['electron'],
};
