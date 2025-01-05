// bun macro
import { resolve } from 'node:path';
import { readdirSync, existsSync } from 'node:fs';

const DIST_DIR = 'dist';
const INFO_FILE = 'info.js';

const editorsDir = resolve(import.meta.dir, '../../editors');

export function readEditors() {
  return readdirSync(editorsDir, { withFileTypes: true })
    .filter((dirent) => {
      if (!dirent.isDirectory()) {
        return false;
      }
      const infoFile = resolve(dirent.parentPath, dirent.name, DIST_DIR, INFO_FILE);
      return existsSync(infoFile);
    })
    .map((dirent) => dirent.name);
}