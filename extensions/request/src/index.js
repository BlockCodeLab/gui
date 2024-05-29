import featureImage from './feature.svg';
import iconImage from './icon.svg';

export default {
  name: 'Request',
  description: 'Request network data via HTTP.',
  image: featureImage,
  icon: iconImage,
  tags: ['blocks', 'data', 'internet'],
  internetRequired: true,

  // l10n
  translations: {
    en: {
      name: 'Request',
      description: 'Request network data via HTTP.',
    },
    'zh-Hans': {
      name: '数据请求',
      description: '通过 HTTP 请求网络数据。',
    },
  },
};
