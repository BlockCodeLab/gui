import styles from './label.module.css';

export function Label(props) {
  return (
    <label className={props.above ? styles.inputGroupColumn : styles.inputGroup}>
      <span className={props.secondary ? styles.inputLabelSecondary : styles.inputLabel}>{props.text}</span>
      {props.children}
    </label>
  );
}
