const content = `
from popsicle.scratch import *
`;

export default function (getText) {
  return {
    editor: {
      name: 'PicoedBlocks',
      package: '@blockcode/workspace-picoed-blocks',
    },
    assetList: [],
    fileList: [
      {
        id: 'main',
        name: 'main',
        content,
      },
    ],
  };
}
