import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:3000";
const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: "",
  isChecked: false,
  isMobile: window.innerWidth <= 800,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        isLoading: true,
        error: "", // Reset error on loading
      };
    case "checked":
      return {
        ...state,
        isChecked: action.payload,
      };
    case "smallScreen":
      return {
        ...state,
        isMobile: action.payload,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((city, i) => city.id !== action.payload),
        isLoading: false,
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      throw new Error("Undefined action type");
  }
}

function CityProvider({ children }) {
  const [
    { cities, isChecked, isLoading, currentCity, isMobile, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  cities.forEach((obj) => (obj.id = obj._id));

  const setIsChecked = (checked) => {
    dispatch({ type: "checked", payload: checked });
  };

  useEffect(() => {
    const handleResize = () => {
      dispatch({ type: "smallScreen", payload: window.innerWidth <= 800 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch({ type: "Loading" });

    const fetchCities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    };

    setTimeout(() => {
      fetchCities();
    }, 500);
  }, []);

  async function getCity(id) {
    if (id === currentCity.id) return;

    dispatch({ type: "Loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch city");
      }
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "Loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to create city");
      }
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "Loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete city");
      }

      dispatch({ type: "cities/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
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
        deleteCity,
        error,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("useCities must be used within a CityProvider");
  return context;
}

export { CityProvider, useCities };
