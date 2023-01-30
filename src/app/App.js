import React from "react";
import NavBar from "./components/navBar";
import { Switch, Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import User from "./components/user";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:id" component={User} />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Main} />
            </Switch>
        </>
    );
}

export default App;
