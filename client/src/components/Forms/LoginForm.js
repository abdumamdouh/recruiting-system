import React from "react";
import classes from "./common.module.scss";
function LoginForm() {
  return (
    <div className={classes.BoxContainer}>
      <div className={classes.FormContainer}>
        <input type="email" placeholder="Email" className={classes.Input} />
        <input
          type="password"
          placeholder="Password"
          className={classes.Input}
        />
      </div>
      <div style={{ margin: "10px" }}>
        <a className={classes.MutedLink} href="#">
          Forgot your password?
        </a>
      </div>
      <button type="submit" className={classes.SubmitButton}>
        Sign in
      </button>
      <div style={{ margin: "10px" }}>
        <a className={classes.MutedLink} href="#">
          Don't have an account?
          <a href="#" className={classes.BoldLink}>SignUp</a>
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
