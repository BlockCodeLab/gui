import { useLocale } from '@blockcode/core';
import { ToggleButtons, Tooltip } from '@blockcode/ui';
import RotationStyle from '../../lib/rotation-style';

import styles from './direction-picker.module.css';
import dialIcon from './icon-dial.svg';
import handleIcon from './icon-handle.svg';
import allAroundIcon from './icon-all-around.svg';
import dontRotateIcon from './icon-dont-rotate.svg';
import leftRightIcon from './icon-left-right.svg';

const RADIUS = 56;

export default function DirectionPicker({ direction, rotationStyle, children, onChange, onChangeRotationStyle }) {
  const { getText } = useLocale();

  const createGaugePath = () => {
    const rads = direction * (Math.PI / 180);
    const path = [];
    path.push(`M ${RADIUS} 0`);
    path.push(`L ${RADIUS} ${RADIUS}`);
    path.push(`L ${RADIUS + RADIUS * Math.sin(rads)} ${RADIUS - RADIUS * Math.cos(rads)}`);
    path.push(`A ${RADIUS} ${RADIUS} 0 0 ${direction < 0 ? 1 : 0} ${RADIUS} 0`);
    path.push(`Z`);
    return path.join(' ');
  };

  const directionToMouse = (target, cx, cy) => {
    const bbox = target.parentElement.getBoundingClientRect();
    const dy = bbox.top + bbox.height / 2;
    const dx = bbox.left + bbox.width / 2;
    const angle = Math.atan2(cy - dy, cx - dx);
    const degrees = angle * (180 / Math.PI);
    return degrees + 90; // To correspond with scratch coordinate system
  };

  const handleDirectionMouseDown = (e) => {
    e.stopPropagation();
    const target = e.target;
    const mouseMove = (e) => {
      e.preventDefault();
      let direction = directionToMouse(target, e.clientX, e.clientY);
      if (direction > 180) direction += -360;
      if (direction < -180) direction += 360;
      onChange(direction);
    };
    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };

  return (
    <Tooltip
      clickable
      placement="top"
      className={styles.pickerTooltip}
      content={
        <>
          <div className={styles.dialWrapper}>
            <img
              draggable={false}
              src={dialIcon}
            />
            <svg
              className={styles.dialGauge}
              width={RADIUS * 2}
              height={RADIUS * 2}
            >
              <path
                className={styles.dialGaugePath}
                d={createGaugePath()}
              />
            </svg>
            <img
              draggable={false}
              className={styles.dialHandle}
              src={handleIcon}
              style={{
                top: `${RADIUS - RADIUS * Math.cos(direction * (Math.PI / 180))}px`,
                left: `${RADIUS + RADIUS * Math.sin(direction * (Math.PI / 180))}px`,
                transform: `rotate(${direction}deg)`,
              }}
              onMouseDown={handleDirectionMouseDown}
            />
          </div>
          <div className={styles.buttonGroup}>
            <ToggleButtons
              items={[
                {
                  icon: allAroundIcon,
                  title: getText('arcade.directionPicker.allAround', 'All Around'),
                  value: RotationStyle.ALL_AROUND,
                },
                {
                  icon: leftRightIcon,
                  title: getText('arcade.directionPicker.leftRight', 'Left/Right'),
                  value: RotationStyle.HORIZONTAL_FLIP,
                },
                {
                  icon: dontRotateIcon,
                  title: getText('arcade.directionPicker.dontRotate', 'Do not rotate'),
                  value: RotationStyle.DONOT_ROTATE,
                },
              ]}
              value={rotationStyle}
              onChange={onChangeRotationStyle}
            />
          </div>
        </>
      }
    >
      {children}
    </Tooltip>
  );
}
