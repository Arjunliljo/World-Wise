import styles from "./CountryList.module.css";
import Message from "../../UtilityComponents/Message";
import Spinner from "../../UtilityComponents/Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../../Contexts/CityContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your first city" />;

  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country)) acc.push(city);
    return acc;
  }, []);
  console.log(countries);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
