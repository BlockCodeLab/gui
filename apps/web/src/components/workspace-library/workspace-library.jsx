import { useState, useEffect } from 'preact/hooks';
import { useLocale, useEditor } from '@blockcode/core';
import { classNames, Text, ContextMenu, LibraryItem } from '@blockcode/ui';
import GettingStarted from '../getting-started/getting-started';
import workspaces from '../../lib/workspaces/workspaces';

import styles from './workspace-library.module.css';
import { version } from '../../../package.json';

const DISPLAY_PROJECTS_COUNTS = 7;

export default function WorkspaceLibrary({ onOpenWorkspace, onOpenProject, onRequestStoreLibrary, onRequestPrompt }) {
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState(0);
  const { getText } = useLocale();
  const { listProjects, getProject, renameProject, duplicateProject, deleteProject } = useEditor();

  const getData = async () => {
    const projects = await listProjects();
    setData(
      projects
        .sort((a, b) => b.modifiedDate - a.modifiedDate)
        .filter((_, i) => i < DISPLAY_PROJECTS_COUNTS)
        .map((item) => ({
          key: item.key,
          name: item.name || `${getText('gui.defaultProject.shortname', 'Project')} [${item.key.toUpperCase()}]`,
          image: item.image,
        }))
    );
    setCounts(projects.length);
  };
  useEffect(getData, []);

  return (
    <div className={styles.workspaceWrapper}>
      {/* <GettingStarted className={styles.gettingStarted} /> */}

      {data.length > 0 && (
        <>
          <div className={styles.libraryLabel}>
            <span>
              <Text
                id="gui.workspace.myprojects"
                defaultMessage="My projects"
              />
            </span>
            {counts > DISPLAY_PROJECTS_COUNTS && (
              <span
                className={classNames(styles.viewAll, styles.link)}
                onClick={onRequestStoreLibrary}
              >
                <Text
                  id="gui.workspace.allprojects"
                  defaultMessage="View all ({counts})"
                  counts={counts}
                />
              </span>
            )}
          </div>
          <div className={styles.libraryScrollGrid}>
            {data.map((item, index) => (
              <ContextMenu
                menuItems={[
                  [
                    {
                      label: getText('gui.projects.contextMenu.rename', 'rename'),
                      onClick: () => {
                        onRequestPrompt({
                          title: getText('gui.projects.contextMenu.rename', 'rename'),
                          label: getText('gui.menuBar.projectTitlePlaceholder', 'Project title here'),
                          inputMode: true,
                          defaultValue: item.name,
                          onSubmit: async (name) => {
                            if (name) {
                              await renameProject(item.key, name);
                              getData();
                            }
                          },
                        });
                      },
                    },
                    {
                      label: getText('gui.projects.contextMenu.duplicate', 'duplicate'),
                      onClick: async () => {
                        await duplicateProject(item.key);
                        getData();
                      },
                    },
                  ],
                  [
                    {
                      label: getText('gui.projects.contextMenu.delete', 'delete'),
                      className: styles.deleteMenuItem,
                      onClick: async () => {
                        await deleteProject(item.key);
                        getData();
                      },
                    },
                  ],
                ]}
                key={index}
              >
                <LibraryItem
                  id={index}
                  name={item.name}
                  image={item.image}
                  onSelect={async () => onOpenProject(await getProject(item.key))}
                />
              </ContextMenu>
            ))}
          </div>
        </>
      )}
      <div className={styles.libraryLabel}>
        <Text
          id="gui.workspace.newproject"
          defaultMessage="Create new project"
        />
      </div>
      <div className={styles.libraryScrollGrid}>
        {workspaces.map((item, index) => (
          <LibraryItem
            featured
            id={index}
            key={index}
            preview={item.preview}
            disabled={item.disabled}
            image={item.image}
            name={item.name}
            description={item.description}
            collaborator={item.collaborator}
            blocksRequired={item.blocksRequired}
            micropythonRequired={item.micropythonRequired}
            onSelect={() => onOpenWorkspace(item.package)}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <span
          className={classNames(styles.footerItem, styles.link)}
          onClick={() => window.open('https://lab.blockcode.fun/', '_blank')}
        >
          BlockCode Lab
        </span>
        <span
          className={classNames(styles.footerItem, styles.link)}
          onClick={() => {
            onRequestPrompt({
              title: getText('gui.terms', 'Terms of Use'),
              content: getText('gui.terms.content', 'Terms of Use'),
            });
          }}
        >
          <Text
            id="gui.terms"
            defaultMessage="Terms of Use"
          />
        </span>
        <span
          className={classNames(styles.footerItem, styles.link)}
          onClick={() => {
            onRequestPrompt({
              title: getText('gui.privacy', 'Privacy'),
              content: getText('gui.privacy.content', 'Privacy'),
            });
          }}
        >
          <Text
            id="gui.privacy"
            defaultMessage="Privacy"
          />
        </span>
        <span className={styles.footerItem}>v{version}</span>
      </div>
    </div>
  );
}
