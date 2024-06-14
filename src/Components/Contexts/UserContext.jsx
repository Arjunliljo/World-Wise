import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  isLoading: false,
  error: null,
  users: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "render":
      return {
        ...state,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "usersData":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };

    default:
      throw new Error("Unidentified action");
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, error, users } = state;

  console.log(users);

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: "render" });
      try {
        const { data } = await axios.get("http://localhost:3000/user");
        dispatch({ type: "usersData", payload: data });
      } catch (e) {
        alert("fetching users error");
      }
    };
    getData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("User context used out the Provider");
  return context;
}

export { UserProvider, useUser };
