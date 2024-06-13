import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userName, setUserName] = useState("lil");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("111");
  const [error, setError] = useState("");

  const [LOGGED_IN, setLOGGED_IN] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
    try {
      await axios.post("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      setLOGGED_IN(false);
      navigate("/");
    } catch (e) {
      console.log(e);
      alert("Something went wrong please try again later");
    }
  };

  const addUser = async () => {
    const data = { userName, email, password };

    axios
      .post("http://localhost:3000/user", data)
      .then((res) => (LOGGED_IN.current = true))
      .catch((e) => {
        setError("Invalid User Name");
        setLOGGED_IN(false);
      });
  };

  const checkUser = async () => {
    const data = { userName, password };
    axios
      .post("http://localhost:3000/auth/login", data, { withCredentials: true })
      .then((res) => {
        setLOGGED_IN(true);
        return true;
      })
      .catch((e) => {
        setError("Invalid password");
        setLOGGED_IN(false);
      });
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
