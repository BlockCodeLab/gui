import { useEffect, useState, useErrorBoundary } from 'preact/hooks';
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
import TutorialBox from '../tutorial-box/tutorial-box';

/* styles and assets */
import styles from './gui.module.css';
import TutorialLibrary from '../tutorial-library/tutorial-library';

import workspaces from '../workspace-library/workspaces';

const loadingWorkspaces = Promise.all(workspaces);

export default function GUI() {
  const [error] = useErrorBoundary();
  const [tutorialId, setTutorialId] = useState();
  const [tutorialLibrary, setTutorialLibrary] = useState(false);
  const [workspaceLibrary, setWorkspaceLibrary] = useState(false);
  const [workspaceNames, setWorkspaceNames] = useState({});

  const { language, addLocaleData, getText, maybeLocaleText } = useLocale();
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
  const { editor, openProject: defaultOpenProject, closeProject, modified } = useEditor();

  useEffect(() => {
    loadingWorkspaces.then((allWorkspaces) => {
      setWorkspaceNames(
        Object.fromEntries(
          allWorkspaces.map((info) => [info.package, info.translations?.[language]?.name || info.name]),
        ),
      );
    });
  }, [language]);

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
    prompt.onSubmit(...args);
    createPrompt(null);
  };

  const handlePromptClose = () => {
    prompt.onClose && prompt.onClose();
    createPrompt(null);
  };

  const openAnyProject = (project) => {
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
      selectedFileId: project.selectedFileId ?? project.fileList?.[0]?.id,
    });
    setSplash(true);
    if (storeLibrary) {
      setStoreLibrary(false);
    }
  };

  const openProjectWithEditor = (project, editorPackage) => {
    if (editorPackage !== project.editor.package) {
      createPrompt({
        label: getText(
          'gui.projects.errorWorkspace',
          'This project is not currently editor creation, please switch to "{workspace}" and open it.',
          { workspace: workspaceNames[project.editor?.package] },
        ),
      });
      return;
    }
    if (modified) {
      createPrompt({
        title: getText('gui.projects.notSaved', 'Not saved'),
        label: getText('gui.projects.replaceProject', 'Replace contents of the current project?'),
        onSubmit: () => openAnyProject(project),
      });
    } else {
      openAnyProject(project);
    }
  };

  const handleOpenWorkspace = (workspacePackage, userProject) => {
    setSplash(true);
    closeProject();
    const openProject = (project) => {
      if (!project) return;
      project.editor = project.editor || {};
      project.editor.package = project.editor.package || workspacePackage;
      openProjectWithEditor(project, workspacePackage);
    };
    import(`@blockcode/workspace-${workspacePackage}/app`).then(({ default: createWorkspace }) => {
      setWorkspaceLibrary(false);
      const layout = createWorkspace({ addLocaleData, openProject });
      layout.selectedTabIndex = layout.selectedTabIndex ?? 0;
      openProject(userProject);
      createLayout(layout);
    });
  };

  const handleOpenProject = (project) => {
    if (editor?.package !== project.editor.package) {
      closeProject();
      handleOpenWorkspace(project.editor.package, project);
      return;
    }
    openProjectWithEditor(project, editor.package);
    selectTab(0);
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

  const handleOpenTutorialLibrary = () => {
    setTutorialId(null);
    setTutorialLibrary(true);
  };

  const handleCloseTutorialLibrary = () => setTutorialLibrary(false);

  const handleOpenTutorial = (id) => {
    setTutorialLibrary(false);
    setTutorialId(id);
  };

  const handleCloseTutorial = () => setTutorialId(null);

  return (
    <>
      {(splash || error) && <SplashScreen error={error} />}

      <Alerts items={alerts} />

      <MenuBar
        className={styles.menuBarPosition}
        showHomeButton={!workspaceLibrary}
        onRequestHome={handleBackHome}
        onOpenTutorialLibrary={handleOpenTutorialLibrary}
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
      </div>

      {tutorialId && (
        <TutorialBox
          tutorialId={tutorialId}
          onBack={handleOpenTutorialLibrary}
          onClose={handleCloseTutorial}
        />
      )}

      {tutorialLibrary && (
        <TutorialLibrary
          onOpenTutorial={handleOpenTutorial}
          onClose={handleCloseTutorialLibrary}
        />
      )}

      {workspaceLibrary && (
        <WorkspaceLibrary
          onOpenWorkspace={handleOpenWorkspace}
          onOpenProject={handleOpenProject}
        />
      )}

      {storeLibrary && <StoreLibrary onOpenProject={handleOpenProject} />}

      {prompt && (
        <Prompt
          title={prompt.title}
          label={prompt.label}
          content={prompt.content}
          inputMode={prompt.inputMode}
          defaultValue={prompt.defaultValue}
          onClose={handlePromptClose}
          onSubmit={prompt.onSubmit && handlePromptSubmit}
        >
          {prompt.body}
        </Prompt>
      )}
    </>
  );
}
