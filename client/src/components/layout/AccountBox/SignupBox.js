import React from "react";
import classes from "./AccountBox.module.scss";
import Register from "../../Forms/SignupForm"
function Signup() {
  return (
    <div className={classes.BoxContainer2}>
          <div className={classes.TopContainer}>
            <div className={classes.BoxDrop}></div>
          <div className={classes.HeaderContainer}>
              <h2>Welcome !</h2>
              <h5>Sign up and join us!</h5>
          </div>
          </div>
          <div className={classes.InnerContainer}>
              <Register />
          </div>
        </div>
  
    
    
  );
}

export default Signup;
