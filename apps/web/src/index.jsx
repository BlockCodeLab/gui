import { render } from 'preact';
import { LocalesProvider, EditorProvider, useLocale } from '@blockcode/core';
import GUI from './components/gui/gui';

import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

function App() {
  const { addLocaleData } = useLocale();
  addLocaleData({
    en,
    'zh-Hans': zhHans,
  });

  return (
    <LocalesProvider>
      <EditorProvider>
        <GUI />
      </EditorProvider>
    </LocalesProvider>
  );
}

render(<App />, globalThis.document.getElementById('root'));
