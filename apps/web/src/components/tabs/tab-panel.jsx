import classNames from 'classnames';
import styles from './tabs.module.css';

export default function TabPanel({ id, className, name, children }) {
  return (
    <div
      className={classNames(styles.tabPanel, className)}
      id={`${id}-panel-${name}`}
    >
      {children}
    </div>
  );
}
