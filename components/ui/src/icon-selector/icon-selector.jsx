import classNames from 'classnames';
import { useRef } from 'preact/hooks';
import { IconSelectorItem } from './icon-selector-item';
import styles from './icon-selector.module.css';

const defaultID = styles.iconSelectorWrapper.split('_')[0];

export function IconSelector({ className, id, displayOrder, items, selectedIndex, onDelete, onSelect }) {
  const ref = useRef();
  const buildHandler = (i, item, handler) => (e) => {
    e.stopPropagation();
    if (handler) handler(i, item);
  };

  if (ref.current) {
    const { top } = ref.current.getBoundingClientRect();
    const height = window.innerHeight - top;
    ref.current.style.height = `${height}px`;
  }

  return (
    <div
      ref={ref}
      className={classNames(styles.iconSelectorWrapper, className)}
    >
      <div className={styles.itemsWrapper}>
        {items &&
          items.map((item, i) =>
            item.__hidden__ ? null : (
              <IconSelectorItem
                checked={i === selectedIndex}
                displayOrder={displayOrder}
                className={classNames(styles.iconItem, item.className)}
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
            ),
          )}
      </div>
    </div>
  );
}
