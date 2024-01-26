import { useState } from 'preact/hooks';
import { useLocale, useEditor } from '@blockcode/core';
import { classNames } from '@blockcode/ui';
import { useLayout } from '../../hooks/use-layout';
import { useAlert } from '../../hooks/use-alert';

/* components */
import Alerts from '../alerts/alerts';
import MenuBar from '../menu-bar/menu-bar';
import Tabs, { TabLabel, TabPanel } from '../tabs/tabs';
import PaneView from '../pane-view/pane-view';
import Prompt from '../prompt/prompt';
import StoreLibrary from '../store-library/store-library';

/* styles and assets */
import styles from './gui.module.css';

export default function GUI() {
  const [prompt, setPrompt] = useState(null);
  const [libraryOpened, setLibraryOpened] = useState(false);
  const { menus, tabs, sidebars, pane, tutorials, canEditProjectName, selectedTab, selectTab, setLayout } = useLayout();
  const { alerts, setAlert, removeAlert } = useAlert();
  const { addLocaleData, getText } = useLocale();
  const { openProject, modified } = useEditor();

  const openStoreLibrary = () => setLibraryOpened(true);
  const closeStoreLibrary = () => setLibraryOpened(false);

  if (selectedTab === -1) {
    (async () => {
      const { default: createWorkspace } = await import('@blockcode/workspace-tankwar-blocks');
      createWorkspace({
        addLocaleData,
        getText,
        setLayout,
        openStoreLibrary,
        closeStoreLibrary,
        setPrompt,
        setAlert,
        removeAlert,
        openProject,
      });
      selectTab(0);
    })();
  }

  let LeftSidebarContent, RightSidebarContent;
  sidebars.forEach((sidebar) => {
    if (sidebar.expand === 'right') {
      RightSidebarContent = sidebar.Content;
    } else {
      LeftSidebarContent = sidebar.Content;
    }
  });

  const PaneContent = pane.Content;

  const tabPanelClass = classNames({
    [styles.tabPanelLeft]: !LeftSidebarContent,
    [styles.tabPanelRight]: !RightSidebarContent,
    [styles.tabPanelBottom]: !PaneContent,
  });

  const handlePromptSubmit = () => {
    prompt.onSubmit && prompt.onSubmit();
    setPrompt(null);
  };

  const handlePromptClose = () => {
    prompt.onClose && prompt.onClose();
    setPrompt(null);
  };

  const handleOpen = (project) => {
    if (modified) {
      setPrompt({
        title: getText('gui.projects.notSaved', 'Not saved'),
        label: getText('gui.projects.replaceProject', 'Replace contents of the current project?'),
        onSubmit: () => {
          openProject(project);
          setLibraryOpened(false);
        },
      });
    } else {
      openProject(project);
      setLibraryOpened(false);
    }
  };

  return (
    <>
      <Alerts items={alerts} />

      <MenuBar
        className={styles.menuBarPosition}
        menus={menus}
        tutorials={tutorials}
        canEditProjectName={canEditProjectName}
      />

      <div className={styles.bodyWrapper}>
        <div className={styles.workspaceWrapper}>
          {LeftSidebarContent && (
            <div className={styles.sidebarWrapper}>
              <LeftSidebarContent />
            </div>
          )}

          <div className={styles.editorWrapper}>
            <Tabs
              id={styles.tabsWrapper}
              className={styles.tabsWrapper}
            >
              {tabs.map(({ Content: TabContent, ...tab }, index) => (
                <>
                  <TabLabel
                    checked={index === selectedTab}
                    key={index}
                    name={index}
                    onSelect={() => selectTab(index)}
                  >
                    <img src={tab.icon} />
                    {tab.label}
                  </TabLabel>
                  <TabPanel
                    className={tabPanelClass}
                    name={index}
                    key={index}
                  >
                    <TabContent />
                  </TabPanel>
                </>
              ))}
            </Tabs>

            {PaneContent && (
              <PaneView
                id={styles.paneWrapper}
                className={styles.paneWrapper}
                title={pane.label}
                right={!RightSidebarContent}
                left={!LeftSidebarContent}
              >
                <PaneContent />
              </PaneView>
            )}
          </div>

          {RightSidebarContent && (
            <div className={styles.sidebarWrapper}>
              <RightSidebarContent />
            </div>
          )}
        </div>
      </div>

      {libraryOpened && (
        <StoreLibrary
          onRequestPrompt={setPrompt}
          onOpen={handleOpen}
          onClose={() => setLibraryOpened(false)}
        />
      )}

      {prompt && (
        <Prompt
          title={prompt.title}
          label={prompt.label}
          inputMode={prompt.inputMode}
          onClose={handlePromptClose}
          onSubmit={prompt.onSubmit ? handlePromptSubmit : false}
        />
      )}
    </>
  );
}
