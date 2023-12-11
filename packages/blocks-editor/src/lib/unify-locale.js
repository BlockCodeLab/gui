const unifiedLocales = {
  'zh-Hans': 'zh-cn',
  'zh-Hant': 'zh-tw',
};

export default function unifyLocale(language) {
  if (unifiedLocales[language]) {
    return unifiedLocales[language];
  }
  return language;
}
