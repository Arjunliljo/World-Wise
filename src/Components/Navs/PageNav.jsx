import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../UtilityComponents/Logo";
import PhoneNavigationPanal from "../LayoutComponents/PhoneNavigationPanal";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CityContext";
import { useAuth } from "../Contexts/Authenticate";
import Button from "../UtilityComponents/Button";

function Navigation() {
  const { isChecked, setIsChecked, isMobile } = useCities();
  const { LOGGED_IN, logout } = useAuth();
  const handelClick = () => setIsChecked(false);

  return (
    <nav className={styles.nav}>
      <Logo />

      {isMobile && (
        <PhoneNavigationPanal
          color={"var(--color-brand--2)"}
          bgCl="lightyellow"
          top={isMobile ? "2rem" : "6rem"}
          right={isMobile ? "4rem" : "8rem"}
          radialColors={["black", "darkgreen"]}
          onChecked={setIsChecked}
          isChecked={isChecked}
        >
          <ul>
            <li className={styles.link} onClick={handelClick}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className={styles.link} onClick={handelClick}>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li className={styles.link} onClick={handelClick}>
              <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li className={styles.link} onClick={handelClick}>
              {LOGGED_IN ? (
                <a onClick={logout}>Logout</a>
              ) : (
                <NavLink to={"/SignIn"}>Sign in</NavLink>
              )}
            </li>
          </ul>
        </PhoneNavigationPanal>
      )}
      {!isMobile && (
        <ul>
          <li className={styles.deskLink} onClick={handelClick}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={styles.deskLink} onClick={handelClick}>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li className={styles.deskLink} onClick={handelClick}>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li className={styles.deskLink} onClick={handelClick}>
            {LOGGED_IN ? (
              <Button type="primary" onClick={logout}>
                Logout
              </Button>
            ) : (
              <NavLink to={"/SignIn"}>
                <Button type="primary">Sign in</Button>
              </NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
