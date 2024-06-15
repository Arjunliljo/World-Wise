import { Outlet } from "react-router-dom";
import AppNav from "../Navs/AppNav";
import Logo from "../UtilityComponents/Logo";
import styles from "./Sidebar.module.css";
import User from "../../Pages/Users/User";
import { useAuth } from "../Contexts/Authenticate";
import { useCities } from "../Contexts/CityContext";

function SideBar() {
  const { LOGGED_IN } = useAuth();
  const { isMobile } = useCities();

  return (
    <div className={styles.sidebar}>
      <div className={isMobile ? styles.mobLogoPos : ""}>
        <Logo />
      </div>
      <AppNav />

      <Outlet />

      {LOGGED_IN && !isMobile && <User />}

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Arjun Cv.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
