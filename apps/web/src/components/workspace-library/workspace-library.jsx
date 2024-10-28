import { useState, useEffect } from 'preact/hooks';
import { useLocale, useLayout, useEditor } from '@blockcode/core';
import { classNames, Text, ContextMenu, LibraryItem } from '@blockcode/ui';
import { version } from '../../../../../package.json';
import CoverPages from '../cover-pages/cover-pages';
import makeCoverPages from '../../lib/cover-pages/make-cover-pages';

import allWorkspaces from './workspaces';
import allExamples from './examples';

import styles from './workspace-library.module.css';

const loadingWorkspaces = Promise.all(allWorkspaces);

const DISPLAY_PROJECTS_COUNTS = 7;

export default function WorkspaceLibrary({ onOpenWorkspace, onOpenProject }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [examples, setExamples] = useState([]);
  const [projects, setProjects] = useState([]);
  const [counts, setCounts] = useState(0);

  const { language, getText, maybeLocaleText } = useLocale();
  const { createAlert, removeAlert, createPrompt, setStoreLibrary } = useLayout();
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
            image: item.thumb,
          })),
      );
      setCounts(allProjects.length);
    });
  };
  useEffect(getProjects, []);

  useEffect(() => {
    loadingWorkspaces.then((allWorkspaces) => {
      setWorkspaces(
        allWorkspaces
          .sort((a, b) => a.sortIndex - b.sortIndex)
          .map((workspaceInfo) =>
            Object.assign(
              {
                ...workspaceInfo,
                disabled: workspaceInfo.disabled || (!DEVELOPMENT && workspaceInfo.preview),
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

    let examples = [];
    if (language !== 'en') {
      examples = examples.concat(allExamples.en);
    }
    setExamples(examples.concat(allExamples[language] || []));
  }, [language]);

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

      {examples.length > 0 && (
        <>
          <div className={styles.libraryLabel}>
            <span>
              <Text
                id="gui.workspace.examples"
                defaultMessage="Wonderful examples"
              />
            </span>
          </div>
          <div className={styles.libraryScrollGrid}>
            {examples.map((item, index) => (
              <LibraryItem
                large
                id={index}
                name={item.name}
                image={item.thumb}
                onSelect={async () => {
                  createAlert('importing', { id: item.name });
                  const project = await fetch(item.uri).then((res) => res.json());
                  removeAlert(item.name);
                  onOpenProject(project);
                  if (item.alert) {
                    setTimeout(() => {
                      createPrompt({
                        title: project.name,
                        label: item.alert,
                      });
                    }, 500);
                  }
                }}
              />
            ))}
          </div>
        </>
      )}

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
              title: (
                <Text
                  id="gui.terms"
                  defaultMessage="Terms of Use"
                />
              ),
              content: (
                <Text
                  id="gui.terms.content"
                  defaultMessage="Terms of Use"
                />
              ),
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
              title: (
                <Text
                  id="gui.privacy"
                  defaultMessage="Privacy"
                />
              ),
              content: (
                <Text
                  id="gui.privacy.content"
                  defaultMessage="Privacy"
                />
              ),
            });
          }}
        >
          <Text
            id="gui.privacy"
            defaultMessage="Privacy"
          />
        </span>
        <span
          className={classNames(styles.footerItem, styles.link)}
          onClick={() => {
            createPrompt({
              title: (
                <Text
                  id="gui.about"
                  defaultMessage="About..."
                />
              ),
              body: (
                <div className={styles.aboutVersionContent}>
                  {workspaces
                    .filter((item) => !item.preview && !item.disabled)
                    .map((item) => (
                      <div className={styles.aboutVersionRow}>
                        <div>
                          <b>{item.name}</b>
                        </div>
                        <div>v{item.version}</div>
                      </div>
                    ))}
                </div>
              ),
            });
          }}
        >
          v{version}
        </span>
      </div>
    </div>
  );
}
