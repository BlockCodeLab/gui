import ScratchBlocks from '../scratch-blocks';

import '../blocks/data';

export const blockSeparator = '<sep gap="36"/>';

export const categorySeparator = '<sep gap="36"/>';

const events = (extensionXML) => `
  <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">
    ${extensionXML ? extensionXML : ''}
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

const control = (extensionXML) => `
  <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">
    <block type="control_wait">
      <value name="DURATION">
        <shadow type="math_positive_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    ${blockSeparator}
    <block type="control_repeat">
      <value name="TIMES">
        <shadow type="math_whole_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block id="forever" type="control_forever"/>
    ${blockSeparator}
    <block type="control_if"/>
    <block type="control_if_else"/>
    <block id="wait_until" type="control_wait_until"/>
    <block id="repeat_until" type="control_repeat_until"/>
    <block type="control_while"/>
    ${blockSeparator}
    <block type="control_stop"/>
    ${extensionXML ? extensionXML : ''}
    ${categorySeparator}
  </category>
`;

const sensing = (extensionXML) => `
  <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
    ${extensionXML ? extensionXML : ''}
    <block id="timer" type="sensing_timer"/>
    <block type="sensing_resettimer"/>
    ${categorySeparator}
  </category>
`;

const operators = (extensionXML) => {
  const apple = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_APPLE', 'apple');
  const banana = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_BANANA', 'banana');
  const letter = ScratchBlocks.ScratchMsgs.translate('OPERATORS_LETTEROF_APPLE', 'a');
  return `
  <category name="%{BKY_CATEGORY_OPERATORS}" id="operators" colour="#40BF4A" secondaryColour="#389438">
    <block type="operator_add">
      <value name="NUM1">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
      <value name="NUM2">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
    </block>
    <block type="operator_subtract">
      <value name="NUM1">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
      <value name="NUM2">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
    </block>
    <block type="operator_multiply">
      <value name="NUM1">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
      <value name="NUM2">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
    </block>
    <block type="operator_divide">
      <value name="NUM1">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
      <value name="NUM2">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
    </block>
    ${blockSeparator}
    <block type="operator_random">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    ${blockSeparator}
    <block type="operator_gt">
      <value name="OPERAND1">
        <shadow type="text">
          <field name="TEXT"/>
        </shadow>
      </value>
      <value name="OPERAND2">
        <shadow type="text">
          <field name="TEXT">50</field>
        </shadow>
      </value>
    </block>
    <block type="operator_lt">
      <value name="OPERAND1">
        <shadow type="text">
          <field name="TEXT"/>
        </shadow>
      </value>
      <value name="OPERAND2">
        <shadow type="text">
          <field name="TEXT">50</field>
        </shadow>
      </value>
    </block>
    <block type="operator_equals">
      <value name="OPERAND1">
        <shadow type="text">
          <field name="TEXT"/>
        </shadow>
      </value>
      <value name="OPERAND2">
        <shadow type="text">
          <field name="TEXT">50</field>
        </shadow>
      </value>
    </block>
    ${blockSeparator}
    <block type="operator_and"/>
    <block type="operator_or"/>
    <block type="operator_not"/>
    ${blockSeparator}
    <block type="operator_join">
      <value name="STRING1">
        <shadow type="text">
          <field name="TEXT">${apple}</field>
        </shadow>
      </value>
      <value name="STRING2">
        <shadow type="text">
          <field name="TEXT">${banana}</field>
        </shadow>
      </value>
    </block>
    <block type="operator_letter_of">
      <value name="LETTER">
        <shadow type="math_whole_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="STRING">
      <shadow type="text">
          <field name="TEXT">${apple}</field>
      </shadow>
      </value>
    </block>
    <block type="operator_length">
      <value name="STRING">
        <shadow type="text">
          <field name="TEXT">${apple}</field>
        </shadow>
      </value>
    </block>
    <block id="operator_contains" type="operator_contains">
      <value name="STRING1">
        <shadow type="text">
          <field name="TEXT">${apple}</field>
        </shadow>
      </value>
      <value name="STRING2">
        <shadow type="text">
          <field name="TEXT">${letter}</field>
        </shadow>
      </value>
    </block>
    ${blockSeparator}
    <block type="operator_mod">
      <value name="NUM1">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
      <value name="NUM2">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
    </block>
    <block type="operator_round">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
    </block>
    ${blockSeparator}
    <block type="operator_mathop">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM"/>
        </shadow>
      </value>
    </block>
    ${extensionXML ? extensionXML : ''}
    ${categorySeparator}
  </category>
  `;
};

const variables = () => `
  <category
    name="%{BKY_CATEGORY_VARIABLES}"
    id="variables"
    colour="#FF8C1A"
    secondaryColour="#DB6E00"
    custom="VARIABLE">
  </category>
`;

const myBlocks = () => `
  <category
    name="%{BKY_CATEGORY_MYBLOCKS}"
    id="myBlocks"
    colour="#FF6680"
    secondaryColour="#FF4D6A"
    custom="PROCEDURE">
  </category>
`;

const xmlOpen = '<xml style="display: none">';
const xmlClose = '</xml>';

export default function makeToolboxXML(categoriesXML = [], makeCategoriesXML = null) {
  const concatCategory = (categoryId, defaultXML) => {
    const index = categoriesXML.findIndex((categoryInfo) => categoryInfo.id === categoryId);
    if (index >= 0) {
      // remove the category from categoriesXML and return its XML
      const [categoryInfo] = categoriesXML.splice(index, 1);
      return defaultXML(categoryInfo.xml);
    }
    return defaultXML();
  };
  const eventsXML = concatCategory('events', events);
  const controlXML = concatCategory('control', control);
  const sensingXML = concatCategory('sensing', sensing);
  const operatorsXML = concatCategory('operators', operators);
  const variablesXML = variables();
  const myBlocksXML = myBlocks();

  let everything = [eventsXML, controlXML, sensingXML, operatorsXML, variablesXML, myBlocksXML];

  if (typeof makeCategoriesXML === 'function') {
    everything = makeCategoriesXML(everything);
  }

  for (const extensionCategory of categoriesXML) {
    everything.push(extensionCategory.xml);
  }

  everything.unshift(xmlOpen);
  everything.push(xmlClose);
  return everything.join(`\n`);
}
