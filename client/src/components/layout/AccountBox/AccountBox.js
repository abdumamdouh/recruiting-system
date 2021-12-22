import React from "react";
import classes from "./AccountBox.module.scss";
import LoginForm from "../../Forms/LoginForm"
function AccountBox() {
  return (
    <div className={classes.BoxContainer}>
      <div className={classes.TopContainer}>
        <div className={classes.BoxDrop}></div>
      <div className={classes.HeaderContainer}>
          <h2>Welcome Back</h2>
          <h5>Please sign in to continue</h5>
      </div>
      </div>
      <div className={classes.InnerContainer}>
          <LoginForm />
      </div>
    </div>
  );
}

export default AccountBox;
