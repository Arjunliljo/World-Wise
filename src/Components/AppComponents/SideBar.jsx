import { Outlet } from "react-router-dom";
import AppNav from "../Navs/AppNav";
import Logo from "../UtilityComponents/Logo";
import styles from "./Sidebar.module.css";
import User from "../LayoutComponents/User";
import { useAuth } from "../Contexts/Authenticate";

function SideBar() {
  const { LOGGED_IN } = useAuth();

  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      {LOGGED_IN && <User />}

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Arjun Cv.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
