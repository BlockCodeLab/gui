import RotationStyle from './rotation-style';

const DEFAULT_BACKDROP = {
  id: 'backdrop1',
  type: 'image/png',
  width: 1,
  height: 1,
  centerX: 1,
  centerY: 1,
  data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC',
};

const DEFAULT_COSTUME_1 = {
  id: 'costume1',
  type: 'image/gif',
  width: 65,
  height: 69,
  centerX: 33,
  centerY: 35,
  data: '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',
};

const DEFAULT_COSTUME_2 = {
  id: 'costume2',
  type: 'image/gif',
  width: 63,
  height: 72,
  centerX: 33,
  centerY: 35,
  data: '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',
};

const DEFAULT_MAIN_CONTENT = `from popsicle.scratch import *
from stage import stage
import sprite1
run(stage.render)
`;

export default function (getText) {
  return {
    assetList: [
      {
        id: 'main',
        type: 'text/x-python',
        content: DEFAULT_MAIN_CONTENT,
      },
      Object.assign(DEFAULT_BACKDROP, {
        name: getText('popsicle.blocks.defaultProject.backdropName', 'backdrop1'),
      }),
      Object.assign(DEFAULT_COSTUME_1, {
        name: getText('popsicle.blocks.defaultProject.costumeName1', 'costume1'),
      }),
      Object.assign(DEFAULT_COSTUME_2, {
        name: getText('popsicle.blocks.defaultProject.costumeName2', 'costume2'),
      }),
    ],
    fileList: [
      {
        id: 'stage',
        type: 'text/x-python',
        name: getText('popsicle.blocks.defaultProject.stageName', 'Stage'),
        assets: [DEFAULT_BACKDROP.id],
        backdrop: 0,
        x: 0,
        y: 0,
        content: `from popsicle.scratch import *\nstage=Stage([{"name":"backdrop1","image":["backdrop1",1,1,1,1],"transparent":0}],0)\n`,
      },
      {
        id: 'sprite1',
        type: 'text/x-python',
        name: getText('popsicle.blocks.defaultProject.spriteName', 'Sprite1'),
        assets: [DEFAULT_COSTUME_1.id, DEFAULT_COSTUME_2.id],
        costume: 0,
        x: 0,
        y: 0,
        size: 100,
        direction: 90,
        rotationStyle: RotationStyle.ALL_AROUND,
        hidden: false,
        content:
          `from popsicle.scratch import *\n` +
          `from stage import stage\n` +
          `sprite=Sprite("sprite1",[{"name":"costume1","image":["costume1",109,81,55,40],"transparent":0},{"name":"costume2","image":["costume2",109,84,55,40],"transparent":0}],0,0,0,90,2,False)\n` +
          `stage.add_sprite(sprite)\n`,
      },
    ],
  };
}
