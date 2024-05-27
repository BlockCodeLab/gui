import featureImage from './feature.svg';
import iconImage from './icon.svg';

export default {
  name: 'Time',
  description: 'Time in the world.',
  image: featureImage,
  icon: iconImage,
  tags: ['blocks', 'data'],
  internetRequired: true,

  // l10n
  translations: {
    en: {
      name: 'Time',
      description: 'Time in the world.',
    },
    'zh-Hans': {
      name: '时间',
      description: '掌握世界时间。',
    },
  },
};
