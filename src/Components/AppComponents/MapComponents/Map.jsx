import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../Contexts/CityContext";
import { useGeolocation } from "../../Hooks/useGeolocation";
import Button from "../../Button";

const defaultPos = [10.8505, 76.2711];

function Map() {
  const [geoLoading, geoPos, geoErr, geoGetPosition] = useGeolocation();

  const [mapPosition, setMapPosition] = useState(defaultPos);
  const [searchParams] = useSearchParams();
  const { cities } = useCities();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (geoPos) setMapPosition([geoPos.lat, geoPos.lng]);
  }, [geoPos]);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={() => geoGetPosition(defaultPos)}>
        {geoLoading ? "Loading" : "Use Your Position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position, 10);
  return null;
}

function DetectClick() {
  const { setIsChecked: onChecked } = useCities();
  const handleClick = (e) => {
    onChecked(true);
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  };
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      handleClick(e);
    },
  });
}

export default Map;
