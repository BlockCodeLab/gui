import { codeTab } from '@blockcode/extension-blocks-workspace';
import makeToolboxXML from '../../lib/make-toolbox-xml';

const Editor = codeTab.Content;

export default function BlocksEditor() {
  return <Editor toolbox={makeToolboxXML} />;
}
