import { useLocale, useEditor, exportFile } from '@blockcode/core';
import { CodeTab } from '@blockcode/workspace-blocks';
import { ScratchBlocks, pythonGenerator } from '@blockcode/blocks-editor';

import makeToolboxXML from '../../lib/make-toolbox-xml';
import buildBlocks from './blocks';

const Editor = CodeTab.Content;

const DEFAULT_SOUND_NAME = 'DADADADUM';

export default function BlocksEditor() {
  const { getText } = useLocale();
  const { assetList, fileList, selectedIndex } = useEditor();
  const isStage = selectedIndex === 0;

  ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_CENTER = getText('popsicle.blocks.keyCenter', 'center');
  ScratchBlocks.Msg.CONTROL_STOP_OTHER = getText('popsicle.blocks.stopOther', 'other scripts in sprite');
  ScratchBlocks.Msg.SENSING_OF_DISTANCETO_CENTER = getText('popsicle.blocks.sensingOfDistanceto.center', 'center');
  ScratchBlocks.Msg.SOUND_EFFECTS_TEMPO = getText('popsicle.blocks.soundEffects.tempo', 'tempo');
  ScratchBlocks.Msg.SOUND_MENU_DADADADUM = getText('popsicle.blocks.musicMenu.dadadadum', 'dadadadum');
  ScratchBlocks.Msg.SOUND_MENU_ENTERTAINER = getText('popsicle.blocks.musicMenu.entertainer', 'entertainer');
  ScratchBlocks.Msg.SOUND_MENU_PRELUDE = getText('popsicle.blocks.musicMenu.prelude', 'prelude');
  ScratchBlocks.Msg.SOUND_MENU_ODE = getText('popsicle.blocks.musicMenu.ode', 'ode');
  ScratchBlocks.Msg.SOUND_MENU_NYAN = getText('popsicle.blocks.musicMenu.nyan', 'nyan');
  ScratchBlocks.Msg.SOUND_MENU_RINGTONE = getText('popsicle.blocks.musicMenu.ringtone', 'ringtone');
  ScratchBlocks.Msg.SOUND_MENU_FUNK = getText('popsicle.blocks.musicMenu.funk', 'funk');
  ScratchBlocks.Msg.SOUND_MENU_BLUES = getText('popsicle.blocks.musicMenu.blues', 'blues');
  ScratchBlocks.Msg.SOUND_MENU_BIRTHDAY = getText('popsicle.blocks.musicMenu.birthday', 'birthday');
  ScratchBlocks.Msg.SOUND_MENU_WEDDING = getText('popsicle.blocks.musicMenu.wedding', 'wedding');
  ScratchBlocks.Msg.SOUND_MENU_FUNERAL = getText('popsicle.blocks.musicMenu.funeral', 'funeral');
  ScratchBlocks.Msg.SOUND_MENU_PUNCHLINE = getText('popsicle.blocks.musicMenu.punchline', 'punchline');
  ScratchBlocks.Msg.SOUND_MENU_PYTHON = getText('popsicle.blocks.musicMenu.python', 'python');
  ScratchBlocks.Msg.SOUND_MENU_BADDY = getText('popsicle.blocks.musicMenu.baddy', 'baddy');
  ScratchBlocks.Msg.SOUND_MENU_CHASE = getText('popsicle.blocks.musicMenu.chase', 'chase');
  ScratchBlocks.Msg.SOUND_MENU_BA_DING = getText('popsicle.blocks.musicMenu.baDing', 'ba ding');
  ScratchBlocks.Msg.SOUND_MENU_WAWAWAWAA = getText('popsicle.blocks.musicMenu.wawawawaa', 'wawawawaa');
  ScratchBlocks.Msg.SOUND_MENU_JUMP_UP = getText('popsicle.blocks.musicMenu.jumpUp', 'jump up');
  ScratchBlocks.Msg.SOUND_MENU_JUMP_DOWN = getText('popsicle.blocks.musicMenu.jumpDown', 'jump down');
  ScratchBlocks.Msg.SOUND_MENU_POWER_UP = getText('popsicle.blocks.musicMenu.powerUp', 'power up');
  ScratchBlocks.Msg.SOUND_MENU_POWER_DOWN = getText('popsicle.blocks.musicMenu.powerDown', 'power down');

  buildBlocks(assetList, fileList, selectedIndex, getText);

  let target, xml;
  if (selectedIndex !== -1) {
    target = fileList[selectedIndex];
    xml = target && target.xml;
  }
  const toolbox = makeToolboxXML(
    isStage,
    target.id,
    target.assets[target.costume],
    fileList[0].assets[fileList[0].backdrop],
    DEFAULT_SOUND_NAME
  );

  const workspace = ScratchBlocks.getMainWorkspace();
  const updateToolboxBlockValue = (id, value) => {
    const block = workspace.getBlockById(id);
    if (block) {
      block.inputList[0].fieldRow[0].setValue(value);
    }
  };
  const targetUpdate = () => {
    if (selectedIndex > 0 && workspace) {
      ['glide', 'move', 'set'].forEach((prefix) => {
        updateToolboxBlockValue(`${prefix}x`, Math.round(target.x).toString());
        updateToolboxBlockValue(`${prefix}y`, Math.round(target.y).toString());
      });
    }
  };
  setTimeout(targetUpdate, 1);

  const listAssets = (assets) => {
    const res = [];
    for (const assetId of assets) {
      const asset = assetList.find((asset) => asset.id === assetId);
      if (asset) {
        res.push({
          name: asset.name,
          image: [assetId, asset.width, asset.height, asset.centerX, asset.centerY],
          transparent: 0,
        });
      }
    }
    return JSON.stringify(res);
  };

  pythonGenerator.additionalDefinitions_ = isStage
    ? [['create_stage', `stage=Stage(${listAssets(target.assets)},${target.backdrop})`]]
    : [
        ['import_stage', 'from stage import stage'],
        [
          'create_sprite',
          `sprite=Sprite("${target.id}",${listAssets(target.assets)},${target.costume},${target.x},${target.y},` +
            `${target.size},${target.direction},${target.rotationStyle},${target.hidden ? 'True' : 'False'})`,
        ],
        ['add_sprite', `stage.add_sprite(sprite)`],
      ];

  return (
    <Editor
      enableMultiTargets
      enableLocalVariable={!isStage}
      toolbox={toolbox}
      xml={xml}
    />
  );
}
