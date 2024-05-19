import featureImage from './feature.png';
import iconImage from './icon.svg';

export default {
  name: 'Pen',
  description: 'Draw with your sprites.',
  image: featureImage,
  icon: iconImage,
  tags: ['blocks', 'arcade', 'display'],

  // l10n
  translations: {
    en: {
      name: 'Pen',
      description: 'Draw with your sprites.',
    },
    'zh-Hans': {
      name: '画笔',
      description: '绘制角色。',
    },
  },
};
