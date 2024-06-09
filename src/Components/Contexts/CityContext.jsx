import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";
const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchCities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error while fetching cities");
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchCities();
    }, 500);
  }, []);

  async function getCity(id) {
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Error while fetching cities");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        isChecked,
        setIsChecked,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}
function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("CitiesContext is used Outside of CitiesProvider");
  return context;
}
export { CityProvider, useCities };
