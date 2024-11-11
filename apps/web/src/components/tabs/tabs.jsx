import { cloneElement } from 'preact';
import { flatChildren } from '@blockcode/core';
import { classNames } from '@blockcode/ui';
import { injectStyle } from '../../lib/inject-style';

/* components */
import TabLabel from './tab-label';
import TabPanel from './tab-panel';

/* styles */
import styles from './tabs.module.css';

export { TabLabel, TabPanel };

export default function Tabs({ id, className, children }) {
  const tabs = flatChildren(children)
    .filter((child) => child)
    .map((child) => cloneElement(child, { id }));

  injectStyle({
    [`.${styles.tab}:checked+.${styles.tabLabel}`]: {
      zIndex: `${tabs.length + 1}`,
    },
  });

  return (
    <div className={classNames(styles.tabsWrapper, className)}>
      {tabs
        .filter((child) => child.type === TabLabel)
        .map((child, i, labels) => {
          injectStyle({
            [`.${styles.tabLabel}:nth-of-type(${i + 1})`]: {
              zIndex: `${labels.length - i}`,
            },
          });
          return child;
        })}
      {tabs
        .filter((child) => child.type === TabPanel)
        .map((child) => {
          const tabId = `${id}-tab-${child.props.name}`;
          const panelId = `${id}-panel-${child.props.name}`;
          injectStyle({
            [`#${tabId}:checked~#${panelId}`]: {
              transform: 'none',
            },
          });
          return child;
        })}
    </div>
  );
}
