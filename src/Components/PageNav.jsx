import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import PhoneNavigationPanal from "./PhoneNavigationPanal";
import { useEffect, useState } from "react";

function Navigation() {
  const [isChecked, setIsCheked] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <Logo />

      <PhoneNavigationPanal
        color={"var(--color-brand--2)"}
        bgCl="lightyellow"
        top={isMobile ? "2rem" : "6rem"}
        right={isMobile ? "4rem" : "8rem"}
        radialColors={["black", "darkgreen"]}
        onChecked={setIsCheked}
        isChecked={isChecked}
      >
        <ul>
          <li className={styles.link}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </PhoneNavigationPanal>
    </nav>
  );
}

export default Navigation;
