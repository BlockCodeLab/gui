import { supportLanguages, useLocale, useLayout } from '@blockcode/core';
import { classNames, Menu, MenuItem, ComingSoon } from '@blockcode/ui';

/* components */
import MainMenu from './main-menu';
import MenuLabel from './menu-label';
import TutorialsButton from './tutorials-button';
import ProjectTitleInput from './project-title-input';

/* styles and assets */
import styles from './menu-bar.module.css';
import checkIcon from './icons/icon-check.svg';
import languageIcon from './icons/icon-language.svg';
import dropdownCaret from './icons/icon-dropdown-caret.svg';
import homeIcon from './icons/icon-home.svg';

export default function MenuBar({ className, showHomeButton, onRequestHome }) {
  const { language: currentLanguage, setLanguage, getText } = useLocale();
  const { mainMenu, tutorials, canEditProjectName } = useLayout();

  return (
    <div className={classNames(styles.menuBar, className)}>
      <div className={styles.mainMenu}>
        <MainMenu id={styles.mainMenu}>
          <MenuLabel
            className={classNames(styles.menuBarItem, styles.languageLabel)}
            name="language-selector"
          >
            <img
              className={styles.languageIcon}
              src={languageIcon}
            />
            <img src={dropdownCaret} />
          </MenuLabel>
          <Menu
            className={styles.menu}
            name="language-selector"
          >
            {Array.from(supportLanguages.entries()).map(([language, locale]) => (
              <MenuItem
                key={language}
                className={styles.menuItem}
                onClick={() => setLanguage(language)}
              >
                <img
                  className={classNames(styles.checkIcon, {
                    [styles.checked]: language === currentLanguage,
                  })}
                  src={checkIcon}
                />
                {locale.language}
              </MenuItem>
            ))}
          </Menu>

          {mainMenu &&
            mainMenu.map(({ icon, label, Menu: Submenu }, index) => (
              <>
                <MenuLabel
                  className={styles.menuBarItem}
                  name={index}
                  key={index}
                >
                  {icon && <img src={icon} />}
                  {label}
                </MenuLabel>
                <Menu
                  className={styles.menu}
                  name={index}
                  key={index}
                >
                  {<Submenu itemClassName={styles.menuItem} />}
                </Menu>
              </>
            ))}
        </MainMenu>

        {tutorials && (
          <ComingSoon placement="bottom">
            <TutorialsButton tutorials={tutorials} />
          </ComingSoon>
        )}

        {canEditProjectName && (
          <ProjectTitleInput
            placeholder={getText('gui.menuBar.projectTitlePlaceholder', 'Project title here')}
            defaultValue={getText('gui.defaultProject.name', 'BlockCode Project')}
          />
        )}
      </div>

      <div className={styles.rightMenu}>
        {showHomeButton && (
          <div
            className={classNames(styles.menuBarItem, styles.hoverable)}
            onClick={onRequestHome}
          >
            <img
              className={styles.homeIcon}
              src={homeIcon}
            />
          </div>
        )}
      </div>
    </div>
  );
}
