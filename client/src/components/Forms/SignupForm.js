import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./common.module.scss";
import { registerApplicantAction } from "../../redux/actions/user";

function Register(props) {
    const stacks = [
        "HTML5/CSS3",
        "NodeJs",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "Python",
        "PHP",
        "DotNet",
        "Java",
        "C/C++",
        "Ruby-on-Rails",
        "Unity",
        "R",
        "JavaScript",
        "AngularJs",
        "Angular",
        "TypeScript",
        "ReactJs",
        "VueJs",
        "React-Native",
        "Kotlin",
        "Flutter",
        "Xamarin",
        "Ionic",
        "PhoneGap",
        "iOS",
        "Objective",
        "C",
        "Swift",
        "Android",
        "Docker",
        "Electron",
        "Rust",
        "Scala",
        "Go"
    ];
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
    const [programmingLanguages, setProgramminLanguages] = useState([]);
    const [view, setView] = useState("notsw");
    const [errors, setErrors] = useState({});
    const [confirmpass, setconfirmpass] = useState("");

    const [registrationError, setRegistrationError] = useState("");

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    // console.log(user)

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
        alert("Registration successful")
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

        if (!formValues.yearsOfExperience)
            error.yearsOfExperience = "Years Of Experience required";

        if (!formValues.major || formValues.major === "software-engineer")
            error.major = "Major required";

        if (view === "sw" && !formValues.level) error.level = "Level required";

        setErrors(error);

        return error;
    };
    const confirmPassword = e => {
        setconfirmpass(e.target.value);
    };

    const handleChange = e => {
        const { name, value } = e.target;

        if (name === "qualifications") {
            const arr = formValues.qualifications.programmingLanguages;
            arr.push(value);
            // setFormValues({...formValues,[name]:value})
            //console.log(formValues.qualifications.programmingLanguages)
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleView = e => {
        if (e.target.value === "software-engineer") {
            setView("sw");
        } else setView("notsw");

        handleChange(e);
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
            <h3>Account information</h3>
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

                    <select
                        name="major"
                        className={classes.Select}
                        onChange={handleView}  >
                        <option>--Select major--</option>
                        <option value="software-engineer">Software engineer</option>
                        <option value="doctor">Doctor</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="graphic-designer">Graphic designer</option>
                        <option value="data-analyst">Data analyst</option>
                        <option value="teacher">Teacher</option>
                    </select>

                    {errors.major && view === "notsw" && (
                        <label className={classes.error}>{errors.major}</label>
                    )}

                    {view === "sw" ? (
                        <div>
                            <div className={classes.Box}>
                                <h3>You are more into </h3>
                                <ul className={classes.Ul}>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="BackEnd"
                                            onChange={handleChange}
                                        />
                                        <label>BackEnd</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="FrontEnd"
                                            onChange={handleChange}
                                        />
                                        <label>FrontEnd</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="Fullstack"
                                            onChange={handleChange}
                                        />
                                        <label>Fullstack</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="testing"
                                            onChange={handleChange}
                                        />
                                        <label>Testing</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="DevOps"
                                            onChange={handleChange}
                                        />
                                        <label>DevOps</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="mobile"
                                            onChange={handleChange}
                                        />
                                        <label>Mobile dev</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="embedded"
                                            onChange={handleChange}
                                        />
                                        <label>Embedded</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="R&D"
                                            onChange={handleChange}
                                        />
                                        <label>R&D</label>
                                    </li>
                                </ul>
                                {errors.major && (
                                    <label className={classes.error}>
                                        {errors.major}
                                    </label>
                                )}
                            </div>
                            <br />

                            <div className={classes.Box}>
                                <h3>You consider yourself </h3>
                                <ul className={classes.Ul}>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value="Intern"
                                            onChange={handleChange}
                                        />
                                        <label>Intern</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value="Junior"
                                            onChange={handleChange}
                                        />
                                        <label>Junior</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value="Mid-Level"
                                            onChange={handleChange}
                                        />
                                        <label>Mid Level</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value="Senior"
                                            onChange={handleChange}
                                        />
                                        <label>Senior</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value="Staff-Engineer"
                                            onChange={handleChange}
                                        />
                                        <label>Staff Engineer</label>
                                    </li>
                                </ul>
                                {errors.level && (
                                    <label className={classes.error}>
                                        {errors.level}
                                    </label>
                                )}
                            </div>
                            <br />
                            <div className={classes.Box}>
                                <h3>Years Of Experience</h3>
                                <input
                                    className={classes.Input}
                                    name="yearsOfExperience"
                                    placeholder="Years Of Experience"
                                    onChange={handleChange}
                                />

                                {errors.yearsOfExperience && (
                                    <label className={classes.error}>
                                        {errors.yearsOfExperience}
                                    </label>
                                )}
                            </div>

                            <br />
                            <div className={classes.Box}>
                                <h3>Your Favourite stack</h3>
                                <ul className={classes.Ul}>
                                    {stacks.map(stack => {
                                        return (
                                            <li
                                                className={classes.Li}
                                                key={stack}
                                            >
                                                <input
                                                    name="qualifications"
                                                    type="checkbox"
                                                    value={stack}
                                                    onChange={handleChange}
                                                />
                                                <label key={stack}>
                                                    {stack}
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.Box}>
                            <h3>Years Of Experience</h3>
                            <input
                                className={classes.Input}
                                name="yearsOfExperience"
                                placeholder="Years Of Experience"
                                onChange={handleChange}
                            />

                            {errors.yearsOfExperience && (
                                <label className={classes.error}>
                                    {errors.yearsOfExperience}
                                </label>
                            )}
                        </div>
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
