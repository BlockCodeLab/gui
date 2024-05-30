import { useRef, useEffect, useState } from 'preact/hooks';
import { useLayout } from '@blockcode/core';
import { classNames, Text, Button } from '@blockcode/ui';

import styles from './tutorial-box.module.css';
import tutorialsIcon from '../menu-bar/icons/icon-tutorials.svg';
import coursesIcon from '../menu-bar/icons/icon-courses.svg';
import shrinkIcon from './icon-shrink.svg';
import expandIcon from './icon-expand.svg';
import closeIcon from './icon-close.svg';
import arrowIcon from './icon-arrow.svg';

export default function TutorialBox({ tutorialId, onBack, onClose }) {
  const cardRef = useRef();
  const { tutorials } = useLayout();
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [index, setIndex] = useState(0);

  const page = data[index];

  const nextPage = () => setIndex((index + 1) % data.length);

  const prevPage = () => setIndex((index - 1) % data.length);

  const openTutorial = (id) => {
    const tutorial = tutorials?.lessons[id];
    if (!tutorial) {
      onClose();
      return;
    }
    setData(
      [].concat(
        tutorial.pages,
        tutorial.next
          ? {
              next: tutorial.next
                .filter((id) => tutorials.lessons[id])
                .map((id) => ({
                  id,
                  title: tutorials.lessons[id].title,
                  image: tutorials.lessons[id].image,
                })),
            }
          : [],
      ),
    );
    setIndex(0);
  };

  useEffect(() => {
    openTutorial(tutorialId);
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      const tutorialBox = cardRef.current.parentElement;
      let posX;
      let posY;

      const drag = (e) => {
        const x = posX - e.clientX;
        const y = posY - e.clientY;
        posX = e.clientX;
        posY = e.clientY;
        tutorialBox.style.top = `${tutorialBox.offsetTop - y}px`;
        tutorialBox.style.left = `${tutorialBox.offsetLeft - x}px`;
      };

      const endDrag = () => {
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('mousemove', drag);
      };

      cardRef.current.addEventListener('mousedown', (e) => {
        posX = e.clientX;
        posY = e.clientY;
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('mousemove', drag);
      });
    }
  }, [cardRef]);

  return (
    <div className={styles.tutorialBoxWrapper}>
      <div
        ref={cardRef}
        className={styles.tutorialCard}
      >
        <div className={styles.cardHeader}>
          <div
            className={styles.headerButton}
            onClick={onBack}
          >
            {tutorials?.type === 'course' ? (
              <>
                <img
                  className={styles.buttonIcon}
                  src={coursesIcon}
                />
                <Text
                  id="gui.menuBar.courses"
                  defaultMessage="Couress"
                />
              </>
            ) : (
              <>
                <img
                  className={styles.buttonIcon}
                  src={tutorialsIcon}
                />
                <Text
                  id="gui.menuBar.tutorials"
                  defaultMessage="Tutorials"
                />
              </>
            )}
          </div>
          <div className={styles.stepList}>
            {data.map((_, i) => (
              <div
                key={i}
                className={classNames(styles.stepPip, {
                  [styles.actived]: i === index,
                })}
                onClick={() => setIndex(i)}
              ></div>
            ))}
          </div>
          <div className={styles.headerButtonGroup}>
            <div
              className={styles.headerButton}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <img
                    className={styles.buttonIcon}
                    src={shrinkIcon}
                  />
                  <Text
                    id="gui.tutorials.shrink"
                    defaultMessage="Shrink"
                  />
                </>
              ) : (
                <>
                  <img
                    className={styles.buttonIcon}
                    src={expandIcon}
                  />
                  <Text
                    id="gui.tutorials.expand"
                    defaultMessage="Expand"
                  />
                </>
              )}
            </div>
            <div
              className={styles.headerButton}
              onClick={onClose}
            >
              <img
                className={styles.buttonIcon}
                src={closeIcon}
              />
              <Text
                id="gui.tutorials.close"
                defaultMessage="Close"
              />
            </div>
          </div>
        </div>
        {expanded && page && (
          <div className={styles.cardBody}>
            {(page.title || page.next) && (
              <div className={styles.title}>
                {page.title || (
                  <Text
                    id="gui.tutorials.moreTry"
                    defaultMessage="More things to try!"
                  />
                )}
              </div>
            )}
            {page.image && (
              <img
                className={styles.image}
                src={page.image}
              />
            )}
            {page.text && <div className={styles.text}>{page.text}</div>}
            {page.next && (
              <>
                <div className={styles.more}>
                  {page.next.map((item) => (
                    <div
                      key={item.id}
                      className={styles.moreItem}
                      onClick={() => openTutorial(item.id)}
                    >
                      <img
                        className={styles.moreItemImage}
                        src={item.image}
                      />
                      <div className={styles.moreItemName}>{item.title}</div>
                    </div>
                  ))}
                </div>
                <Button
                  className={styles.seeMoreButton}
                  onClick={onBack}
                >
                  <Text
                    id="gui.tutorials.seeMore"
                    defaultMessage="See more"
                  />
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {expanded && index > 0 && (
        <>
          <div className={styles.leftPage}></div>
          <div
            className={styles.leftButton}
            onClick={prevPage}
          >
            <img src={arrowIcon} />
          </div>
        </>
      )}

      {expanded && index < data.length - 1 && (
        <>
          <div className={styles.rightPage}></div>
          <div
            className={styles.rightButton}
            onClick={nextPage}
          >
            <img src={arrowIcon} />
          </div>
        </>
      )}
    </div>
  );
}
