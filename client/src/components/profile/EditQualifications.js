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
  




     const dispatch = useDispatch()

     const user = useSelector(state => state.user);
     const{record}=user.userInfo;
     const majors=["BackEnd",
     "FrontEnd",
     "Fullstack",
     "Testing",
     "DevOps",
     "Mobile-dev",
     "Embedded",
     "R&D"];
     const [view, setView] = useState(majors.includes(record.major)?"sw":"notsw");

  
     const initialValues = {
        major: record.major,
        level: record.level,
        yearsOfExperience:record.yearsOfExperience,
        qualifications: record.qualifications,
    };
   

    const [formValues, setFormValues] = useState(initialValues);



    

  
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
            setFormValues(formValues)
            //setFormValues({...formValues,[formValues.qualifications.programmingLanguages]:arr})
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
            {/* <button className="btn btn-danger btn_close"
            onClick={() => setOnEditQualifications(false)}>
                Close
            </button> */}
           
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
                <select defaultValue={view==="sw"?"software-engineer":formValues.major}
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
                                <h4  >You are more into </h4>
                                <ul className={classes.Ul}>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="BackEnd"
                                            onChange={handleChange}
                                            checked={formValues.major==='BackEnd'?true:false}
                                        />
                                        <label>BackEnd</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="FrontEnd"
                                            onChange={handleChange}
                                            checked={formValues.major==='FrontEnd'?true:false}

                                        />
                                        <label>FrontEnd</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="Fullstack"
                                            onChange={handleChange}
                                            checked={formValues.major==='Fullstack'?true:false}

                                        />
                                        <label>Fullstack</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="Testing"
                                            onChange={handleChange}
                                            checked={formValues.major==='Testing'?true:false}

                                        />
                                        <label>Testing</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="DevOps"
                                            onChange={handleChange}
                                            checked={formValues.major==='DevOps'?true:false}

                                        />
                                        <label>DevOps</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="Mobile"
                                            onChange={handleChange}
                                            checked={formValues.major==='Mobile'?true:false}

                                        />
                                        <label>Mobile dev</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="Embedded"
                                            onChange={handleChange}
                                            checked={formValues.major==='Embedded'?true:false}

                                        />
                                        <label>Embedded</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="major"
                                            value="R&D"
                                            onChange={handleChange}
                                            checked={formValues.major==='R&D'?true:false}

                                        />
                                        <label>R&D</label>
                                    </li>
                                    </ul>
                            </div>
                        

                        <div className={classes.Box}>
                                <h4>You consider yourself </h4>
                                <ul className={classes.Ul}>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value="Intern"
                                            onChange={handleChange}
                                            checked={formValues.level==='Intern'?true:false}

                                        />
                                        <label>Intern</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value="Junior"
                                            onChange={handleChange}
                                            checked={formValues.level==='Junior'?true:false}

                                        />
                                        <label>Junior</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value="Mid-Level"
                                            onChange={handleChange}
                                            checked={formValues.level==='Mid-Level'?true:false}

                                        />
                                        <label>Mid Level</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value="Senior"
                                            onChange={handleChange}
                                            checked={formValues.level==='Senior'?true:false}

                                        />
                                        <label>Senior</label>
                                    </li>
                                    <li className={classes.Li}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value="Staff-Engineer"
                                            onChange={handleChange}
                                            checked={formValues.level==='Staff-Engineer'?true:false}

                                        />
                                        <label>Staff Engineer</label>
                                    </li>
                                </ul>
                            </div>
                            <br />
                            <div className={classes.Box}>
                                <h4>Years Of Experience</h4>
                                <input
                                    className={classes.Input}
                                    name="yearsOfExperience"
                                    placeholder="Years Of Experience"
                                    onChange={handleChange}
                                    defaultValue={formValues.yearsOfExperience}
                                />
                            </div>

                            <br />
                            <div className={classes.Box}>
                                <h4>Your Favourite stack</h4>
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
                                                    checked={formValues.qualifications.programmingLanguages.includes(stack)?true:false}

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
                <button style={{marginTop:"10px"}} className="btn btn-info w-100 btn-danger" type="submit"  onClick={() => setOnEditQualifications(false)}>Close</button>
            </form>
        </div>
    )
}

export default EditQualifications