import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classes from '../Forms/common.module.scss'

const EditQualifications = ({setOnEditQualifications}) => {
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
        major: "",
        level: "",
        yearsOfExperience:0,
        qualifications: { programmingLanguages: [] }
    };


    const [formValues, setFormValues] = useState(initialValues);

     const [view, setView] = useState("notsw");



     const dispatch = useDispatch()

     const user = useSelector(state => state.user);
     const{record}=user.userInfo;
    
     console.log(formValues)

     const changeAvatar = (e) => {
    //     const file = e.target.files[0]

    //     const err = checkImage(file)
    //     if(err) return dispatch({
    //         type: GLOBALTYPES.ALERT, payload: {error: err}
    //     })

    //     setAvatar(file)
     }

     const handleView = e => {
        if (e.target.value === "software-engineer") {
            setView("sw");
        } else setView("notsw");

        handleChange(e);
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
    

    const handleSubmit = e => {
    //     e.preventDefault()
    //     dispatch(updateProfileUser({userData, avatar, auth}))
     }

    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close"
            onClick={() => setOnEditQualifications(false)}>
                Close
            </button>

            <form onSubmit={handleSubmit}>
            <div className="info_avatar">
                    
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                        accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>


            <div className="form-group">

                <div className="input-group-prepend px-0 mb-4">
                <select
                        name="major"
                        onChange={handleView}
                        className="custom-select text-capitalize">

                        <option>--Select major--</option>
                        <option value="software-engineer">Software engineer</option>
                        <option value="doctor">Doctor</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="graphic-designer">Graphic designer</option>
                        <option value="data-analyst">Data analyst</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>
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
                            </div>
                        

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
                        </div>
                    )}

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

                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditQualifications