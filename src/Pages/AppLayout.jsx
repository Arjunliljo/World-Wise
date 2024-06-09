import { useState, useEffect } from "react";
import Map from "../Components/AppComponents/Map";
import SideBar from "../Components/AppComponents/SideBar";
import PhoneNavigationPanal from "../Components/PhoneNavigationPanal";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const [isCheked, setIsCheked] = useState(false);
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
    <div className={styles.app}>
      {isMobile && (
        <PhoneNavigationPanal
          top="2rem"
          right="85%"
          isChecked={isCheked}
          onChecked={setIsCheked}
          radialColors={["var(--color-dark--1)", "var(--color-dark--2)"]}
          bgCl="lightyellow"
          color="gray"
        >
          <SideBar />
        </PhoneNavigationPanal>
      )}
      {!isMobile && <SideBar />}
      <Map onChecked={setIsCheked} />
    </div>
  );
}

export default AppLayout;
