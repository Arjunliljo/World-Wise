import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";
const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState("");

  const [isChecked, setIsChecked] = useState(false);
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
  async function createCity(newCity) {
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      setCurrentCity(data);

      setCities((cities) => [...cities, newCity]);
    } catch {
      alert("Error while creating cities");
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteCity(id) {
    setIsLoading(true);
    try {
      await fetch(`${BASE_URL}/cities/`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("Error while deleting cities");
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
        createCity,
        isMobile,
        setIsMobile,
        deleteCity,
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
