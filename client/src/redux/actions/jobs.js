import {
    GET_JOBS_REQUEST,
    GET_JOBS_SUCCESS,
    GET_JOBS_FAIL,
    CREATE_JOB_REQUEST,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_FAIL,
} from "../types/index";
import axios from "axios";
const serverURL = "http://localhost:5000";
export const getJobsAction = pageNumber => {
    return async dispatch => {
        try {
            dispatch({ type: GET_JOBS_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const { data } = await axios.post(
                `${serverURL}/Feed`,
                {
                    pageNumber: pageNumber
                },
                config
            );

            dispatch({ type: GET_JOBS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_JOBS_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};
export const createJobAction = (userData, redirect) => {
            return async (dispatch, getState) => {
                try {
                    dispatch({
                        type: CREATE_JOB_REQUEST,
                        loading: true
                    });
                    const { userInfo } = getState().user;
                    console.log(userInfo.token);
                    const rawResponse = await fetch(
                        `${serverURL}/CreateJob`,
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + userInfo.token
                            },
                            body: JSON.stringify(userData)
                        }
                    );

            dispatch({ type: CREATE_JOB_SUCCESS, payload: 'Job created Successfully' });
            redirect()
        } catch (error) {
            dispatch({
                type: CREATE_JOB_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};
