import { IconSelectorItem } from './icon-selector-item';
import styles from './icon-selector.module.css';

const defaultID = styles.iconSelectorWrapper.split('_')[0];

export function IconSelector({ id, items, selectedIndex, onDelete, onSelect }) {
  const buildHandler = (i, item, handler) => (e) => {
    e.stopPropagation();
    if (handler) handler(i, item);
  };
  return (
    <div className={styles.iconSelectorWrapper}>
      <div className={styles.itemsWrapper}>
        {items &&
          items.map((item, i) =>
            item.__hidden__ ? null : (
              <IconSelectorItem
                checked={i === selectedIndex}
                className={styles.iconItem}
                contextMenu={item.contextMenu}
                details={item.details}
                icon={item.icon}
                id={id || defaultID}
                key={item.title}
                name={i}
                order={item.order}
                title={item.name}
                onSelect={buildHandler(i, item, onSelect)}
                onDelete={onDelete && buildHandler(i, item, onDelete)}
              />
            )
          )}
      </div>
    </div>
  );
}
