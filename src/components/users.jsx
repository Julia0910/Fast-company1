import React, { useState } from "react";
import api from "../api";
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  console.log(users);

  const hendeleDelete = (userid) => {
    setUsers((prevState) => prevState.filter((user) => user !== userid));
  };

  const renderPhrase = (number) => {
    const humanParty =
      [2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number)
        ? "человека тусанут"
        : "человек тусанёт";

    return `${number} ${humanParty} с тобой сегодня`;
  };

  if (users.length === 0) {
    return <span className="badge bg-danger">Никто с тобой не тусанёт</span>;
  }
  return (
    <>
      <h2>
        <span className={"badge bg-primary"}>{renderPhrase(users.length)}</span>
      </h2>
      <table className="table table-primary">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Професия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((quality) => (
                  <span
                    style={{ marginRight: "5px" }}
                    className={`badge bg-${quality.color}`}
                    key={quality._id}
                  >
                    {`${quality.name}`}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td>
                <button
                  className="badge bg-danger"
                  onClick={() => hendeleDelete(user)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
