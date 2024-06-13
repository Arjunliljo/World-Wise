import { useState, useEffect } from "react";
import Map from "../Components/AppComponents/MapComponents/Map";
import SideBar from "../Components/AppComponents/SideBar";
import PhoneNavigationPanal from "../Components/PhoneNavigationPanal";
import styles from "./AppLayout.module.css";
import { useCities } from "../Components/Contexts/CityContext";
import { useAuth } from "../Components/Contexts/Authenticate";
import { useNavigate } from "react-router-dom";

function AppLayout() {
  const { isChecked, setIsChecked, isMobile } = useCities();

  const { LOGGED_IN } = useAuth();

  const navigate = useNavigate();

  if (!LOGGED_IN) {
    navigate("/login");
    return;
  }

  return (
    <div className={styles.app}>
      {isMobile && (
        <PhoneNavigationPanal
          top="3rem"
          right="5rem"
          isChecked={isChecked}
          onChecked={setIsChecked}
          radialColors={["var(--color-dark--1)", "var(--color-dark--2)"]}
          bgCl={!isChecked ? "var(--color-dark--1)" : "var(--color-light--2)"}
          color={!isChecked ? `var(--color-brand--2)` : "var(--color-brand--2)"}
          icon={
            <span
              style={{ fontSize: "3.2rem" }}
              class="material-symbols-outlined"
            >
              home
            </span>
          }
        >
          <SideBar />
        </PhoneNavigationPanal>
      )}
      {!isMobile && <SideBar />}

      <Map onChecked={setIsChecked} />
    </div>
  );
}

export default AppLayout;
