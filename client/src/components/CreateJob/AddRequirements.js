import React, { useState } from "react";
import classes from "../Forms/common.module.scss";
const AddRequirements = ({ setOnAddQualifications, setRequirements,setStackOptions  }) => {
    const stacks = [
        "English",
        "German",
        "French",
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

    const [formValues, setFormValues] = useState([]);

 

    const handleChange = e => {
        const { name, value } = e.target;
        let arr=formValues
            if (arr.includes(value)) {
                arr = formValues.filter(stack => stack !== value);
                setFormValues({arr});
            } else {
                arr.push(value);
            
            setFormValues(arr);
        } 

        //console.log(formValues)
    };

    const handleSubmit = e => {
        e.preventDefault();
        let returnedValue=[]
        formValues.map(value=>returnedValue.push({[value]:0}))
       // console.log(returnedValue)
        setRequirements(formValues)
        setStackOptions(returnedValue)
        setOnAddQualifications(false)
        
    };
    return (
        <div className="edit_profile">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div>
                        <br />

                        <br />
                        <div className={classes.Box}>
                            <h4 style={{ margin: "10px", 'color':'#001845' }}>
                                 Requirements
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
                                                
                                            />
                                            <label style={{'color': '#023E7D'}} key={stack}>{stack}</label>
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

export default AddRequirements;
