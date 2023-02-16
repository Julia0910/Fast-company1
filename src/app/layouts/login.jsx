import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisetrForm from "../components/ui/regisetrForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const togleFormType = (params) => {
        setFormType((prevstate) =>
            prevstate === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            {" "}
                            <h3 className="mb-4">Register</h3>
                            <RegisetrForm />
                            <p>
                                Already have account?{" "}
                                <a role="button" onClick={togleFormType}>
                                    {" "}
                                    Sign In
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            {" "}
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>
                                {" "}
                                Dont have account?{" "}
                                <a role="button" onClick={togleFormType}>
                                    {" "}
                                    Sign Up
                                </a>{" "}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
