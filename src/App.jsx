import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Home from "./Pages/Homepage";
import NotFound from "./Pages/PageNotFound";
import SignIn from "./Pages/SignIn";
import AppLayout from "./Pages/AppLayout";
import CityList from "./Components/AppComponents/CityComponents/CityList";
import CountryList from "./Components/AppComponents/CountryComponent/CountryLish";
import City from "./Components/AppComponents/CityComponents/City";
import Form from "./Components/Form";
import { CityProvider } from "./Components/Contexts/CityContext";
import { AuthProvider } from "./Components/Contexts/Authenticate";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CityProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="products" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:cityId" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="SignIn" element={<SignIn />} />
              <Route path="Login" element={<Login />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </CityProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
