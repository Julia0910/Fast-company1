import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({ user, ...rest }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((qualitie) => (
          <Qualitie {...qualitie} key={qualitie._id} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} /5</td>
      <td>
        {
          <Bookmark
            status={user.bookmark}
            id={user._id}
            {...rest}
            key={user._id}
          />
        }
      </td>
      <td>
        <button
          onClick={() => rest.onDelete(user._id)}
          className="btn btn-danger"
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
