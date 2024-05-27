import { useState } from 'preact/hooks';
import { useLocale, useLayout, useEditor } from '@blockcode/core';
import { classNames } from '@blockcode/ui';

/* components */
import Alerts from '../alerts/alerts';
import MenuBar from '../menu-bar/menu-bar';
import Tabs, { TabLabel, TabPanel } from '../tabs/tabs';
import PaneView from '../pane-view/pane-view';
import Prompt from '../prompt/prompt';
import WorkspaceLibrary from '../workspace-library/workspace-library';
import StoreLibrary from '../store-library/store-library';
import SplashScreen from '../splash-screen/splash-screen';

/* styles and assets */
import styles from './gui.module.css';

export default function GUI() {
  const [workspaceLibrary, setWorkspaceLibrary] = useState(false);

  const { addLocaleData, getText, maybeLocaleText } = useLocale();
  const {
    splash,
    prompt,
    alerts,
    tabs,
    sidebars,
    pane,
    selectedTabIndex,
    storeLibrary,
    setSplash,
    createPrompt,
    createLayout,
    clearLayout,
    selectTab,
    setStoreLibrary,
  } = useLayout();
  const { editor, setEditor, openProject: defaultOpenProject, closeProject, modified } = useEditor();
  // for debug
  const { fileList, selectedIndex } = useEditor();

  if (!editor?.package) {
    setWorkspaceLibrary(true);
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

  const handlePromptSubmit = (...args) => {
    prompt.onSubmit && prompt.onSubmit(...args);
    createPrompt(null);
  };

  const handlePromptClose = () => {
    prompt.onClose && prompt.onClose();
    createPrompt(null);
  };

  const openProject = (project) => {
    setSplash(true);
    setStoreLibrary(false);
    defaultOpenProject({
      ...project,
      assetList: project.assetList?.map((asset) => ({
        ...asset,
        name: maybeLocaleText(asset.name),
      })),
      fileList: project.fileList?.map((file) => ({
        ...file,
        name: maybeLocaleText(file.name),
      })),
      selectedIndex: 0,
    });
  };

  const handleOpenWorkspace = (workspacePackage, project) => {
    setSplash(true);
    import(`@blockcode/workspace-${workspacePackage}`).then(({ default: createWorkspace }) => {
      setWorkspaceLibrary(false);
      createWorkspace({
        addLocaleData,
        createLayout,
        openProject,
        project,
      });
      selectTab(0);
      setEditor({ package: workspacePackage });
    });
  };

  const handleOpenProject = (project) => {
    if (editor?.package !== project.editor.package) {
      closeProject();
      handleOpenWorkspace(project.editor.package, project);
      return;
    }
    if (modified) {
      createPrompt({
        title: getText('gui.projects.notSaved', 'Not saved'),
        label: getText('gui.projects.replaceProject', 'Replace contents of the current project?'),
        onSubmit: () => openProject(project),
      });
    } else {
      openProject(project);
    }
  };

  const handleBackHome = () => {
    const close = () => {
      closeProject();
      clearLayout();
      setWorkspaceLibrary(true);
    };
    if (modified) {
      createPrompt({
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
        showHomeButton={!workspaceLibrary}
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
                    {index === selectedTabIndex && <TabContent />}
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

        {workspaceLibrary && (
          <WorkspaceLibrary
            onOpenWorkspace={handleOpenWorkspace}
            onOpenProject={handleOpenProject}
          />
        )}
      </div>

      {storeLibrary && <StoreLibrary onOpenProject={handleOpenProject} />}

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

      {splash && <SplashScreen />}

      {DEVELOPMENT && editor && (
        <div className={styles.debugBox}>
          <pre>{fileList[selectedIndex].content}</pre>
        </div>
      )}
    </>
  );
}
