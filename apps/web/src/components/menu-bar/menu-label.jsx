import classNames from 'classnames';
import { injectStyle } from '../../lib/inject-style';
import styles from './menu-bar.module.css';

export default function MenuLabel({ id, className, checked, children, name }) {
  const handleChange = ({ target }) => {
    const handler = () => {
      target.checked = false;
      globalThis.document.removeEventListener('mousedown', handler);
    };
    globalThis.document.addEventListener('mousedown', handler);
  };

  const setStyle = (target) => {
    const left = target.getBoundingClientRect().left;
    injectStyle({
      [`#${id}-menu-${name}`]: {
        left: `${left}px`,
      },
    });
  };

  const handleClick = ({ target }) => {
    if (target.classList.contains(styles.menuLabel)) {
      setStyle(target);
    } else {
      setStyle(target.parentElement);
    }
  };

  return (
    <>
      <input
        checked={checked}
        className={styles.menuLabel}
        id={`${id}-label-${name}`}
        name={`${id}-menu`}
        type="radio"
        value={name}
        onChange={handleChange}
      />
      <label
        className={classNames(styles.menuLabel, className)}
        for={`${id}-label-${name}`}
        onClick={handleClick}
      >
        {children}
      </label>
    </>
  );
}
