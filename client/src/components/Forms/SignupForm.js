import React ,{useState} from 'react'

import classes from "./common.module.scss";



const Register =()=> {
    const stacks=["HTML5/CSS3","NodeJs","MongoDB","MySQL","PostgreSQL","Python","PHP","DotNet","Java",
    "C/C++", "Ruby", "on", "Rails", "Unity", "R", "JavaScript", "AngularJs", "Angular", "TypeScript",
    "ReactJs", "VueJs", "React-Native", "Kotlin", "Flutter", "Xamarin", "Ionic", "PhoneGap", "iOS",
    "Objective", "C", "Swift", "Android", "Docker", "Electron", "Rust", "Scala", "Go"]
    const initialValues={firstname:"",lastname:"",username:"",email:"",password:"",pref:"",level:"",qualifications:{programmingLanguages:[]}}
    const [formValues, setFormValues]=useState(initialValues)
    const [programmingLanguages,setProgramminLanguages]=useState([])
    const [view,setView] = useState("notsw")
    const [errors,setErrors]=useState({})
    const [confirmpass,setconfirmpass]=useState("")


    const validate=(formValues)=>{
        const error={};

        if(!formValues.firstname)
        {
            error.firstname="firstname required"
        }
        if(!formValues.lastname)
        {
            error.lastname="lastname required"
        }
        if(!formValues.username)
        {
            error.username="username required"
        }
        if(!formValues.password)
        {
            error.password="password required"
        }
        if(!formValues.email)
        {
            error.email="email required"
        }
        else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formValues.email)){
            error.email="invalid email"

        }
        if(formValues.password!==confirmpass){
            error.password2="passwords does not match"

        }
     
     
        setErrors(error);
        
        return error
  

    }
    const confirmPassword=(e)=>{
        setconfirmpass(e.target.value)
    }

    const handleChange=(e)=>{
        const {name,value}=e.target
        if(name==="qualifications")
        {
            const arr = formValues.qualifications.programmingLanguages;
            arr.push(value)
           // setFormValues({...formValues,[name]:value})
           //console.log(formValues.qualifications.programmingLanguages)
            
        }
        else{
        setFormValues({...formValues,[name]:value})
        }
    }

 

    const handleView = (e)=>{
        if(e.target.value==="software-engineer"){
            setView("sw")
        }
        else setView("notsw")
    }


    const handleSubmit=(e)=>{
        e.preventDefault();

        const json =JSON.stringify(formValues)
        const errors =validate(formValues)
        if(Object.keys(errors).length===0){
            console.log(json)
        }
       
    }

   

    return (
        <div className={classes.BoxContainer}>
            <h3>Account information</h3>
            <div classNam={classes.FormContainer}>

           
            <form classNam={classes.FormContainer}>
              
                <input className={classes.Input} name="firstname" placeholder='Firstname' onChange={handleChange}/>
                {errors.firstname&& <label className={classes.error}>{errors.firstname}</label>}

                <input className={classes.Input}name="lastname" placeholder='lastname'onChange={handleChange}/>
                {errors.lastname&& <label className={classes.error}>{errors.lastname}</label>}

                <input className={classes.Input}name="username" placeholder='username'onChange={handleChange}/> 
                {errors.username&& <label className={classes.error}>{errors.username}</label>}

                <input className={classes.Input} name="email" placeholder='email'onChange={handleChange}/> 
                {errors.email&& <label className={classes.error}>{errors.email}</label>}

                <input className={classes.Input}name= "password"  type="password" placeholder='password'onChange={handleChange}/> 
                {errors.password&& <label className={classes.error}>{errors.password}</label>}

               

                <input className={classes.Input} type="password" placeholder='confirm password' onChange={confirmPassword}/>   
                {errors.password2&& <label className={classes.error}>{errors.password2}</label>}

                   
                <h4>Major</h4>   
                <select onChange={handleView}>
                    <option>--select major--</option>
                    <option value = "software-engineer">software engineer</option>

                    <option value = "doctor">doctor</option>
                    <option value = "Pharmacist">Pharmacist</option>
                    <option value = "graphic-designer">graphic designer</option>
                    <option value = "data-analyst">data analyst</option>
                    <option value = "teacher">teacher</option>

                </select>

                {view==="sw"&&
                <div>

                <div>
                <h3>you are more into </h3>
                    <ul className={classes.Ul}>
                        <li className={classes.Li}>
                        <input  type="radio"name="pref"value="BackEnd"onChange={handleChange}/><label>BackEnd</label>
                        
                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="pref"value="FrontEnd"onChange={handleChange}/><label>FrontEnd</label>

                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="pref"value="Fullstack"onChange={handleChange}/><label>Fullstack</label>

                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="pref"value="testing"onChange={handleChange}/><label>testing</label>

                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="pref"value="DevOps"onChange={handleChange}/><label>DevOps</label>

                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="pref"value="mobile"onChange={handleChange}/><label>mobile dev</label>

                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="pref"value="embedded"onChange={handleChange}/><label>embedded</label>

                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="pref"value="R&D"onChange={handleChange}/><label>R&D</label>
                        </li>
      
                    </ul>
                    <h3>{formValues.pref}</h3>

                   
                </div>
                <div>
                    <h3>you consider yourself </h3>
                    <ul className={classes.Ul}>
                        <li className={classes.Li}>
                        <input type="radio"name="level"value="Intern"onChange={handleChange}/><label>Intern</label>
                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="level"value="Junior"onChange={handleChange}/><label>Junior</label>

                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="level"value="Mid-Level"onChange={handleChange}/><label>Mid Level</label>

                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="level"value="Senior"onChange={handleChange}/><label>Senior</label>

                        </li>
                        <li className={classes.Li}>
                        <input type="radio"name="level"value="Staff-Engineer"onChange={handleChange}/><label>Staff Engineer</label>

                        </li>
                    </ul>
                    <h3>{formValues.level}</h3>

                   

                </div>
                <div>
                    <h3>Your Favourite stack</h3>
                    <ul className={classes.Ul}>

                        {
                            stacks.map(stack=>{
                                return (
                                    <li className={classes.Li} key={stack}>
                                        <input  name="qualifications" type="checkbox"value={stack} onChange={handleChange}/><label key={stack}>{stack}</label>

                                    </li>
                                )
                                })
                            }
                        

                        
                     

                    </ul>
                    <h3>{formValues.qualifications.programmingLanguages}</h3>
 
                </div>
                </div>
                }
            <button className={classes.SubmitButton} type="submit" onClick={handleSubmit}> sign up</button>
            </form>
            </div>
        </div>


    )




    
  

  
       
  
}


export default (Register)