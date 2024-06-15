import { Link, NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../UtilityComponents/Logo";
import PhoneNavigationPanal from "../LayoutComponents/PhoneNavigationPanal";

import { useCities } from "../Contexts/CityContext";
import { useAuth } from "../Contexts/Authenticate";
import Button from "../UtilityComponents/Button";

function Navigation({ children = ["2rem", "2rem"] }) {
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
          top={children[0]}
          right={children[1]}
          radialColors={["black", "darkgreen"]}
          onChecked={setIsChecked}
          isChecked={isChecked}
        >
          <ul>
            <li className={styles.link} onClick={handelClick}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.link} onClick={handelClick}>
              <Link to="/products">Products</Link>
            </li>
            <li className={styles.link} onClick={handelClick}>
              <Link to="/users">Users</Link>
            </li>
            <li className={styles.link} onClick={handelClick}>
              {LOGGED_IN ? (
                <a onClick={logout}>Logout</a>
              ) : (
                <Link to={"/SignIn"}>Sign in</Link>
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
          <li className={styles.desklink} onClick={handelClick}>
            <NavLink to="/users">Users</NavLink>
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
