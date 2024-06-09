import styles from "./PhoneNavigationPanal.module.css";

function PhoneNavigationPanal({
  bgCl = "white",
  children,
  className,
  size = "5rem",
  top = "6rem",
  right = "12rem",
  color = "green",
  onChecked,
  isChecked,
  radialColors = ["#d6ffa5", "#397a1a"],
  arr = [],
}) {
  const [radialColor1, radialColor2] = radialColors;
  const handleChecked = (e) => {
    onChecked(() => e.target.checked);
  };
  return (
    <>
      <div
        className={styles.checkBoxContainer}
        style={{
          height: size,
          width: size,
          top: top,
          right: right,
          backgroundColor: bgCl,
          color: color,
        }}
      >
        <div className={styles.icon}></div>
        <div className={styles.icon}></div>
        <div className={styles.icon}></div>
      </div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
        className={styles.checkbox}
        style={{
          height: size,
          width: size,
          top: top,
          right: right,
          backgroundColor: bgCl,
        }}
      />
      <div
        className={styles.navigationBg}
        style={{
          height: size,
          width: size,
          top: top,
          right: right,
          background: `radial-gradient(circle, ${radialColor1}, ${radialColor2})`,
        }}
      ></div>
      {isChecked && <div className={styles.ulContainer}>{children}</div>}
    </>
  );
}

export default PhoneNavigationPanal;
