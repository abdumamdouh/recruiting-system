import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import Rating from "@mui/material/Rating";
import classes from "../Forms/common.module.scss";
import { updateApplicantAction } from "../../redux/actions/user";
const AddQualifications = ({ setOnAddQualifications, options }) => {
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

    const dispatch = useDispatch();

    let user = useSelector(state => state.user);
    const { record } = user.userInfo;
    const majors = [
        "BackEnd",
        "FrontEnd",
        "Fullstack",
        "Testing",
        "DevOps",
        "Mobile-dev",
        "Embedded",
        "R&D"
    ];
    const [view, setView] = useState(
        majors.includes(record.major) ? "sw" : "notsw"
    );

    const initialValues = {
        major: record.major,
        level: record.level,
        yearsOfExperience: record.yearsOfExperience,
        qualifications: []
    };

    const [formValues, setFormValues] = useState(initialValues);

    const handleView = e => {
        if (e.target.value === "software-engineer") {
            setView("sw");
        } else setView("notsw");

        handleChange(e);
    };

    const handleChange = e => {
        const { name, value } = e.target;

        if (name === "qualifications") {
            let arr = formValues.qualifications.programmingLanguages;
            if (arr.includes(value)) {
                arr = arr.filter(stack => stack !== value);
                setFormValues({
                    ...formValues,
                    qualifications: { programmingLanguages: arr }
                });
            } else {
                arr.push(value);
            }
            setFormValues({
                ...formValues,
                qualifications: { programmingLanguages: arr }
            });

            //setFormValues(formValues)
            //setFormValues({...formValues,qualifications:arr})
            //console.log(formValues.qualifications.programmingLanguages)
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        user = {
            ...record,
            major: formValues.major,
            level: formValues.level,
            yearsOfExperience: formValues.yearsOfExperience,
            qualifications: formValues.qualifications
        };
        //console.log(user);
        dispatch(updateApplicantAction(user));
        setOnAddQualifications(false);
    };
    return (
        <div className="edit_profile">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div>
                        <br />

                        <br />
                        <div className={classes.Box}>
                            <h4 style={{ margin: "10px" }}>
                                Your Favourite stack
                            </h4>
                            <ul
                                style={{ margin: "10px" }}
                                className={classes.Ul}
                            >
                                {stacks.map(stack => {
                                    return (
                                        <li
                                            style={{ marginRight: "5px" }}
                                            className={classes.Li}
                                            key={stack}
                                        >
                                            <input
                                                style={{ marginRight: "7px" }}
                                                name="qualifications"
                                                type="checkbox"
                                                value={stack}
                                                onChange={handleChange}
                                                checked={
                                                    formValues.qualifications.includes(
                                                        stack
                                                    )
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <label key={stack}>{stack}</label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                </div>

                {/* <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                    className="custom-select text-capitalize"
                    onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
    </div>*/}

                <button className="btn btn-info w-100" type="submit">
                    Save
                </button>
                <button
                    style={{ marginTop: "10px" }}
                    className="btn btn-info w-100 btn-danger"
                    type="submit"
                    onClick={() => setOnAddQualifications(false)}
                >
                    Close
                </button>
            </form>
        </div>
    );
   
       
};

export default AddQualifications;
