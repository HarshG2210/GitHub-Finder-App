import { createContext, useReducer } from "react";

import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Get Search Results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `${GITHUB_URL}/search/users?${params}`,
      console.log("fetch URL", `${GITHUB_URL}/search/users?${params}`),
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    // console.log("response status", response.status);
    const { items } = await response.json();

    // console.log("data1234", items);
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Get Single User Results
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(
      `${GITHUB_URL}/users/${login}`,
      console.log("fetch URL", `${GITHUB_URL}/users/${login}`),
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    // console.log("response status", response.status);
    if (response.status === 404) {
      window.location("/notfound");
    } else {
      const data = await response.json();

      // console.log("data", data);
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // Get Single User Repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      console.log("fetch URL", `${GITHUB_URL}/users/${login}/repos?${params}`),
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    // console.log("response status", response.status);
    if (response.status === 404) {
      window.location("/notfound");
    } else {
      const data = await response.json();

      console.log("data", data);
      dispatch({
        type: "GET_REPOS",
        payload: data,
      });
    }
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
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
