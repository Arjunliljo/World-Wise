import styles from "./CityList.module.css";
import Message from "../../Message";
import Spinner from "../../Spinner";
import CityItem from "./CityItem";
import { useCities } from "../../Contexts/CityContext";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
