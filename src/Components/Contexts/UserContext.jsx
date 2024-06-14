import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  isLoading: false,
  error: null,
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
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, error } = state;

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
