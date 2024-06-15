import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import { useCities } from "../Contexts/CityContext";

function Logo() {
  const { setIsChecked } = useCities();
  return (
    <Link to="/" onClick={() => setIsChecked(false)}>
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
