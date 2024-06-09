import styles from "./Button.module.css";
function Button({ type, children, onClick }) {
  console.log(onClick);
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
