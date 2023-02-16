import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserListPage from "../components/page/usersListPage";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <UserListPage />}</>;
};

export default Users;
