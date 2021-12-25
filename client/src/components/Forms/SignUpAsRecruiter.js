import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import classes from "./common.module.scss";

import { registerRecruiterAction } from "../../redux/actions/user";

const RegisterAsRecruiter = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        company: "",
        position: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [confirmpass, setconfirmpass] = useState("");
    const dispatch = useDispatch();
    const validate = (formValues) => {
        const error = {};

        if (!formValues.firstName) {
            error.firstName = "firstname required";
        }
        if (!formValues.lastName) {
            error.lastName = "lastname required";
        }
        if (!formValues.userName) {
            error.userName = "username required";
        }
        if (!formValues.password) {
            error.password = "password required";
        }
        if (!formValues.email) {
            error.email = "email required";
        } else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                formValues.email
            )
        ) {
            error.email = "invalid email";
        }
        if (formValues.password !== confirmpass) {
            error.password2 = "passwords do not match";
        }
        if (!formValues.position) {
            error.position = "position required";
        }
        if (!formValues.company) {
            error.company = "company required";
        }

        setErrors(error);

        return error;
    };

    const confirmPassword = (e) => {
        setconfirmpass(e.target.value);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        if (Object.keys(errors).length === 0) {
            console.log(formValues);
            dispatch(registerRecruiterAction(formValues));
        }
    };

    return (
        <div className={classes.BoxContainer}>
            <h3>Account information</h3>
            <form className={classes.FormContainer}>
                <input
                    className={classes.Input}
                    name="firstName"
                    placeholder="Firstname"
                    onChange={handleChange}
                />
                {errors.firstname && (
                    <label className={classes.error}>{errors.firstName}</label>
                )}

                <input
                    className={classes.Input}
                    name="lastName"
                    placeholder="lastname"
                    onChange={handleChange}
                />
                {errors.lastname && (
                    <label className={classes.error}>{errors.lastName}</label>
                )}

                <input
                    className={classes.Input}
                    name="userName"
                    placeholder="username"
                    onChange={handleChange}
                />
                {errors.username && (
                    <label className={classes.error}>{errors.userName}</label>
                )}

                <input
                    className={classes.Input}
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                />
                {errors.email && (
                    <label className={classes.error}>{errors.email}</label>
                )}

                <input
                    className={classes.Input}
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={handleChange}
                />
                {errors.password && (
                    <label className={classes.error}>{errors.password}</label>
                )}

                <input
                    className={classes.Input}
                    type="password"
                    placeholder="confirm password"
                    onChange={confirmPassword}
                />
                {errors.password2 && (
                    <label className={classes.error}>{errors.password2}</label>
                )}

                <input
                    className={classes.Input}
                    name="company"
                    placeholder="company"
                    onChange={handleChange}
                />
                {errors.firstname && (
                    <label className={classes.error}>{errors.company}</label>
                )}

                <input
                    className={classes.Input}
                    name="position"
                    placeholder="position"
                    onChange={handleChange}
                />
                {errors.position && (
                    <label className={classes.error}>{errors.position}</label>
                )}

                <button
                    className={classes.SubmitButton}
                    type="submit"
                    onClick={handleSubmit}
                >
                    {" "}
                    sign up{" "}
                </button>
            </form>
        </div>
    );
};

export default withRouter(RegisterAsRecruiter);
