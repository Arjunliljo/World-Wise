import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./Authenticate";

const BASE_URL = "http://localhost:3000";
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
  const { addUser } = useAuth();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, error, users } = state;

  useEffect(() => {
    getAllUser();
  }, [isLoading, addUser]);

  async function getAllUser() {
    try {
      const { data } = await axios.get(`${BASE_URL}/user`);
      dispatch({ type: "usersData", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "Check your network connection and retry...",
      });
    }
  }

  async function deleteUser(id) {
    dispatch({ type: "render" });
    try {
      const res = await axios.delete(`${BASE_URL}/user/${id}`);
    } catch (e) {
      dispatch({ type: "rejected", payload: "Cannot delete the user" });
    }
  }

  return (
    <UserContext.Provider
      value={{
        isLoading,
        error,
        users,
        deleteUser,
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
