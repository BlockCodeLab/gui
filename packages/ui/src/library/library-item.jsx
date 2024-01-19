import classNames from 'classnames';
import { Text } from '@blockcode/core';

import styles from './library-item.module.css';
import iconBluetooth from './icons/icon-bluetooth.svg';
import iconInternet from './icons/icon-internet.svg';
import iconUSB from './icons/icon-usb.svg';

export default function LibraryItem(props) {
  return props.featured ? (
    <div
      className={classNames(styles.libraryItem, styles.featuredItem, {
        [styles.disabled]: props.disabled,
        [styles.hidden]: props.hidden,
        [styles.libraryItemExtension]: props.extensionId,
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
      <div
        className={classNames(styles.featuredText, {
          [styles.featuredExtensionText]: props.extensionId,
        })}
      >
        <span className={styles.libraryItemName}>{props.name}</span>
        <br />
        <span className={styles.featuredDescription}>{props.description}</span>
      </div>
      {(props.bluetoothRequired || props.internetConnectionRequired || props.collaborator) && (
        <div className={styles.featuredExtensionMetadata}>
          <div className={styles.featuredExtensionRequirement}>
            {(props.bluetoothRequired ||
              props.circuitRequired ||
              props.internetConnectionRequired ||
              props.usbConnectionRequired) && (
              <div>
                <div>
                  <Text
                    id="gui.library.requires"
                    defaultMessage="Requires"
                  />
                </div>
                <div className={styles.featuredExtensionMetadataDetail}>
                  {props.bluetoothRequired && <img src={iconBluetooth} />}
                  {props.internetRequired && <img src={iconInternet} />}
                  {props.usbRequired && <img src={iconUSB} />}
                </div>
              </div>
            )}
          </div>
          <div className={styles.featuredExtensionCollaboration}>
            {props.collaborator && (
              <div>
                <div>
                  <Text
                    id="gui.library.collaboration"
                    defaultMessage="Collaboration with"
                  />
                </div>
                <div className={styles.featuredExtensionMetadataDetail}>{props.collaborator}</div>
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
