// import axios from "axios";

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// const github = axios.create({
//   baseURL: GITHUB_URL,
//   headers: {
//     Authorization: `token ${GITHUB_TOKEN}`,
//   },
// });

// Get Search Results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  //   const response = await github.get(`/search/users?${params}`);
  //   return response.data.items;
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
  return items;
};

// Get Single User Results
export const getUser = async (login) => {
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
    return data;
  }
};

// Get Single User Repos
export const getUserRepos = async (login) => {
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

    // console.log("data", data);
    return data;
  }
};

// // get user and repos

// export const getUserAndRepos = async (login) => {
//   const [user, repos] = await Promise.all([
//     github.get(`/users/${login}`),
//     github.get(`/users/${login}/repos`),
//   ]);
//   return {
//     user: user.data,
//     repos: repos.data,
//   };
// };
