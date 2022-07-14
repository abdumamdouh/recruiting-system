import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import classes from "../Forms/common.module.scss";
import { updateApplicantAction } from "../../redux/actions/user";
import { FormControl } from "@mui/material";
const EditQualifications = ({ setOnEditQualifications, setQual }) => {
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

    let user = useSelector((state) => state.user);
    const { userInfo } = user;
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
        majors.includes(userInfo.major) ? "sw" : "notsw"
    );
    const [skills, setSkills] = useState([]);
    const [skillLevels, setSkillLevels] = useState(false);
    const initialValues = {
        major: userInfo.major,
        level: userInfo.level,
        yearsOfExperience: userInfo.yearsOfExperience,
        // qualifications: userInfo.qualifications,
        skills: []
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [checkedArr, setCheckedArr] = useState([]);
    //console.log(formValues);

    const changeAvatar = (e) => {
        //     const file = e.target.files[0]
        //     const err = checkImage(file)
        //     if(err) return dispatch({
        //         type: GLOBALTYPES.ALERT, payload: {error: err}
        //     })
        //     setAvatar(file)
    };

    const handleView = (e) => {
        if (e.target.value === "software-engineer") {
            setView("sw");
        } else setView("notsw");

        handleChange(e);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "qualifications" || name === "skills") {
            let arr = formValues.skills;
            if (arr.includes(value)) {
                arr = arr.filter((stack) => stack !== value);
                setSkills({ arr });
                console.log(skills);
                setFormValues({
                    ...formValues,
                    qualifications: skills
                    // skills: skills
                });
            } else {
                arr.push(value);
            }
            setSkills(arr);
            setFormValues({
                ...formValues,
                qualifications: skills
                // skills: skills
            });

            //setFormValues(formValues)
            //setFormValues({...formValues,qualifications:arr})
            //console.log(formValues.qualifications.programmingLanguages)
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSkills(formValues.skills);
        let returnedValue = [];
        skills.map((value) => returnedValue.push({ [value]: 0 }));
        console.log(returnedValue);
        setSkills(returnedValue);
        console.log("sssss", skills);
        const middleIndex = Math.ceil(skills.length / 2);
        const secondHalf = skills.slice().splice(-middleIndex);
        console.log("sn", secondHalf);
        setSkills([...secondHalf]);
        setQual([...secondHalf]);
        user = {
            ...userInfo,
            major: formValues.major,
            level: formValues.level,
            yearsOfExperience: formValues.yearsOfExperience,
            qualifications: secondHalf
            // skills: secondHalf
        };
        console.log(user);
        dispatch(updateApplicantAction(user));
        setOnEditQualifications(false);
    };
    return (
        <div className="edit_profile">
            {/* <button className="btn btn-danger btn_close"
            onClick={() => setOnEditQualifications(false)}>
                Close
            </button> */}

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input
                            type="file"
                            name="file"
                            id="file_up"
                            accept="image/*"
                            onChange={changeAvatar}
                        />
                    </span>
                </div>

                <div className="form-group">
                    <div className="input-group-prepend px-0 mb-4">
                        <select
                            defaultValue={
                                view === "sw"
                                    ? "software-engineer"
                                    : formValues.major
                            }
                            name="major"
                            onChange={handleView}
                            className="custom-select text-capitalize"
                        >
                            <option>--Select major--</option>
                            <option value="software-engineer">
                                Software engineer
                            </option>
                            <option value="doctor">Doctor</option>
                            <option value="Pharmacist">Pharmacist</option>
                            <option value="graphic-designer">
                                Graphic designer
                            </option>
                            <option value="data-analyst">Data analyst</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    {view === "sw" ? (
                        <div>
                            <div className={classes.Box}>
                                <h4 style={{ margin: "10px" }}>
                                    You are more into{" "}
                                </h4>
                                <ul
                                    // style={{ margin: "5px" }}
                                    className={classes.Ul}
                                >
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="major"
                                            value="BackEnd"
                                            onChange={handleChange}
                                            checked={
                                                formValues.major === "BackEnd"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>BackEnd</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="major"
                                            value="FrontEnd"
                                            onChange={handleChange}
                                            checked={
                                                formValues.major === "FrontEnd"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>FrontEnd</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="major"
                                            value="Fullstack"
                                            onChange={handleChange}
                                            checked={
                                                formValues.major === "Fullstack"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>Fullstack</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="major"
                                            value="Testing"
                                            onChange={handleChange}
                                            checked={
                                                formValues.major === "Testing"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>Testing</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="major"
                                            value="DevOps"
                                            onChange={handleChange}
                                            checked={
                                                formValues.major === "DevOps"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>DevOps</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="major"
                                            value="Mobile"
                                            onChange={handleChange}
                                            checked={
                                                formValues.major === "Mobile"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>Mobile dev</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="major"
                                            value="Embedded"
                                            onChange={handleChange}
                                            checked={
                                                formValues.major === "Embedded"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>Embedded</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="major"
                                            value="R&D"
                                            onChange={handleChange}
                                            checked={
                                                formValues.major === "R&D"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>R&D</label>
                                    </li>
                                </ul>
                            </div>

                            <div className={classes.Box}>
                                <h4 
                                style={{ margin: "10px" }}
                                >
                                    You consider yourself{" "}
                                </h4>
                                <ul
                                    // style={{ margin: "10px" }}
                                    className={classes.Ul}
                                >
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="level"
                                            value="Intern"
                                            onChange={handleChange}
                                            checked={
                                                formValues.level === "Intern"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>Intern</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="level"
                                            value="Junior"
                                            onChange={handleChange}
                                            checked={
                                                formValues.level === "Junior"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>Junior</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="level"
                                            value="Mid-Level"
                                            onChange={handleChange}
                                            checked={
                                                formValues.level === "Mid-Level"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>Mid Level</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="level"
                                            value="Senior"
                                            onChange={handleChange}
                                            checked={
                                                formValues.level === "Senior"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>Senior</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            style={{ marginRight: "5px" }}
                                            type="radio"
                                            name="level"
                                            value="Staff-Engineer"
                                            onChange={handleChange}
                                            checked={
                                                formValues.level ===
                                                "Staff-Engineer"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label>Staff Engineer</label>
                                    </li>
                                </ul>
                            </div>
                            <br />
                            <div className={classes.Box}>
                                <h4 style={{ margin: "10px" }}>
                                    Years of experience
                                </h4>
                                <input
                                    style={{ marginRight: "5px" }}
                                    className={classes.Input}
                                    name="yearsOfExperience"
                                    placeholder="Years Of Experience"
                                    onChange={handleChange}
                                    defaultValue={formValues.yearsOfExperience}
                                />
                            </div>

                            <br />
                            <div className={classes.Box}>
                                <h4 style={{ margin: "10px" }}>
                                    Your favourite stack
                                </h4>
                                <ul
                                    // style={{ margin: "10px" }}
                                    className={classes.Ul}
                                >
                                    {stacks.map((stack, index) => {
                                        return (
                                            <li
                                                style={{ marginRight: "5px" }}
                                                className={classes.Li}
                                                key={index}
                                            >
                                                <input
                                                    style={{
                                                        marginRight: "7px"
                                                    }}
                                                    name="skills"
                                                    type="checkbox"
                                                    value={stack}
                                                    onChange={handleChange}
                                                    // checked={
                                                    //     formValues.qualifications.programmingLanguages.includes(
                                                    //         stack
                                                    //     )
                                                    //         ? true
                                                    //         : false
                                                    //
                                                />
                                                <label key={index}>
                                                    {stack}
                                                </label>
                                                <br />
                                                {skillLevels && (
                                                    <FormControl
                                                        style={{
                                                            minWidth: 120
                                                        
                                                        }}
                                                    >
                                                        <Select
                                                        style={{fontColor: 'black'}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            key={index}
                                                            // value={skills}
                                                            value={stacks[stack]}
                                                            label="stack"
                                                            onChange={(e) => {
                                                                setSkills(
                                                                    (state) => [
                                                                        ...state,
                                                                        {
                                                                            [stack]:
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                        }
                                                                    ]
                                                                );
                                                                console.log(
                                                                    skills
                                                                );
                                                            }}
                                                        >
                                                            <MenuItem value={1}>
                                                                Beginner
                                                            </MenuItem>
                                                            <MenuItem value={2}>
                                                                Experienced
                                                            </MenuItem>
                                                            <MenuItem value={3}>
                                                                Advanced
                                                            </MenuItem>
                                                            <MenuItem value={4}>
                                                                Expert
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.Box}>
                            <h4 style={{ margin: "10px" }}>
                                Years Of Experience
                            </h4>
                            <input
                                className={classes.Input}
                                name="yearsOfExperience"
                                placeholder="Years Of Experience"
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>

                {view === "sw" && (
                    <button
                        className="btn btn-info w-100"
                        type="button"
                        onClick={() => setSkillLevels(true)}
                    >
                        Add your Level at each skill
                    </button>
                )}
                <button
                    style={{ marginTop: "10px" }}
                    className="btn btn-info w-100"
                    type="submit"
                >
                    Save
                </button>
                <button
                    style={{ marginTop: "10px" }}
                    className="btn btn-info w-100 btn-danger"
                    type="submit"
                    onClick={() => setOnEditQualifications(false)}
                >
                    Close
                </button>
            </form>
        </div>
    );
};

export default EditQualifications;
