import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userName, setUserName] = useState("lil");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("111");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [LOGGED_IN, setLOGGED_IN] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const verifyLogin = async () => {
      try {
        const {
          data: { isLoggedIn },
        } = await axios.get("http://localhost:3000/auth/verify", {
          withCredentials: true,
        });
        setLOGGED_IN(true);
      } catch (e) {
        console.log(e.message);
        setLOGGED_IN(false);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
    verifyLogin();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    await checkUser();
    navigate("/app");
    setPassword("");
    setUserName("");
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      setLOGGED_IN(false);
      navigate("/");
    } catch (e) {
      console.log(e);
      alert("Something went wrong please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async () => {
    const data = { userName, email, password };
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/user", data);
      setLOGGED_IN(true); // or use setLOGGED_IN(true) if using state
    } catch (error) {
      setError("Invalid User Name");
      setLOGGED_IN(false); // or use setLOGGED_IN(false) if using state
    } finally {
      setIsLoading(false);
    }
  };

  const checkUser = async () => {
    const data = { userName, password };
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:3000/auth/login", data, {
        withCredentials: true,
      });
      setLOGGED_IN(true);
      return true;
    } catch (error) {
      setError("Invalid password");
      setLOGGED_IN(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        userName,
        setUserName,
        addUser,
        checkUser,
        error,
        LOGGED_IN,
        setLOGGED_IN,
        logout,
        login,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Context using outside the provider");

  return context;
}

export { useAuth, AuthProvider };
