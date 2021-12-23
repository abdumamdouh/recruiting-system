import React ,{useState} from 'react'
import { connect } from 'react-redux'
import classes from "../../components/Forms/common.module.scss"



const Register =()=> {
    const stacks=["HTML5/CSS3","NodeJs","MongoDB","MySQL","PostgreSQL","Python","PHP","DotNet","Java",
    "C/C++", "Ruby", "on", "Rails", "Unity", "R", "JavaScript", "AngularJs", "Angular", "TypeScript",
    "ReactJs", "VueJs", "React-Native", "Kotlin", "Flutter", "Xamarin", "Ionic", "PhoneGap", "iOS",
    "Objective", "C", "Swift", "Android", "Docker", "Electron", "Rust", "Scala", "Go"]
    const initialValues={firstname:"",lastname:"",username:"",email:"",password:"",pref:"",level:"",qualifications:{programmingLanguages:[]}}
    const [formValues, setFormValues]=useState(initialValues)
    const [programmingLanguages,setProgramminLanguages]=useState([])
    const [view,setView] = useState("notsw")

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

    // const handleLanguages =(e)=>{
    //     if(programmingLanguages.includes(e.target.value))
    //     {
    //         setProgramminLanguages( programmingLanguages.filter(entry=>entry!=e.target.value)  )

    //     }
    //     else{
    //         setProgramminLanguages([...programmingLanguages,e.target.value])

    //     }
    //     setFormValues({...formValues,qualifications:{...formValues.qualifications,programmingLanguages}})
    //     console.log(formValues)

    //}


    const handleView = (e)=>{
        if(e.target.value==="software-engineer"){
            setView("sw")
        }
        else setView("notsw")
    }


    const handleSubmit=(e)=>{
        e.preventDefault();

        const json =JSON.stringify(formValues)
        console.log(json)
    }

   

    return (
        <div className={classes.BoxContainer}>
            <h3>Account information</h3>
            <div classNam={classes.InnerContainer}>

           
            <form >
              
                <input className={classes.Input} name="firstname" placeholder='Firstname' onChange={handleChange}/>
                <input className={classes.Input} name="lastname" placeholder='lastname'onChange={handleChange}/>
                <input className={classes.Input} name="username" placeholder='username'onChange={handleChange}/> 
                <input className={classes.Input}name="email" placeholder='email'onChange={handleChange}/> 
                <input className={classes.Input}name= "password"  type="password" placeholder='password'onChange={handleChange}/> 
               

                <input className={classes.Input}type="password" placeholder='confirm password' />                    
                   
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
                        <li>
                        <input type="radio"name="level"value="Intern"onChange={handleChange}/><label>Intern</label>
                        </li>
                        <li>
                        <input type="radio"name="level"value="Junior"onChange={handleChange}/><label>Junior</label>

                        </li>
                        <li>
                        <input type="radio"name="level"value="Mid-Level"onChange={handleChange}/><label>Mid Level</label>

                        </li>
                        <li>
                        <input type="radio"name="level"value="Senior"onChange={handleChange}/><label>Senior</label>

                        </li>
                        <li>
                        <input type="radio"name="level"value="Staff-Engineer"onChange={handleChange}/><label>Staff Engineer</label>

                        </li>
                    </ul>
                    <h3>{formValues.level}</h3>

                   

                </div>
                <div>
                {/* <h3>your Favourit stack </h3>
                    <ul>
                        <li>
                        <input type="checkbox"value="c++"onChange={handleLanguages}/><label>C++</label>
                        </li>
                        <li>
                        <input type="checkbox"value="java"onChange={handleLanguages}/><label>java</label>

                        </li>
                        <li>
                        <input type="checkbox"value="python"onChange={handleLanguages}/><label>python</label>

                        </li>
                        <li>
                        <input type="checkbox"value="javascript"onChange={handleLanguages}/><label>java</label>

                        </li>
                        <li>
                        <input type="checkbox"value="r"onChange={handleLanguages}/><label>r</label>
                        

                        </li>
                        <li>
                        <input type="checkbox"value="C#"onChange={handleLanguages}/><label>C#</label>
                        

                        </li>
                        <li>
                        <input type="checkbox"value="kotlin"onChange={handleLanguages}/><label>kotlin</label>
                        

                        </li>
                        <li>
                        <input type="checkbox"value="typescript"onChange={handleLanguages}/><label>typescript</label>
                        

                        </li>
                        <li>
                        <input type="checkbox"value="PHP"onChange={handleLanguages}/><label>PHP</label>
                        

                        </li>
                        <li>
                        <input type="checkbox"value="ReactJs"/><label>ReactJs</label>


                        </li>
                        <li>
                        <input type="checkbox"value="ReactNative"/><label>React Native</label>


                        </li>
                        <li>
                        <input type="checkbox"value="VueJs"/><label>VueJs</label>


                        </li>
                        <li>
                        <input type="checkbox"value="NodeJs"/><label>NodeJs</label>


                        </li>
                        <li>
                        <input type="checkbox"value="QT"/><label>QT</label>


                        </li>
                        <li>
                        <input type="checkbox"value="DotNet"/><label>DotNet</label>


                        </li>
                        <li>
                        <input type="checkbox"value="Laravel"/><label>Laravel</label>


                        </li>
                        <li>
                        <input type="checkbox"value="MongoDB"/><label>MongoDB</label>


                        </li>
                        <li>
                        <input type="checkbox"value="PostgreSQL"/><label>PostgreSQL</label>


                        </li>
                        <li>
                        <input type="checkbox"value="Unity"/><label>Unity</label>


                        </li>
                        <li>
                        <input type="checkbox"value=" Flutter"/><label> Flutter</label>


                        </li>
                        <li>
                        <input type="checkbox"value="Ionic"/><label>Ionic</label>


                        </li>

                        
                        
                    </ul> */}


                </div>
                <div>
                    <h3>Your Favourite stack</h3>
                    <ul className={classes.Ul}>

                        {
                            stacks.map(stack=>{
                                return (
                                    <li key={stack}>
                                        <input name="qualifications" type="checkbox"value={stack} onChange={handleChange}/><label key={stack}>{stack}</label>

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

function mapStateToProps({authedUser}){
    return{authedUser

    }
}

export default connect(mapStateToProps)(Register)