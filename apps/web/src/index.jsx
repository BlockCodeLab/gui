import { render } from 'preact';
import { LocalesProvider, LayoutProvider, EditorProvider, useLocale } from '@blockcode/core';
import { Text, Spinner } from '@blockcode/ui';
import GUI from './components/gui/gui';

import en from './l10n/en.yaml';
import zhHans from './l10n/zh-hans.yaml';

function App() {
  const { addLocaleData, language } = useLocale();
  addLocaleData({
    en,
    'zh-Hans': zhHans,
  });
  document.querySelector('html').lang = language;

  const alerts = {
    importing: {
      icon: <Spinner level="success" />,
      message: (
        <Text
          id="gui.alert.importing"
          defaultMessage="importing..."
        />
      ),
    },
  };

  return (
    <LocalesProvider>
      <LayoutProvider alerts={alerts}>
        <EditorProvider>
          <GUI />
        </EditorProvider>
      </LayoutProvider>
    </LocalesProvider>
  );
}

render(<App />, document.getElementById('root'));
