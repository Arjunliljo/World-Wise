import { createContext, useContext, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userName, setUserName] = useState("lil");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("111");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [curUserId, setCurUserId] = useState(null);
  const [LOGGED_IN, setLOGGED_IN] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const verifyLogin = async () => {
      setIsLoading(true);
      try {
        const {
          data: { isLoggedIn },
        } = await axios.get("http://localhost:3000/auth/verify", {
          withCredentials: true,
        });
        setLOGGED_IN(true);
      } catch (e) {
        console.log("Not Logged in loading time verification");
        setLOGGED_IN(false);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
    verifyLogin();
  }, []);

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      setLOGGED_IN(false);
      setError(null);
      navigate("/");
    } catch (e) {
      alert("Something went wrong while deleting...");
      setError("Error while deleteing");
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();

    const data = { userName, email, password };
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/user", data);
      setError(null);
      navigate("/login");
    } catch (e) {
      alert("error while sign in");
      setError("Invalid User Name");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const data = { userName, password };
    setIsLoading(true);
    try {
      const {
        data: {
          user: { _id: curUserID },
        },
      } = await axios.post("http://localhost:3000/auth/login", data, {
        withCredentials: true,
      });
      setCurUserId(curUserID);
      setLOGGED_IN(true);
      setError(null);
      navigate("/app");
      setPassword("");
      setUserName("");
      return true;
    } catch (e) {
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
        error,
        LOGGED_IN,
        setLOGGED_IN,
        logout,
        login,
        isLoading,
        curUserId,
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
