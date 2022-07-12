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
    UPDATE_APPLICANT_REQUEST,
    UPDATE_APPLICANT_SUCCESS,
    UPDATE_APPLICANT_FAIL,
    UPDATE_RECRUITER_REQUEST,
    UPDATE_RECRUITER_SUCCESS,
    UPDATE_RECRUITER_FAIL,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL
} from "../types";

const serverURL = "http://localhost:5000";

// register Applicant
const registerApplicantAction = (
    Applicant,
    redirect,
    showError,
    showSuccessMessage
) => {
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
                redirect();
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
const registerRecruiterAction = (
    Recruiter,
    redirect,
    showError,
    showSuccessMessage
) => {
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

            //TRYING LOCAL STORAGE
            //localStorage.setItem('userAuthData', JSON.stringify(data));

            showSuccessMessage();
            setTimeout(() => {
                redirect();
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

const loginUserAction = (
    email,
    password,
    redirect,
    showError,
    showSuccessMessage
) => {
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
            showSuccessMessage();
            setTimeout(() => {
                redirect();
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



//GET PROFILE


const getApplicantProfileAction = userData => {
    return async (dispatch, getState) => {
        try {
          // console.log(userData)
            dispatch({
                type: GET_PROFILE_REQUEST,
                loading: true,
            })
            const {userInfo} = getState().user
            //console.log(userInfo.token)
            const rawResponse = await fetch(`${serverURL}/Applicant/me`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + userInfo.token
                },
                body: JSON.stringify(userData)
              });
        
            const data = await rawResponse.json();

            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: data
                //payload:userData
            });
        } catch (error) {
            dispatch({
                type: GET_PROFILE_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};






//recruiter 


const getRecruiterProfileAction = userData => {
    return async (dispatch, getState) => {
        try {
          // console.log(userData)
            dispatch({
                type: GET_PROFILE_REQUEST,
                loading: true,
            })
            const {userInfo} = getState().user
            //console.log(userInfo.token)
            const rawResponse = await fetch(`${serverURL}/Recruiter/me`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + userInfo.token
                },
                body: JSON.stringify(userData)
              });
        
            const data = await rawResponse.json();

            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: data
                //payload:userData
            });
        } catch (error) {
            dispatch({
                type: GET_PROFILE_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};

//Log out
// const logoutUserAction = () => { 
//      return async (dispatch, getState) => {
//     try {
//       // console.log(userData)
//         dispatch({
//             type: LOGOUT,
//             loading: true,
//         })
//         const {userInfo} = getState().user
//         //console.log(userInfo.token)
//         const rawResponse = await fetch(`http://localhost:5000/logout`, {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 Authorization: "Bearer " + userInfo.token
//             }
//         });
//         const data = await rawResponse.json();
//         console.log(data);
  

//         // dispatch({
//         //     type: GET_PROFILE_SUCCESS,
//         //     payload: data
//         //     //payload:userData
//         // });
//     } catch (error) {
//         console.log(error)
//         // dispatch({
//         //     type: GET_PROFILE_FAIL,
//         //     payload: error.response && error.response.data
//         // });
//     }
// };
//     // return {
//     //     type: LOGOUT
//     // };
// };
const logoutUserAction = () => {
    return {
      type: LOGOUT
    };
  };
//logout with local storage
// export const logoutUser = () => {
//     return async dispatch => {
//       localStorage.removeItem('userAuthData');
//       try {
//         dispatch({
//           type: LOGOUT,
//         });
//       } catch (error) {}
//     };
//   };

const updateApplicantAction = userData => {
    return async (dispatch, getState) => {
        try {
          // console.log(userData)
            dispatch({
                type: UPDATE_APPLICANT_REQUEST,
                loading: true,
            })
            const {userInfo} = getState().user
            //console.log(userInfo.token)
            const rawResponse = await fetch(`${serverURL}/Applicant/me/update`, {
                method: 'PATCH',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + userInfo.token
                },
                body: JSON.stringify(userData)
              });
        
            const data = await rawResponse.json();

            dispatch({
                type: UPDATE_APPLICANT_SUCCESS,
                payload: data
                //payload:userData
            });
        } catch (error) {
            dispatch({
                type: UPDATE_APPLICANT_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};
const updateRecruiterAction = userData => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: UPDATE_RECRUITER_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(
                `${serverURL}/Recruiter/me/update`,
                {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.token
                    },
                    body: JSON.stringify(userData)
                }
            );

            const data = await rawResponse.json();

            dispatch({
                type: UPDATE_RECRUITER_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_RECRUITER_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};
export {
    registerApplicantAction,
    registerRecruiterAction,
    loginUserAction,
    logoutUserAction,
    updateApplicantAction,
    updateRecruiterAction,
    getApplicantProfileAction,
    getRecruiterProfileAction
    
    
};
