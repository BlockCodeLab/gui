import { useLocale, useEditor, exportFile } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks-editor';
import { CodeTab, pythonGenerator } from '@blockcode/workspace-blocks';

import makeToolboxXML from '../../lib/make-toolbox-xml';
import buildBlocks from './blocks';

import styles from './blocks-editor.module.css';

const Editor = CodeTab.Content;

const DEFAULT_SOUND_NAME = 'DADADADUM';

export default function BlocksEditor({ onShowPrompt, onShowAlert, onHideAlert }) {
  const { getText } = useLocale();
  const { assetList, fileList, selectedIndex } = useEditor();
  const isStage = selectedIndex === 0;

  const messages = {
    EVENT_WHENKEYPRESSED_FN: getText('arcade.blocks.fnButton', 'fn'),
    CONTROL_STOP_OTHER: getText('arcade.blocks.stopOther', 'other scripts in sprite'),
    SENSING_OF_DISTANCETO_CENTER: getText('arcade.blocks.sensingOfDistanceto.center', 'center'),
    SOUND_EFFECTS_TEMPO: getText('arcade.blocks.soundEffects.tempo', 'tempo'),
    SOUND_MENU_DADADADUM: getText('arcade.blocks.musicMenu.dadadadum', 'dadadadum'),
    SOUND_MENU_ENTERTAINER: getText('arcade.blocks.musicMenu.entertainer', 'entertainer'),
    SOUND_MENU_PRELUDE: getText('arcade.blocks.musicMenu.prelude', 'prelude'),
    SOUND_MENU_ODE: getText('arcade.blocks.musicMenu.ode', 'ode'),
    SOUND_MENU_NYAN: getText('arcade.blocks.musicMenu.nyan', 'nyan'),
    SOUND_MENU_RINGTONE: getText('arcade.blocks.musicMenu.ringtone', 'ringtone'),
    SOUND_MENU_FUNK: getText('arcade.blocks.musicMenu.funk', 'funk'),
    SOUND_MENU_BLUES: getText('arcade.blocks.musicMenu.blues', 'blues'),
    SOUND_MENU_BIRTHDAY: getText('arcade.blocks.musicMenu.birthday', 'birthday'),
    SOUND_MENU_WEDDING: getText('arcade.blocks.musicMenu.wedding', 'wedding'),
    SOUND_MENU_FUNERAL: getText('arcade.blocks.musicMenu.funeral', 'funeral'),
    SOUND_MENU_PUNCHLINE: getText('arcade.blocks.musicMenu.punchline', 'punchline'),
    SOUND_MENU_PYTHON: getText('arcade.blocks.musicMenu.python', 'python'),
    SOUND_MENU_BADDY: getText('arcade.blocks.musicMenu.baddy', 'baddy'),
    SOUND_MENU_CHASE: getText('arcade.blocks.musicMenu.chase', 'chase'),
    SOUND_MENU_BA_DING: getText('arcade.blocks.musicMenu.baDing', 'ba ding'),
    SOUND_MENU_WAWAWAWAA: getText('arcade.blocks.musicMenu.wawawawaa', 'wawawawaa'),
    SOUND_MENU_JUMP_UP: getText('arcade.blocks.musicMenu.jumpUp', 'jump up'),
    SOUND_MENU_JUMP_DOWN: getText('arcade.blocks.musicMenu.jumpDown', 'jump down'),
    SOUND_MENU_POWER_UP: getText('arcade.blocks.musicMenu.powerUp', 'power up'),
    SOUND_MENU_POWER_DOWN: getText('arcade.blocks.musicMenu.powerDown', 'power down'),
  };

  const workspace = ScratchBlocks.getMainWorkspace();
  buildBlocks(assetList, fileList, selectedIndex, workspace);

  const stage = fileList[0];
  const target = fileList[selectedIndex]; // stage or sprite

  let thumb, xml;
  if (target) {
    const image = assetList.find((asset) => asset.id === target.assets[target.frame]);
    if (image) {
      thumb = `data:${image.type};base64,${image.data}`;
    }
    xml = target.xml;
  }

  const toolbox = makeToolboxXML(isStage, fileList.length === 1, stage, target, DEFAULT_SOUND_NAME);

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
    ? [['create_stage', `stage = Stage(${listAssets(stage.assets)}, ${stage.frame})`]]
    : [
        ['import_stage', 'from stage import stage'],
        [
          'create_sprite',
          `sprite = Sprite("${target.id}", ${listAssets(target.assets)}, ${target.frame}, ${Math.round(target.x)}, ${Math.round(target.y)}, ${Math.round(target.size)}, ${Math.round(target.direction)}, ${target.rotationStyle}, ${target.hidden ? 'True' : 'False'})`,
        ],
        ['add_sprite', `stage.add_sprite(sprite)`],
      ];

  const handleLoadExtension = ({ id: extensionId, blocks }) => {
    blocks.forEach(({ id: blockId, player }) => {
      javascriptGenerator[`${extensionId}_${blockId}`] = player ? player.bind(javascriptGenerator) : () => '';
    });
  };

  return (
    <>
      <Editor
        enableMultiTargets
        enableLocalVariable={!isStage}
        xml={xml}
        toolbox={toolbox}
        messages={messages}
        onExtensionsFilter={() => ['blocks', ['arcade', 'popsicle']]}
        onLoadExtension={handleLoadExtension}
        onShowPrompt={onShowPrompt}
        onShowAlert={onShowAlert}
        onHideAlert={onHideAlert}
      />

      {thumb && (
        <div className={styles.targetThumb}>
          <img
            className={styles.thumbImage}
            src={thumb}
          />
        </div>
      )}
    </>
  );
}
