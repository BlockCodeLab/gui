const DEFAULT_MAIN_CONTENT = `from popsicle.scratch import *
import code1
run()
`;

export default {
  editor: {
    name: 'Blocks',
    package: '@blockcode/workspace-popsicle-blocks',
  },
  assetList: [
    {
      id: 'main',
      type: 'text/x-python',
      content: DEFAULT_MAIN_CONTENT,
    },
  ],
  fileList: [
    {
      id: 'code1',
      type: 'text/x-python',
    },
  ],
};
