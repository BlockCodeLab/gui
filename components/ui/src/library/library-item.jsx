import classNames from 'classnames';
import { Text } from '@blockcode/core';

import styles from './library-item.module.css';
import iconBlocks from './icons/icon-blocks.svg';
import iconMicroPython from './icons/icon-micropython.svg';
import iconBluetooth from './icons/icon-bluetooth.svg';
import iconInternet from './icons/icon-internet.svg';
import iconPopsicle from './icons/icon-popsicle.svg';
import iconDupont from './icons/icon-dupont.svg';

export function LibraryItem(props) {
  return props.featured ? (
    <div
      className={classNames(styles.libraryItem, styles.featuredItem, {
        [styles.disabled]: props.disabled,
        [styles.libraryItemFeatured]: props.featured,
      })}
      onClick={!props.disabled && props.onSelect}
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
        props.popsicleRequired ||
        props.dupontRequired ||
        props.collaborator) && (
        <div className={styles.featuredMetadata}>
          <div className={styles.featuredRequirement}>
            {(props.blocksRequired ||
              props.micropythonRequired ||
              props.bluetoothRequired ||
              props.internetRequired ||
              props.popsicleRequired ||
              props.dupontRequired) && (
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
                  {props.popsicleRequired && <img src={iconPopsicle} />}
                  {props.dupontRequired && <img src={iconDupont} />}
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
      className={styles.libraryItem}
      onClick={props.onSelect}
    >
      <div className={styles.libraryItemImageContainerWrapper}>
        <div className={styles.libraryItemImageContainer}>
          <img
            className={styles.libraryItemImage}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            src={props.image}
          />
        </div>
      </div>
      <span className={styles.libraryItemName}>{props.name}</span>
    </div>
  );
}
