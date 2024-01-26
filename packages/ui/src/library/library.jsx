import classNames from 'classnames';
import { useState, useEffect } from 'preact/hooks';
import { ContextMenu } from '../context-menu/context-menu';
import { Modal } from '../modal/modal';
import { Spinner } from '../spinner/spinner';
import LibraryItem from './library-item';

import styles from './library.module.css';

export function Library({ title, filterable, filterPlaceholder, emptyText, tags, items, onClose }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(items);
  }, [items]);

  const handleFilterChange = () => {};
  const handleFilterClear = () => setData(items);

  return (
    <Modal
      fullScreen
      title={title}
      onClose={onClose}
    >
      {/* {(filterable || tags) && (
        <div className={styles.filterBar}>
          {filterable && (
            <Filter
              className={classNames(styles.filterBarItem, styles.filter)}
              query={query}
              placeholder={filterPlaceholder}
              onChange={handleFilterChange}
              onClear={handleFilterClear}
            />
          )}
          {filterable && tags && <div className={styles.divider} />}
          {tags && (
            <div className={styles.tagWrapper}>
              {tagListPrefix.concat(tags).map((tagProps, id) => (
                <TagButton
                  active={this.state.selectedTag === tagProps.tag.toLowerCase()}
                  className={classNames(styles.filterBarItem, styles.tagButton, tagProps.className)}
                  key={`tag-button-${id}`}
                  onClick={this.handleTagClick}
                  {...tagProps}
                />
              ))}
            </div>
          )}
        </div>
      )} */}
      <div
        className={classNames(styles.libraryScrollGrid, {
          [styles.withFilterBar]: filterable || tags,
        })}
      >
        {data && data.length > 0 ? (
          data.map((dataItem, index) => (
            <ContextMenu
              menuItems={dataItem.contextMenu}
              key={index}
            >
              <LibraryItem
                id={index}
                hidden={dataItem.hidden}
                disabled={dataItem.disabled}
                preview={dataItem.preview}
                featured={dataItem.featured}
                icon={dataItem.icon}
                image={dataItem.image}
                name={dataItem.name}
                description={dataItem.description}
                extensionId={dataItem.extensionId}
                internetRequired={dataItem.internetRequired}
                usbRequired={dataItem.usbRequired}
                bluetoothRequired={dataItem.bluetoothRequired}
                circuitRequired={dataItem.circuitRequired}
                collaborator={dataItem.collaborator}
                onMouseEnter={dataItem.onMouseEnter}
                onMouseLeave={dataItem.onMouseLeave}
                onSelect={dataItem.onSelect}
              />
            </ContextMenu>
          ))
        ) : (
          <div className={styles.spinnerWrapper}>
            {loading ? (
              <Spinner
                large
                level="primary"
              />
            ) : (
              emptyText || ''
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
