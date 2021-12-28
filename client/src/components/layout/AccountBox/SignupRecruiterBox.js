import React from "react";
import classes from "./AccountBox.module.scss";
import RegisterAsRecruiter from "../../Forms/SignUpAsRecruiter"
function SignupRecruiter() {
  return (
    <div className={classes.BoxContainer2}>
          <div className={classes.TopContainer}>
            <div className={classes.BoxDrop}></div>
          <div className={classes.HeaderContainer}>
              <h2>Welcome !</h2>
              <h5>Sign up and start hiring!</h5>
          </div>
          </div>
          <div className={classes.InnerContainer}>
              <RegisterAsRecruiter />
          </div>
        </div>
  
    
    
  );
}

export default SignupRecruiter;
