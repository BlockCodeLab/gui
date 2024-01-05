import classNames from 'classnames';
import { useLocale, supportLanguages } from '@blockcode/core';
import { Menu, MenuItem, MenuSection, ComingSoon } from '@blockcode/ui';

/* components */
import MainMenu from './main-menu';
import MenuLabel from './menu-label';
import TutorialsButton from './tutorials-button';
import ProjectTitleInput from './project-title-input';

/* styles and assets */
import styles from './menu-bar.module.css';
import checkIcon from './icon-check.svg';
import languageIcon from './icon-language.svg';
import dropdownCaret from './icon-dropdown-caret.svg';

const mapMenuItems = (menuItems) =>
  menuItems &&
  menuItems.map((menu, index) =>
    Array.isArray(menu) ? (
      <MenuSection key={index}>{mapMenuItems(menu)}</MenuSection>
    ) : (
      <MenuItem
        key={index}
        className={styles.menuItem}
        hotkey={menu.hotkey}
        onDisable={menu.onDisable}
        onLabel={menu.onLabel}
        onClick={menu.onClick}
      >
        {menu.label}
      </MenuItem>
    )
  );

export default function MenuBar({ className, menus, tutorials, canEditProjectName }) {
  const { language: currentLanguage, setLanguage, getText } = useLocale();

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
            <img
              className={styles.languageCaret}
              src={dropdownCaret}
            />
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

          {menus &&
            menus.map(({ label, menuItems }, index) => (
              <>
                <MenuLabel
                  className={styles.menuBarItem}
                  name={index}
                  key={index}
                >
                  {label}
                </MenuLabel>
                {menuItems && menuItems.length && (
                  <Menu
                    className={styles.menu}
                    name={index}
                    key={index}
                  >
                    {mapMenuItems(menuItems)}
                  </Menu>
                )}
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
    </div>
  );
}
