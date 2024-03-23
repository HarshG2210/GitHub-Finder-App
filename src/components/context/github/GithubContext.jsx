import { createContext, useReducer } from "react";

import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    user: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Get Search Results
  const searchUsers = async (text) => {
    // console.log("text", text);
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });
    // console.log("params", params);
    const response = await fetch(
      `${GITHUB_URL}/search/users?${params}`,
      console.log("fetch URL", `${GITHUB_URL}/search/users?${params}`),

      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    console.log("response status", response.status);
    const { items } = await response.json();

    console.log("data", items);
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Set Clear Users
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  // Set Loading
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
