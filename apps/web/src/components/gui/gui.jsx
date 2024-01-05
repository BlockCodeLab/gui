import classNames from 'classnames';
import { useLocale, useEditor } from '@blockcode/core';
import { useLayout } from '../../hooks/use-layout';
import { useAlert } from '../../hooks/use-alert';

/* components */
import Alerts from '../alerts/alerts';
import MenuBar from '../menu-bar/menu-bar';
import Tabs, { TabLabel, TabPanel } from '../tabs/tabs';
import PaneView from '../pane-view/pane-view';

/* styles and assets */
import styles from './gui.module.css';

export default function GUI() {
  const { menus, tabs, sidebars, pane, tutorials, canEditProjectName, selectedTab, selectTab, setLayout } = useLayout();
  const { alerts, setAlert, removeAlert } = useAlert();
  const { addLocaleData, getText } = useLocale();
  const { openProject } = useEditor();

  if (selectedTab === -1) {
    (async () => {
      const { default: createWorkspace } = await import('@blockcode/workspace-popsicle-blocks');
      createWorkspace({ addLocaleData, getText, setLayout, setAlert, removeAlert, openProject });
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
    </>
  );
}
