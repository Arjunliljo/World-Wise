import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map({ onChecked }) {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const handleClick = () => {
    onChecked(true);
    navigate("form");
  };

  return (
    <div className={styles.mapContainer} onClick={handleClick}>
      <h1>Map</h1>
      <h1>
        Position : {lat}, {lng}
      </h1>
    </div>
  );
}

export default Map;
