import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000/cities";
const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchCities = async () => {
      try {
        const res = await fetch(BASE_URL);
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

  return (
    <CityContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
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
