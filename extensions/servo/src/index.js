import featureImage from './feature.png';
import iconImage from './icon.png';

export default {
  name: 'Servo',
  description: 'Servo module',
  collaborator: 'BlockCode Lab',
  image: featureImage,
  icon: iconImage,
  tags: ['blocks', 'dupont', 'output', '3v3', '5v', 'motor'],

  // l10n
  translations: {
    en: {
      name: 'Servo',
      description: 'Standard servo module.',
    },
    'zh-Hans': {
      name: '舵机',
      description: '通用舵机模块。',
    },
  },
};
