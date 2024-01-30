import { useLocale, useEditor, exportFile } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks-editor';
import { CodeTab, pythonGenerator } from '@blockcode/workspace-blocks';

import makeToolboxXML from '../../lib/make-toolbox-xml';

const Editor = CodeTab.Content;

const DEFAULT_SOUND_NAME = 'DADADADUM';

export default function BlocksEditor() {
  const { getText } = useLocale();
  const { fileList } = useEditor();
  const picoed = fileList[0];

  const messages = {
    SOUND_EFFECTS_TEMPO: getText('popsicle.blocks.soundEffects.tempo', 'tempo'),
    SOUND_MENU_DADADADUM: getText('popsicle.blocks.musicMenu.dadadadum', 'dadadadum'),
    SOUND_MENU_ENTERTAINER: getText('popsicle.blocks.musicMenu.entertainer', 'entertainer'),
    SOUND_MENU_PRELUDE: getText('popsicle.blocks.musicMenu.prelude', 'prelude'),
    SOUND_MENU_ODE: getText('popsicle.blocks.musicMenu.ode', 'ode'),
    SOUND_MENU_NYAN: getText('popsicle.blocks.musicMenu.nyan', 'nyan'),
    SOUND_MENU_RINGTONE: getText('popsicle.blocks.musicMenu.ringtone', 'ringtone'),
    SOUND_MENU_FUNK: getText('popsicle.blocks.musicMenu.funk', 'funk'),
    SOUND_MENU_BLUES: getText('popsicle.blocks.musicMenu.blues', 'blues'),
    SOUND_MENU_BIRTHDAY: getText('popsicle.blocks.musicMenu.birthday', 'birthday'),
    SOUND_MENU_WEDDING: getText('popsicle.blocks.musicMenu.wedding', 'wedding'),
    SOUND_MENU_FUNERAL: getText('popsicle.blocks.musicMenu.funeral', 'funeral'),
    SOUND_MENU_PUNCHLINE: getText('popsicle.blocks.musicMenu.punchline', 'punchline'),
    SOUND_MENU_PYTHON: getText('popsicle.blocks.musicMenu.python', 'python'),
    SOUND_MENU_BADDY: getText('popsicle.blocks.musicMenu.baddy', 'baddy'),
    SOUND_MENU_CHASE: getText('popsicle.blocks.musicMenu.chase', 'chase'),
    SOUND_MENU_BA_DING: getText('popsicle.blocks.musicMenu.baDing', 'ba ding'),
    SOUND_MENU_WAWAWAWAA: getText('popsicle.blocks.musicMenu.wawawawaa', 'wawawawaa'),
    SOUND_MENU_JUMP_UP: getText('popsicle.blocks.musicMenu.jumpUp', 'jump up'),
    SOUND_MENU_JUMP_DOWN: getText('popsicle.blocks.musicMenu.jumpDown', 'jump down'),
    SOUND_MENU_POWER_UP: getText('popsicle.blocks.musicMenu.powerUp', 'power up'),
    SOUND_MENU_POWER_DOWN: getText('popsicle.blocks.musicMenu.powerDown', 'power down'),
  };

  const toolbox = makeToolboxXML(DEFAULT_SOUND_NAME);

  // pythonGenerator.additionalDefinitions_ = isStage
  //   ? [['create_stage', `stage=Stage(${listAssets(target.assets)},${target.backdrop})`]]
  //   : [
  //       ['import_stage', 'from stage import stage'],
  //       [
  //         'create_sprite',
  //         `sprite=Sprite("${target.id}",${listAssets(target.assets)},${target.costume},${target.x},${target.y},` +
  //           `${target.size},${target.direction},${target.rotationStyle},${target.hidden ? 'True' : 'False'})`,
  //       ],
  //       ['add_sprite', `stage.add_sprite(sprite)`],
  //     ];

  return (
    <Editor
      toolbox={toolbox}
      messages={messages}
      xml={picoed.xml}
    />
  );
}
