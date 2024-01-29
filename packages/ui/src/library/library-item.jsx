import classNames from 'classnames';
import { Text } from '@blockcode/core';

import styles from './library-item.module.css';
import iconBlocks from './icons/icon-blocks.svg';
import iconMicroPython from './icons/icon-micropython.svg';
import iconBluetooth from './icons/icon-bluetooth.svg';
import iconInternet from './icons/icon-internet.svg';

export function LibraryItem(props) {
  return props.featured ? (
    <div
      className={classNames(styles.libraryItem, styles.featuredItem, {
        [styles.disabled]: props.disabled,
        [styles.hidden]: props.hidden,
        [styles.libraryItemFeatured]: props.featured,
      })}
      onClick={props.onSelect}
    >
      <div className={styles.featuredImageContainer}>
        {props.disabled ? (
          <div className={classNames(styles.cornerText, styles.comingSoonText)}>
            <Text
              id="gui.library.comingSoon"
              defaultMessage="Coming Soon"
            />
          </div>
        ) : (
          props.preview && (
            <div className={classNames(styles.cornerText, styles.previewText)}>
              <Text
                id="gui.library.preview"
                defaultMessage="Preview"
              />
            </div>
          )
        )}
        <img
          className={styles.featuredImage}
          src={props.image}
        />
      </div>
      {props.icon && (
        <div className={styles.libraryItemInsetImageContainer}>
          <img
            className={styles.libraryItemInsetImage}
            src={props.icon}
          />
        </div>
      )}
      <div className={styles.featuredText}>
        <span className={styles.libraryItemName}>{props.name}</span>
        <br />
        <span className={styles.featuredDescription}>{props.description}</span>
      </div>
      {(props.blocksRequired ||
        props.micropythonRequired ||
        props.bluetoothRequired ||
        props.internetRequired ||
        props.collaborator) && (
        <div className={styles.featuredMetadata}>
          <div className={styles.featuredRequirement}>
            {(props.blocksRequired ||
              props.micropythonRequired ||
              props.bluetoothRequired ||
              props.internetRequired) && (
              <div>
                <div>
                  {props.blocksRequired || props.micropythonRequired ? (
                    <Text
                      id="gui.library.programming"
                      defaultMessage="Programming"
                    />
                  ) : (
                    <Text
                      id="gui.library.requires"
                      defaultMessage="Requires"
                    />
                  )}
                </div>
                <div className={styles.featuredMetadataDetail}>
                  {props.blocksRequired && <img src={iconBlocks} />}
                  {props.micropythonRequired && <img src={iconMicroPython} />}
                  {props.bluetoothRequired && <img src={iconBluetooth} />}
                  {props.internetRequired && <img src={iconInternet} />}
                </div>
              </div>
            )}
          </div>
          <div className={styles.featuredCollaboration}>
            {props.collaborator && (
              <div>
                <div>
                  <Text
                    id="gui.library.collaboration"
                    defaultMessage="Collaboration with"
                  />
                </div>
                <div className={styles.featuredMetadataDetail}>{props.collaborator}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      className={classNames(styles.libraryItem, {
        [styles.hidden]: props.hidden,
      })}
      onBlur={props.onBlur}
      onClick={props.onSelect}
      onFocus={props.onFocus}
      onKeyPress={props.onKeyPress}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {/* Layers of wrapping is to prevent layout thrashing on animation */}
      <div className={styles.libraryItemImageContainerWrapper}>
        <div
          className={styles.libraryItemImageContainer}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          <img
            className={styles.libraryItemImage}
            src={props.image}
          />
        </div>
      </div>
      <span className={styles.libraryItemName}>{props.name}</span>
    </div>
  );
}
