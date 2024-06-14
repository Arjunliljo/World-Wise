// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import Message from "../UtilityComponents/Message";
import Spinner from "../UtilityComponents/Spinner";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "../UtilityComponents/Button";
import BackButton from "../UtilityComponents/BackButton";
import { useUrlGeolacation } from "../Hooks/useUrlPosition";
import { useCities } from "../Contexts/CityContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoError, setGeoError] = useState("");

  const [lat, lng] = useUrlGeolacation();

  const [isLoadingForm, setIsLoadingForm] = useState(false);

  useEffect(() => {
    if (!lat && !lng) return;

    const fetchData = async () => {
      try {
        setGeoError("");
        setIsLoadingForm(true);

        const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);

        const data = await res.json();

        if (!data.countryCode)
          throw new Error("It doesn't seem like a city click Somewhere else");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoError(err.message);
      } finally {
        setIsLoadingForm(false);
      }
    };
    fetchData();
  }, [lat, lng]);

  if (!lat && !lng) return <Message message="Start by clicking on the Map" />;

  if (isLoadingForm) return <Spinner />;

  if (geoError) return <Message message={geoError} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !country) return;
    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
      id: lat.concat(lng).replaceAll(".", ""),
    };

    await createCity(newCity);
    navigate("/app/cities");
  };

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
