import { useLocale, useEditor, exportFile } from '@blockcode/core';
import { CodeTab } from '@blockcode/workspace-blocks';

import makeToolboxXML from '../../lib/make-toolbox-xml';

const Editor = CodeTab.Content;

const DEFAULT_SOUND_NAME = 'DADADADUM';

export default function BlocksEditor() {
  const { getText } = useLocale();
  const { fileList } = useEditor();
  const player = fileList[0];

  const messages = {
    MOTION_ATTACK: getText('tankwar.blocks.motion_attack', '朝向 %1 方向 %2 步距离发射炮弹'),
    MOTION_MOVE: getText('tankwar.blocks.motion_move', '以 %2 % 速度面向 %1 方向前进'),
    MOTION_SETSPEED: getText('tankwar.blocks.motion_setspeed', '将速度设为 %1 %'),
    MOTION_STOP: getText('tankwar.blocks.motion_stop', '停止前进'),
    MOTION_X: getText('tankwar.blocks.motion_x', 'x 坐标'),
    MOTION_Y: getText('tankwar.blocks.motion_y', 'y 坐标'),
    MOTION_SPEED: getText('tankwar.blocks.motion_speed', '速度'),
    MOTION_DIRECTION: getText('tankwar.blocks.motion_direction', '方向'),
    SENSING_SCANWIDTH: getText('tankwar.blocks.sensing_scanwidth', '将雷达扫描宽度设为 %1'),
    SENSING_SCAN: getText('tankwar.blocks.sensing_scan', '雷达扫描 %1 方向有敌人？'),
    SENSING_DISTANCE: getText('tankwar.blocks.sensing_distance', '雷达测量 %1 方向敌人的距离'),
    SENSING_HEALTH: getText('tankwar.blocks.sensing_health', '生命值'),
  };
  const toolbox = makeToolboxXML();

  return (
    <Editor
      disableGenerator
      disableExtension
      messages={messages}
      toolbox={toolbox}
      xml={player.xml}
    />
  );
}
