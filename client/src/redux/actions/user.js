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
    LOGOUT
} from "../types";

const serverURL = "http://localhost:5000";

// register Applicant
const registerApplicantAction = (Applicant, redirect, showError, showSuccessMessage) => {
    console.log(Applicant);
    return async dispatch => {
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
            showSuccessMessage();
            setTimeout(() => {
                redirect()
              }, 1000);
        } catch (error) {
            dispatch({
                type: REGISTER_APPLICANT_FAIL,
                payload: error.response && error.response.data
            });
            showError();
        }
    };
};

// register Recruiter
const registerRecruiterAction = (Recruiter, redirect, showError,showSuccessMessage) => {
    return async dispatch => {
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
            showSuccessMessage()
            setTimeout(() => {
                redirect()
              }, 1000);
            
        } catch (error) {
            dispatch({
                type: REGISTER_RECRUITER_FAIL,
                payload: error.response && error.response.data
            });
            showError();
        }
    };
};

const loginUserAction = (email, password, redirect, showError,showSuccessMessage) => {
    return async dispatch => {
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
            showSuccessMessage()
            setTimeout(() => {
                redirect()
              }, 1000);
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response && error.response.data
            });
            showError();
        }
    };
};

//Log out
const logoutUserAction = () => {
    return {
        type: LOGOUT
    };
};

export {
    registerApplicantAction,
    registerRecruiterAction,
    loginUserAction,
    logoutUserAction
};
