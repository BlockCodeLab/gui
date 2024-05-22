import featureImage from './feature.png';
import iconImage from './icon.svg';

export default {
  name: 'Broadcast',
  description: 'Connecting the world.',
  image: featureImage,
  icon: iconImage,
  tags: ['blocks', 'arcade', 'popsicle'],

  // l10n
  translations: {
    en: {
      name: 'Broadcast',
      description: 'Connecting the world.',
    },
    'zh-Hans': {
      name: '无线广播',
      description: '连通你我他。',
    },
  },
};
