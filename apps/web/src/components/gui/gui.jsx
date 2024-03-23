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
import WorkspaceLibrary from '../workspace-library/workspace-library';
import StoreLibrary from '../store-library/store-library';

/* styles and assets */
import styles from './gui.module.css';

export default function GUI() {
  const [prompt, setPrompt] = useState(null);
  const [workspaceLibraryOpened, setWorkspaceLibraryOpened] = useState(false);
  const [storeLibraryOpened, setStoreLibraryOpened] = useState(false);
  const {
    menus,
    tabs,
    sidebars,
    pane,
    tutorials,
    canEditProjectName,
    selectedTabIndex,
    selectTab,
    setLayout,
    clearLayout,
  } = useLayout();
  const { alerts, setAlert, removeAlert } = useAlert();
  const { addLocaleData, getText } = useLocale();
  const { editor, setEditor, openProject, closeProject, modified } = useEditor();

  const openWorkspaceLibrary = () => setWorkspaceLibraryOpened(true);
  const closeWorkspaceLibrary = () => setWorkspaceLibraryOpened(false);
  if (!editor || !editor.package) {
    openWorkspaceLibrary();
  }

  const openStoreLibrary = () => setStoreLibraryOpened(true);
  const closeStoreLibrary = () => setStoreLibraryOpened(false);

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

  const handlePromptSubmit = (...args) => {
    prompt.onSubmit && prompt.onSubmit(...args);
    setPrompt(null);
  };

  const handlePromptClose = () => {
    prompt.onClose && prompt.onClose();
    setPrompt(null);
  };

  const handleOpenWorkspace = (workspacePackage, open = openProject) => {
    setAlert('importing', { id: workspacePackage });
    import(`@blockcode/workspace-${workspacePackage}`).then(({ default: createWorkspace }) => {
      createWorkspace({
        addLocaleData,
        getText,
        setLayout,
        selectTab,
        openStoreLibrary,
        closeStoreLibrary,
        setPrompt,
        setAlert,
        removeAlert,
        openProject: open,
      });
      selectTab(0);
      setEditor({
        package: workspacePackage,
      });
      closeWorkspaceLibrary();
      removeAlert(workspacePackage);
    });
  };

  const handleOpenProject = (project) => {
    const open = () => {
      openProject(project);
      closeStoreLibrary();
    };
    if (!editor || !editor.package || editor.package !== project.editor.package) {
      closeProject();
      handleOpenWorkspace(project.editor.package, open);
      return;
    }
    if (modified) {
      setPrompt({
        title: getText('gui.projects.notSaved', 'Not saved'),
        label: getText('gui.projects.replaceProject', 'Replace contents of the current project?'),
        onSubmit: open,
      });
    } else {
      open();
    }
  };

  const handleBackHome = () => {
    const close = () => {
      clearLayout();
      closeProject();
      openWorkspaceLibrary();
    };
    if (modified) {
      setPrompt({
        title: getText('gui.projects.notSaved', 'Not saved'),
        label: getText('gui.projects.closeProject', 'Close current project?'),
        onSubmit: close,
      });
    } else {
      close();
    }
  };

  return (
    <>
      <Alerts items={alerts} />

      <MenuBar
        className={styles.menuBarPosition}
        menus={menus}
        tutorials={tutorials}
        showHomeButton={!workspaceLibraryOpened}
        canEditProjectName={canEditProjectName}
        onRequestHome={handleBackHome}
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
                    checked={index === selectedTabIndex}
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

        {workspaceLibraryOpened && (
          <WorkspaceLibrary
            onRequestPrompt={setPrompt}
            onRequestStoreLibrary={openStoreLibrary}
            onOpenWorkspace={handleOpenWorkspace}
            onOpenProject={handleOpenProject}
          />
        )}
      </div>

      {storeLibraryOpened && (
        <StoreLibrary
          onRequestPrompt={setPrompt}
          onOpenProject={handleOpenProject}
          onClose={() => setStoreLibraryOpened(false)}
        />
      )}

      {prompt && (
        <Prompt
          title={prompt.title}
          label={prompt.label}
          content={prompt.content}
          inputMode={prompt.inputMode}
          defaultValue={prompt.defaultValue}
          onClose={handlePromptClose}
          onSubmit={prompt.onSubmit ? handlePromptSubmit : false}
        />
      )}
    </>
  );
}
