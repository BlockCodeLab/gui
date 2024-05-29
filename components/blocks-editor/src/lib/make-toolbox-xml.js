import ScratchBlocks from '../scratch-blocks';
import '../blocks/data';
import '../blocks/events';

export const blockSeparator = '<sep gap="36"/>';

export const categorySeparator = '<sep gap="36"/>';

const events = () => `
  <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">
  <block type="event_whenflagclicked"/>
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

const control = () => `
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
    ${categorySeparator}
  </category>
`;

const sensing = () => `
  <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
    <block id="timer" type="sensing_timer"/>
    <block type="sensing_resettimer"/>
    ${categorySeparator}
  </category>
`;

const operators = () => `
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
          <field name="TEXT">${ScratchBlocks.Msg.OPERATORS_JOIN_APPLE}</field>
        </shadow>
      </value>
      <value name="STRING2">
        <shadow type="text">
          <field name="TEXT">${ScratchBlocks.Msg.OPERATORS_JOIN_BANANA}</field>
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
          <field name="TEXT">${ScratchBlocks.Msg.OPERATORS_JOIN_APPLE}</field>
      </shadow>
      </value>
    </block>
    <block type="operator_length">
      <value name="STRING">
        <shadow type="text">
          <field name="TEXT">${ScratchBlocks.Msg.OPERATORS_JOIN_APPLE}</field>
        </shadow>
      </value>
    </block>
    <block id="operator_contains" type="operator_contains">
      <value name="STRING1">
        <shadow type="text">
          <field name="TEXT">${ScratchBlocks.Msg.OPERATORS_JOIN_APPLE}</field>
        </shadow>
      </value>
      <value name="STRING2">
        <shadow type="text">
          <field name="TEXT">${ScratchBlocks.Msg.OPERATORS_LETTEROF_APPLE}</field>
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
    ${categorySeparator}
  </category>
`;

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

export default function makeToolboxXML(categoriesXML = []) {
  categoriesXML = categoriesXML.slice();
  const moveCategory = (categoryId) => {
    const index = categoriesXML.findIndex((categoryInfo) => categoryInfo.id === categoryId);
    if (index >= 0) {
      // remove the category from categoriesXML and return its XML
      const [categoryInfo] = categoriesXML.splice(index, 1);
      return categoryInfo.xml;
    }
    // return `undefined`
  };
  const motionXML = moveCategory('motion') || '';
  const looksXML = moveCategory('looks') || '';
  const soundXML = moveCategory('sound') || '';
  const eventsXML = moveCategory('events') || events();
  const controlXML = moveCategory('control') || control();
  const sensingXML = moveCategory('sensing') || sensing();
  const operatorsXML = moveCategory('operators') || operators();
  const variablesXML = moveCategory('data') || variables();
  // const myBlocksXML = moveCategory('procedures') || myBlocks();

  const everything = [
    motionXML,
    looksXML,
    soundXML,
    eventsXML,
    controlXML,
    sensingXML,
    operatorsXML,
    variablesXML,
    // myBlocksXML,
  ];

  for (const extensionCategory of categoriesXML) {
    everything.push(extensionCategory.xml);
  }
  return everything.join(`\n`);
}
