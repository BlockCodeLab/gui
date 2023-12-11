import { pythonGenerator } from './generator';

pythonGenerator['event_whenbroadcastreceived'] = (block) => {
  return 'pass\n';
};

pythonGenerator['event_broadcast'] = (block) => {};

pythonGenerator['event_broadcastandwait'] = (block) => {};
