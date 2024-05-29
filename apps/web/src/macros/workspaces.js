// bun macro
import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';

export function readWorkspaces() {
  return readdirSync(resolve(import.meta.dir, '../../../../workspaces'), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}
