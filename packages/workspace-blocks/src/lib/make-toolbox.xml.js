import { makeToolboxXML, blockSeparator, categorySeparator } from '@blockcode/blocks-editor';

import '../generators/python';

const events = () => `
  <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">
    <block type="event_whenflagclicked"/>
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

export default function (categoriesXML = []) {
  return makeToolboxXML([
    {
      id: 'events',
      xml: events(),
    },
    ...categoriesXML,
  ]);
}
