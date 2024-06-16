import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

//Contexts
import { CityProvider } from "./Components/Contexts/CityContext";
import { AuthProvider } from "./Components/Contexts/Authenticate";
import { UserProvider } from "./Components/Contexts/UserContext";

//Components
import CityList from "./Components/AppComponents/CityComponents/CityList";
import CountryList from "./Components/AppComponents/CountryComponent/CountryLish";
import City from "./Components/AppComponents/CityComponents/City";
import Form from "./Components/LayoutComponents/Form";
import SpinnerFullPage from "./Components/UtilityComponents/SpinnerFullPage";

//Pages
// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Home from "./Pages/Homepage";
// import NotFound from "./Pages/PageNotFound";
// import SignIn from "./Pages/LoginSignUp/SignIn";
// import AppLayout from "./Pages/AppLayout";
// import Login from "./Pages/LoginSignUp/Login";
// import Users from "./Pages/Users/Users";

const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Home = lazy(() => import("./Pages/Homepage"));
const NotFound = lazy(() => import("./Pages/PageNotFound"));
const SignIn = lazy(() => import("./Pages/LoginSignUp/SignIn"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./Pages/LoginSignUp/Login"));
const Users = lazy(() => import("./Pages/Users/Users"));

// dist/index.html                   0.61 kB │ gzip:   0.40 kB
// dist/assets/index-BH8VNUK9.css   34.36 kB │ gzip:   6.03 kB
// dist/assets/index-D4o6bm4s.js   557.39 kB │ gzip: 164.16 kB

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <CityProvider>
            <Suspense fallback={<SpinnerFullPage />}>
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
                <Route path="users" element={<Users />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </CityProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
