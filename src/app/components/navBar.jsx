import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <Link className="me-2" to="/">Main</Link>
            <Link className="me-2" to="/login">Login</Link>
            <Link to="/users">Users</Link>
            <br/>
        </>
    );
};

export default NavBar;
