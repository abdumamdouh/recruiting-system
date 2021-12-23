import React ,{useState} from 'react'

import classes from "./common.module.scss";



const RegisterAsRecruiter =()=> {
    const initialValues={firstname:"",lastname:"",username:"",email:"",password:""}
    const [formValues, setFormValues]=useState(initialValues)
    
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormValues({...formValues,[name]:value})

    }

    const handleSubmit=(e)=>{
        e.preventDefault();


        console.log(formValues)
    }



   

   

    return (
        <div className={classes.BoxContainer}>
            <h3>Account information</h3>
            <form className={classes.FormContainer}>
              
                <input className={classes.Input}  name="firstname" placeholder='Firstname' onChange={handleChange}/>
                <input className={classes.Input}name="lastname" placeholder='lastname'onChange={handleChange}/>
                <input className={classes.Input}name="username" placeholder='username'onChange={handleChange}/> 
                <input className={classes.Input} name="email" placeholder='email'onChange={handleChange}/> 
                <input className={classes.Input}name= "password"  type="password" placeholder='password'onChange={handleChange}/> 
               

                <input className={classes.Input} type="password" placeholder='confirm password' />                    
                <input className={classes.Input} name= "company"   placeholder='company'onChange={handleChange}/> 

             
                <input className={classes.Input} name= "position"   placeholder='position'onChange={handleChange}/> 


                <button className={classes.SubmitButton} type= "submit" onClick={handleSubmit}> sign up </button>
            </form>
        </div>


    )




    
  

  
       
  
}



export default (RegisterAsRecruiter)