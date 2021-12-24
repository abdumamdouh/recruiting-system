import axios from "axios";
import {
  REGISTER_APPLICANT_REQUEST,
  REGISTER_APPLICANT_SUCCESS,
  REGISTER_APPLICANT_FAIL,
  REGISTER_RECRUITER_REQUEST,
  REGISTER_RECRUITER_SUCCESS,
  REGISTER_RECRUITER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types";

const serverURL = "http://localhost:3000"

// register Applicant
const registerApplicantAction = (Applicant) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTER_APPLICANT_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const { data } = await axios.post(
        `${serverURL}/Applicant/Sign-up`,
        Applicant,
        config
      );
      dispatch({ type: REGISTER_APPLICANT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REGISTER_APPLICANT_FAIL,
        payload: error.response && error.response.data.message
      });
    }
  };
};

// register Recruiter
const registerRecruiterAction = (Recruiter) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTER_RECRUITER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const { data } = await axios.post(
        `${serverURL}/Recruiter/Sign-up`,
          Recruiter,
        config
      );
      dispatch({ type: REGISTER_RECRUITER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REGISTER_RECRUITER_FAIL,
        payload: error.response && error.response.data.message
      });
    }
  };
};


const loginUserAction = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
  
      const { data } = await axios.post(
        `${serverURL}/login`,
        {
          email,
          password
        },
        config
      );
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response && error.response.data.message
      });
    }
  };
};

//Log out
const logoutUserAction = () => {
  return {
    type: LOGOUT
  };
};


export { registerApplicantAction, registerRecruiterAction, loginUserAction, logoutUserAction };
