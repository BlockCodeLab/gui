import { ScratchBlocks, makeToolboxXML, blockSeparator, categorySeparator } from '@blockcode/blocks-editor';

import '../blocks/events';
import '../blocks/looks';
import '../blocks/sensing';
import '../blocks/sound';

import '../generators/javascript';
import '../generators/python';

const xmlEscape = (unsafe) => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
    }
  });
};

const looks = () => `
  <category name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#9966FF" secondaryColour="#774DCB">
    <block type="looks_led_state"/>
    <block type="looks_toggle_led"/>
    ${blockSeparator}
    <block type="looks_text">
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">Hello!</field>
        </shadow>
      </value>
    </block>
    <block type="looks_brightness">
      <value name="BRIGHTNESS">
        <shadow type="math_whole_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    ${blockSeparator}
    <block type="looks_xy">
      <value name="X">
        <shadow type="math_whole_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="Y">
        <shadow type="math_whole_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="BRIGHTNESS">
        <shadow type="math_whole_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    ${categorySeparator}
  </category>
`;

const sound = (soundName) => `
  <category name="%{BKY_CATEGORY_SOUND}" id="sound" colour="#D65CD6" secondaryColour="#BD42BD">
    <block type="sound_playuntildone">
      <value name="SOUND_MENU">
        <shadow type="sound_sounds_menu">
          <field name="SOUND_MENU">${soundName}</field>
        </shadow>
      </value>
    </block>
    <block type="sound_play">
      <value name="SOUND_MENU">
        <shadow type="sound_sounds_menu">
          <field name="SOUND_MENU">${soundName}</field>
        </shadow>
      </value>
    </block>
    <block type="sound_stopallsounds"/>
    ${
      false
        ? `
          ${blockSeparator}
          <block type="sound_changeeffectby">
            <value name="VALUE">
              <shadow type="math_number">
                <field name="NUM">10</field>
              </shadow>
            </value>
          </block>
          <block type="sound_seteffectto">
            <value name="VALUE">
              <shadow type="math_number">
                <field name="NUM">100</field>
              </shadow>
            </value>
          </block>
          <block type="sound_cleareffects"/>`
        : ''
    }
    ${categorySeparator}
  </category>
`;

const events = () => `
  <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">
    <block type="event_whenflagclicked"/>
    <block type="event_whenkeypressed"/>
    ${blockSeparator}
    <block type="event_whengreaterthan">
      <value name="VALUE">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    ${blockSeparator}
    <block type="event_whenbroadcastreceived" />
    <block type="event_broadcast">
      <value name="BROADCAST_INPUT">
        <shadow type="event_broadcast_menu"></shadow>
      </value>
    </block>
    <block type="event_broadcastandwait">
      <value name="BROADCAST_INPUT">
        <shadow type="event_broadcast_menu"></shadow>
      </value>
    </block>
    ${categorySeparator}
  </category>
`;

const sensing = () => `
  <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
    <block type="sensing_keypressed">
      <value name="KEY_OPTION">
        <shadow type="sensing_keyoptions"/>
      </value>
    </block>
    ${blockSeparator}
    <block id="timer" type="sensing_timer"/>
    <block type="sensing_resettimer"/>
    ${categorySeparator}
  </category>
`;

export default function (soundName = '') {
  soundName = xmlEscape(soundName);
  return makeToolboxXML([
    {
      id: 'looks',
      xml: looks(),
    },
    {
      id: 'sound',
      xml: sound(soundName),
    },
    {
      id: 'events',
      xml: events(),
    },
    {
      id: 'sensing',
      xml: sensing(),
    },
  ]);
}
