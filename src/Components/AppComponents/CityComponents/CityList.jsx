import styles from "./CityList.module.css";
import Message from "../../LayoutComponents/Message";
import Spinner from "../../LayoutComponents/Spinner";
import CityItem from "./CityItem";
import { useCities } from "../../Contexts/CityContext";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city._id} />
      ))}
    </ul>
  );
}

export default CityList;
