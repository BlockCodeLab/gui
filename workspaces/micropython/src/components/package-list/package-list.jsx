import { useLocale } from '@blockcode/core';
import { ComingSoon } from '@blockcode/ui';
import styles from './package-list.module.css';
import iconAddPackage from './icon-add-package.svg';

export default function PackageList() {
  const { getText } = useLocale();
  return (
    <div className={styles.packageList}>
      <div className={styles.listWrapper}></div>

      <ComingSoon placement="right">
        <div className={styles.packageButton}>
          <button
            className={styles.button}
            title={getText('micropython.packageList.addPackage', 'Add')}
          >
            <img
              className={styles.buttonIcon}
              src={iconAddPackage}
              title="Add"
            />
          </button>
        </div>
      </ComingSoon>
    </div>
  );
}
