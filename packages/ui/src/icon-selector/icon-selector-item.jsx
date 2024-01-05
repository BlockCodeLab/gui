import classNames from 'classnames';
import { ContextMenu } from '../context-menu/context-menu';
import { DeleteButton } from './delete-button';
import styles from './icon-selector-item.module.css';

export function IconSelectorItem({
  id,
  name,
  title,
  details,
  icon,
  order,
  checked,
  className,
  onSelect,
  onDelete,
  contextMenu,
}) {
  return (
    <ContextMenu menuItems={contextMenu}>
      <input
        checked={checked}
        className={styles.selector}
        id={`${id}-icon-${name}`}
        name={`${id}-icon`}
        style={`order:${order * 2 - 1}`}
        type="radio"
        value={name}
      />
      <label
        className={classNames(styles.iconSelectorItem, className)}
        for={`${id}-icon-${name}`}
        onClick={onSelect}
        style={`order:${order * 2}`}
      >
        <div className={styles.iconOuter}>
          <img
            className={styles.iconInner}
            src={icon}
          />
        </div>
        <div className={styles.iconInfo}>
          <div className={styles.iconTitle}>{title}</div>
          {details && <div className={styles.iconDetails}>{details}</div>}
        </div>
        {onDelete && (
          <DeleteButton
            className={styles.deleteButton}
            onClick={onDelete}
          />
        )}
      </label>
    </ContextMenu>
  );
}
