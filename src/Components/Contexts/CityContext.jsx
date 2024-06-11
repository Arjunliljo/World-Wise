import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:8000";
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
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
  }
}

function CityProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState("");

  // const [isChecked, setIsChecked] = useState(false);
  // const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 800);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, isChecked, isLoading, currentCity, isMobile } = state;

  const setIsChecked = (checked) => {
    dispatch({ type: "navigation", payload: checked });
  };

  useEffect(() => {
    const handleResize = () => {
      // setIsMobile(window.innerWidth <= 800);
      dispatch({ type: "smallScreen", payload: window.innerWidth <= 800 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch({ type: "loading" });

    const fetchCities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Erro rWhile fetching" });
      }
    };

    setTimeout(() => {
      fetchCities();
    }, 500);
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      alert("Error while fetching cities");
      dispatch({ type: "rejected", payload: "Error while fetching Cities" });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "city/created", payload: newCity });
      // setCities((cities) => [...cities, newCity]);
    } catch {
      dispatch({ type: "rejected", payload: "Error while creating city" });
      alert("Error while creating cities");
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/`, {
        method: "DELETE",
      });

      dispatch({ type: "city/delted", payload: id });
    } catch {
      alert("Error while deleting cities");
      dispatch({ type: "rejected", payload: "Error while creating city" });
      alert("Error while creating cities");
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
