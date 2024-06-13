import styles from "./Spinner.module.css";

function Spinner({ size = "6rem" }) {
  return (
    <div className={styles.spinnerContainer}>
      <div
        className={styles.spinner}
        style={{ height: size, width: size }}
      ></div>
    </div>
  );
}

export default Spinner;
