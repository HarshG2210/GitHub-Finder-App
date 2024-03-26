import { useContext, useEffect } from "react";

import GithubContext from "../components/context/github/GithubContext";
import { useParams } from "react-router-dom";

export default function User() {
  const { user, getUser } = useContext(GithubContext);
  const params = useParams();
  useEffect(() => {
    getUser(params.login);
  }, []);

  return <div>{user.login}</div>;
}
