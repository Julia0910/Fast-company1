import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(users.map((user) => user._id === id ? {...user, "bookmark": !user.bookmark} : user))
  };

  return (
    <>
      <SearchStatus length={users.length} />

      {users.length > 0 && (
        <table className="table">
          <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
        </table>
      )}
    </>
  );
};

export default App;
