import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./common.module.scss";
import { loginUserAction } from "../../redux/actions/user";
function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  console.log(dispatch);
  const handleLoginForm = e => {
    e.preventDefault();
    dispatch(loginUserAction(email, password));
  };
  return (
    <div className={classes.BoxContainer}>
      <form onSubmit={handleLoginForm}>
        <input
          type="email"
          placeholder="Email"
          className={classes.Input}
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className={classes.Input}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" className={classes.SubmitButton}>
          Sign in
        </button>
      </form>
      <div style={{ margin: "10px" }}>
        <a className={classes.MutedLink} href="#">
          Forgot your password?
        </a>
      </div>

      <div style={{ margin: "10px" }}>
        <a className={classes.MutedLink} href="#">
          Don't have an account?
          <a href="#" className={classes.BoldLink}>
            SignUp
          </a>
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
