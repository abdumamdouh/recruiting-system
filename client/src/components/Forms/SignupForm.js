import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert } from '@mui/material';
import classes from "./common.module.scss";
import { registerApplicantAction } from "../../redux/actions/user";

function Register(props) {
    const initialValues = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        major: "",
        level: "",
        qualifications: { programmingLanguages: [] }
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [errors] = useState({});
    const [confirmpass, setconfirmpass] = useState("");

    const [registrationError, setRegistrationError] = useState("");
    const [showAlert,setShowAlert] = useState('');
    const dispatch = useDispatch();

    const redirect = () => {
        const fromObj = props.location.state || {
            from: { pathname: "/" }
        };

        const path = fromObj.from.pathname;
        props.history.push(path);
    };

    const showError = () => {
        setRegistrationError("Email is already registered");
    };
    //To show success message
    const showSuccessMessage = () => {
        setShowAlert('f')
    }
   
    
    const validate = formValues => {
        const error = {};

        if (!formValues.firstName) error.firstName = "Firstname required";

        if (!formValues.lastName) error.lastName = "Lastname required";

        if (!formValues.userName) error.userName = "Username required";

        if (!formValues.password) error.password = "Password required";

        if (!formValues.email) error.email = "Email required";
        else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                formValues.email
            )
        ) {
            error.email = "Invalid Email";
        }
        if (formValues.password !== confirmpass)
            error.password2 = "Passwords do not match";


        return error;
    };
    const confirmPassword = e => {
        setconfirmpass(e.target.value);
    };

    const handleChange = e => {
        const { name, value } = e.target;

      
            setFormValues({ ...formValues, [name]: value });
        
    };

 

    const handleSubmit = e => {
        e.preventDefault();
        const json = JSON.stringify(formValues);
        const errors = validate(formValues);
        if (Object.keys(errors).length === 0) {
            console.log(json);
            
            dispatch(registerApplicantAction(formValues, redirect, showError, showSuccessMessage));
            
        }
    };

    return (
        <div className={classes.BoxContainer}>
             {showAlert === 'f'&&<Alert severity="success">Registered successfully</Alert>}
            <h4>Account information</h4>
            <div className={classes.FormContainer}>
                <form className={classes.FormContainer} onSubmit={handleSubmit}>
                    <input
                        className={classes.Input}
                        name="firstName"
                        placeholder="Firstname"
                        onChange={handleChange}
                    />
                    {errors.firstName && (
                        <label className={classes.error}>
                            {errors.firstName}
                        </label>
                    )}

                    <input
                        className={classes.Input}
                        name="lastName"
                        placeholder="Lastname"
                        onChange={handleChange}
                    />
                    {errors.lastName && (
                        <label className={classes.error}>
                            {errors.lastName}
                        </label>
                    )}

                    <input
                        className={classes.Input}
                        name="userName"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                    {errors.userName && (
                        <label className={classes.error}>
                            {errors.userName}
                        </label>
                    )}

                    <input
                        className={classes.Input}
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <label className={classes.error}>{errors.email}</label>
                    )}
                    {registrationError !== "" && (
                        <label className={classes.error}>
                            {registrationError}
                        </label>
                    )}

                    <input
                        className={classes.Input}
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <label className={classes.error}>
                            {errors.password}
                        </label>
                    )}

                    <input
                        className={classes.Input}
                        type="password"
                        placeholder="Confirm password"
                        onChange={confirmPassword}
                    />
                    {errors.password2 && (
                        <label className={classes.error}>
                            {errors.password2}
                        </label>
                    )}

                  
                    <button className={classes.SubmitButton} type="submit">
                        {" "}
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Register);
