import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Home from "./Pages/Homepage";
import NotFound from "./Pages/PageNotFound";
import Login from "./Pages/Login";
import AppLayout from "./Pages/AppLayout";
import CityList from "./Components/AppComponents/CityComponents/CityList";
import { useEffect, useState } from "react";
import CountryList from "./Components/AppComponents/CountryComponent/CountryLish";
import City from "./Components/AppComponents/CityComponents/City";

const BASE_URL = "http://localhost:8000/cities";

function App() {
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
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="products" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="cities/:cityId" element={<City />} />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<p>form</p>} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
