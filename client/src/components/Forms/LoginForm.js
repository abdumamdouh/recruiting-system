import React from "react";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import classes from "./common.module.scss";
import { loginUserAction } from "../../redux/actions/user";
function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [showAlert, setShowAlert] = useState("");
    const dispatch = useDispatch();
    const validate = (email, password) => {
        const error = {};
        if (!password) error.password = "Password is required";

        if (!email) error.email = "Email is required";
        else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                email
            )
        ) {
            error.email = "Invalid Email";
        }
        setErrors(error);

        return error;
    };
    const showError = () => {
        setApiError("Email or password is incorrect.");
    };
    const showSuccessMessage = () => {
        setShowAlert("f");
    };
    const redirect = () => {
        const fromObj = props.location.state || {
            from: { pathname: "/" }
        };

        const path = fromObj.from.pathname;
        props.history.push(path);
    };

    const handleLoginForm = e => {
        e.preventDefault();
        const errors = validate(email, password);
        dispatch(loginUserAction(email, password, redirect, showError,showSuccessMessage));
    };
    return (
        <div className={classes.BoxContainer}>
        {showAlert === 'f'&&<Alert severity="success"> You logged in successfully </Alert>}
            <form onSubmit={handleLoginForm}>
                <input
                    type="email"
                    placeholder="Email"
                    className={classes.Input}
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
                {errors.email && (
                    <label className={classes.error}>{errors.email}</label>
                )}
                <input
                    type="password"
                    placeholder="Password"
                    className={classes.Input}
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                {errors.password && (
                    <label className={classes.error}>{errors.password}</label>
                )}
                {Object.keys(errors).length === 0 && (
                    <label className={classes.error}>{apiError}</label>
                )}
                <button type="submit" className={classes.SubmitButton}>
                    Sign in
                </button>
            </form>
            <div style={{ margin: "10px" }}>
                <a className={classes.MutedLink} href="#">
                    Forgot your password?
                </a>
            </div>

            <div style={{ margin: "10px" }}>
                <a className={classes.MutedLink} href="#">
                    Don't have an account?
                    <a href="#" className={classes.BoldLink} onClick={redirect}>
                        SignUp
                    </a>
                </a>
            </div>
        </div>
    );
}

export default withRouter(LoginForm);
