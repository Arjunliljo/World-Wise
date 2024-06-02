import Map from "../Components/AppComponents/Map";
import SideBar from "../Components/AppComponents/SideBar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
