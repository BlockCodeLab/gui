import { useState, useEffect } from 'preact/hooks';
import { useLocale, useLayout, useEditor } from '@blockcode/core';
import { classNames, Text, ContextMenu, LibraryItem } from '@blockcode/ui';
import CoverPages from '../cover-pages/cover-pages';
import makeCoverPages from '../../lib/cover-pages/make-cover-pages';
import workspaces from './workspaces';
import { version } from '../../../package.json';

import styles from './workspace-library.module.css';

const loadinWorkspaces = Promise.all(workspaces);

const DISPLAY_PROJECTS_COUNTS = 7;

export default function WorkspaceLibrary({ onOpenWorkspace, onOpenProject }) {
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState(0);
  const { language, getText, maybeLocaleText } = useLocale();
  const { createPrompt, setStoreLibrary } = useLayout();
  const { listProjects, getProject, renameProject, duplicateProject, deleteProject } = useEditor();

  const getProjects = () => {
    listProjects().then((allProjects) => {
      setProjects(
        allProjects
          .sort((a, b) => b.modifiedDate - a.modifiedDate)
          .filter((_, i) => i < DISPLAY_PROJECTS_COUNTS)
          .map((item) => ({
            key: item.key,
            name: item.name || (
              <>
                <Text
                  id="gui.defaultProject.shortname"
                  defaultMessage="Project"
                />
                {` [${item.key.toUpperCase()}]`}
              </>
            ),
            image: item.image,
          })),
      );
      setCounts(allProjects.length);
    });
  };
  useEffect(getProjects, []);

  useEffect(() => {
    loadinWorkspaces.then((allWorkspaces) => {
      setData(
        allWorkspaces.map((workspaceInfo) =>
          Object.assign(
            {
              ...workspaceInfo,
              onSelect: () => onOpenWorkspace(item.package),
            },
            // translations
            workspaceInfo.translations && workspaceInfo.translations[language]
              ? {
                  name: workspaceInfo.translations[language].name || workspaceInfo.name,
                  description: workspaceInfo.translations[language].description || workspaceInfo.description,
                  collaborator: workspaceInfo.translations[language].collaborator || workspaceInfo.collaborator,
                }
              : {},
          ),
        ),
      );
    });
  }, []);

  return (
    <div className={styles.workspaceWrapper}>
      <CoverPages
        className={styles.gettingStarted}
        pages={makeCoverPages(onOpenWorkspace, onOpenProject)}
      />

      {projects.length > 0 && (
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
                onClick={() => setStoreLibrary(true)}
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
            {projects.map((item, index) => (
              <ContextMenu
                menuItems={[
                  [
                    {
                      label: getText('gui.projects.contextMenu.rename', 'rename'),
                      onClick: () => {
                        createPrompt({
                          title: getText('gui.projects.contextMenu.rename', 'rename'),
                          label: getText('gui.menuBar.projectTitlePlaceholder', 'Project title here'),
                          inputMode: true,
                          defaultValue: maybeLocaleText(item.name),
                          onSubmit: async (name) => {
                            if (name) {
                              await renameProject(item.key, name);
                              getProjects();
                            }
                          },
                        });
                      },
                    },
                    {
                      label: getText('gui.projects.contextMenu.duplicate', 'duplicate'),
                      onClick: async () => {
                        await duplicateProject(item.key);
                        getProjects();
                      },
                    },
                  ],
                  [
                    {
                      label: getText('gui.projects.contextMenu.delete', 'delete'),
                      className: styles.deleteMenuItem,
                      onClick: async () => {
                        await deleteProject(item.key);
                        getProjects();
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
        {data.map((item, index) => (
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
            createPrompt({
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
            createPrompt({
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
