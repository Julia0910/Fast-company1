import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useHistory } from "react-router-dom";
import QualitiesList from "./qualitiesList";

const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const history = useHistory();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push("/users");
    };

    if (!user) return <>Loading...</>;
    return (
        <>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QualitiesList qualities={user.qualities} />
            <p>completedMeetings: {user.completedMeetings}</p>
            <h2>Rate: {user.rate}</h2>
            <button onClick={() => handleClick()}>Все Пользователи</button>
        </>
    );
};

export default User;
