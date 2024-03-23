import GithubContext from "../context/github/GithubContext";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import { useContext } from "react";

function UsersResults() {
  const { user, loading } = useContext(GithubContext);


  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {user?.map((users) => (
          <UserItem key={users.id} users={users} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UsersResults;
