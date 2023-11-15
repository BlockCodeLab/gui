import classNames from 'classnames';
import { useLocale, useEdit } from '@blockcode/core';
import { useLayout } from '../../hooks/use-layout';

/* components */
import MenuBar from '../menu-bar/menu-bar';
import Tabs, { TabLabel, TabPanel } from '../tabs/tabs';
import PaneView from '../pane-view/pane-view';

/* styles and assets */
import styles from './gui.module.css';

export default function GUI() {
  const { sidebars, pane, menus, tabs, selectedTab, selectTab, setLayout } = useLayout();
  const { addLocaleData } = useLocale();
  const { openProject } = useEdit();

  if (selectedTab === -1) {
    (async () => {
      const { default: createWorkspace } = await import('@blockcode/extension-micropython');
      createWorkspace({ addLocaleData, setLayout, openProject });
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
      <MenuBar
        className={styles.menuBarPosition}
        menus={menus}
      />

      <div className={styles.bodyWrapper}>
        <div className={styles.workspaceWrapper}>
          {LeftSidebarContent && (
            <div className={styles.sidebarWrapper}>
              <LeftSidebarContent />
            </div>
          )}

          <div className={styles.editorWrapper}>
            <Tabs className={styles.tabsWrapper}>
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
                className={styles.paneWrapper}
                title={pane.label}
                right={!RightSidebarContent}
                lefe={!LeftSidebarContent}
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
