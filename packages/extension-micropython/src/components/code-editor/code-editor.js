import { ContextMenu } from '@blockcode/ui';
import { CodeEditor as Editor } from '@blockcode/code-editor';
import PackageList from '../package-list/package-list';

export default function CodeEditor() {
  return (
    <>
      <PackageList />
      <ContextMenu>
        <Editor />
      </ContextMenu>
    </>
  );
}
