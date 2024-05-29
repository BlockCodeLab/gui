import classNames from 'classnames';
import { useState, useEffect } from 'preact/hooks';
import { Text } from '@blockcode/core';
import { ContextMenu } from '../context-menu/context-menu';
import { Modal } from '../modal/modal';
import { Spinner } from '../spinner/spinner';
import { LibraryItem } from './library-item';
import { Filter } from './filter';
import { TagButton } from './tag-button';

import styles from './library.module.css';

export function Library({
  loading: defaultLoading,
  title,
  filterable,
  filterPlaceholder,
  emptyText,
  tags,
  items,
  onClose,
}) {
  const [data, setData] = useState([]);
  const [tag, setTag] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const filterEeggItems = items.filter((item) => !item.eegg);

  useEffect(() => {
    setData(filterEeggItems);
  }, [items]);

  useEffect(() => {
    setLoading(defaultLoading);
  }, [defaultLoading]);

  const handleFilterChange = (e) => {
    setQuery(e.target.value);
    setTag('all');
    const query = e.target.value.toLowerCase();
    setData(
      items.filter((item) =>
        item.eegg
          ? item.id === query || item.name.toLowerCase() === query // for search eegg item
          : (item.id && item.id.toLowerCase().includes(query)) ||
            item.name.toLowerCase().includes(query) ||
            item.tags.includes(query),
      ),
    );
  };

  const handleFilterClear = () => {
    setQuery('');
    setData(filterEeggItems);
  };

  const handleTagClick = (tag) => {
    setTag(tag);
    setData(filterEeggItems.filter((item) => (tag === 'all' ? true : item.tags.includes(tag))));
  };

  return (
    <Modal
      fullScreen
      title={title}
      onClose={onClose}
    >
      {(filterable || tags) && (
        <div className={styles.filterBar}>
          {filterable && (
            <Filter
              className={classNames(styles.filterBarItem, styles.filter)}
              inputClassName={styles.filterInput}
              query={query}
              placeholder={filterPlaceholder}
              onChange={handleFilterChange}
              onClear={handleFilterClear}
            />
          )}
          {filterable && tags && <div className={styles.divider} />}
          {tags && (
            <div className={styles.tagWrapper}>
              <TagButton
                active={tag === 'all'}
                className={classNames(styles.filterBarItem, styles.tagButton)}
                onClick={() => handleTagClick('all')}
              >
                <Text
                  id="gui.library.all"
                  defaultMessage="All"
                />
              </TagButton>
              {tags.map((tagItem, index) => (
                <TagButton
                  key={index}
                  active={tag === tagItem.tag.toLowerCase()}
                  className={classNames(styles.filterBarItem, styles.tagButton)}
                  onClick={() => handleTagClick(tagItem.tag.toLowerCase())}
                >
                  {tagItem.label}
                </TagButton>
              ))}
            </div>
          )}
        </div>
      )}
      <div
        className={classNames(styles.libraryScrollGrid, {
          [styles.withFilterBar]: filterable || tags,
        })}
      >
        {data && data.length > 0 ? (
          data
            .filter((item) => (DEVELOPMENT ? true : !item.disabled && !item.preview))
            .map((dataItem, index) => (
              <ContextMenu
                menuItems={dataItem.contextMenu}
                key={index}
              >
                <LibraryItem
                  id={index}
                  disabled={dataItem.disabled}
                  preview={dataItem.preview}
                  featured={dataItem.featured}
                  icon={dataItem.icon}
                  image={dataItem.image}
                  name={dataItem.name}
                  description={dataItem.description}
                  bluetoothRequired={dataItem.bluetoothRequired}
                  internetRequired={dataItem.internetRequired}
                  popsicleRequired={dataItem.popsicleRequired}
                  dupontRequired={dataItem.dupontRequired}
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
