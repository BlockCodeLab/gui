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
    SOUND_EFFECTS_TEMPO: getText('picoed.blocks.soundEffects.tempo', 'tempo'),
    SOUND_MENU_DADADADUM: getText('picoed.blocks.musicMenu.dadadadum', 'dadadadum'),
    SOUND_MENU_ENTERTAINER: getText('picoed.blocks.musicMenu.entertainer', 'entertainer'),
    SOUND_MENU_PRELUDE: getText('picoed.blocks.musicMenu.prelude', 'prelude'),
    SOUND_MENU_ODE: getText('picoed.blocks.musicMenu.ode', 'ode'),
    SOUND_MENU_NYAN: getText('picoed.blocks.musicMenu.nyan', 'nyan'),
    SOUND_MENU_RINGTONE: getText('picoed.blocks.musicMenu.ringtone', 'ringtone'),
    SOUND_MENU_FUNK: getText('picoed.blocks.musicMenu.funk', 'funk'),
    SOUND_MENU_BLUES: getText('picoed.blocks.musicMenu.blues', 'blues'),
    SOUND_MENU_BIRTHDAY: getText('picoed.blocks.musicMenu.birthday', 'birthday'),
    SOUND_MENU_WEDDING: getText('picoed.blocks.musicMenu.wedding', 'wedding'),
    SOUND_MENU_FUNERAL: getText('picoed.blocks.musicMenu.funeral', 'funeral'),
    SOUND_MENU_PUNCHLINE: getText('picoed.blocks.musicMenu.punchline', 'punchline'),
    SOUND_MENU_PYTHON: getText('picoed.blocks.musicMenu.python', 'python'),
    SOUND_MENU_BADDY: getText('picoed.blocks.musicMenu.baddy', 'baddy'),
    SOUND_MENU_CHASE: getText('picoed.blocks.musicMenu.chase', 'chase'),
    SOUND_MENU_BA_DING: getText('picoed.blocks.musicMenu.baDing', 'ba ding'),
    SOUND_MENU_WAWAWAWAA: getText('picoed.blocks.musicMenu.wawawawaa', 'wawawawaa'),
    SOUND_MENU_JUMP_UP: getText('picoed.blocks.musicMenu.jumpUp', 'jump up'),
    SOUND_MENU_JUMP_DOWN: getText('picoed.blocks.musicMenu.jumpDown', 'jump down'),
    SOUND_MENU_POWER_UP: getText('picoed.blocks.musicMenu.powerUp', 'power up'),
    SOUND_MENU_POWER_DOWN: getText('picoed.blocks.musicMenu.powerDown', 'power down'),
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
