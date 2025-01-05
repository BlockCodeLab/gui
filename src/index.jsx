import './l10n';

import { render } from 'preact';
import { addAlertConfig, LocalesProvider, AppProvider, ProjectProvider, Text, Spinner } from '@blockcode/core';
import { Layout } from './components/layout/layout';

// 添加“导入”消息模版
addAlertConfig('importing', {
  icon: <Spinner level="success" />,
  message: (
    <Text
      id="gui.alert.importing"
      defaultMessage="importing..."
    />
  ),
});

function App() {
  return (
    <LocalesProvider>
      <AppProvider>
        <ProjectProvider>
          <Layout />
        </ProjectProvider>
      </AppProvider>
    </LocalesProvider>
  );
}

render(<App />, document.getElementById('root'));
