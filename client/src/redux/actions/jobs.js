import {
    GET_JOBS_REQUEST,
    GET_JOBS_SUCCESS,
    GET_JOBS_FAIL,
    GET_RECRUITER_JOBS_REQUEST,
    GET_RECRUITER_JOBS_SUCCESS,
    GET_RECRUITER_JOBS_FAIL,
    CREATE_JOB_REQUEST,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_FAIL,

    GET_JOB_BY_ID_REQUEST,
    GET_JOB_BY_ID_SUCCESS,
    GET_JOB_BY_ID_FAIL,
    EDIT_JOB_REQUEST,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_FAIL, 
    GET_JOB_RESULTS_REQUEST,
    GET_JOB_RESULTS_SUCCESS,
    GET_JOB_RESULTS_FAIL,

} from "../types/index";
import axios from "axios";
const serverURL = "http://localhost:5000";

export const getRecruiterJobsAction = (pageNumber) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: GET_RECRUITER_JOBS_REQUEST });
            const { userInfo } = getState().user;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                }
            };

            const { data } = await axios.post(
                `${serverURL}/recruiter/myjobs`,
                {
                    pageNumber: pageNumber
                },
                config
            );

            dispatch({ type: GET_RECRUITER_JOBS_SUCCESS, payload: data });
            
        } catch (error) {
            dispatch({
                type: GET_RECRUITER_JOBS_FAIL,
                payload: error
            });
        }
    };
};

export const getJobsAction = (pageNumber) => {
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
                payload: error
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
                    console.log(userData)
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


//get job by id
export const getJobByIdAction = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_JOB_BY_ID_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(
                `${serverURL}/jobs/${id}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.token
                    }
                }
            );
            const data = await rawResponse.json();        
    dispatch({ type: GET_JOB_BY_ID_SUCCESS, payload: data });
   
} catch (error) {
    dispatch({
        type: GET_JOB_BY_ID_FAIL,
        payload: error.response && error.response.data
    });
}
};
}
//edit 
export const editJobAction = (job) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: EDIT_JOB_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(
                `${serverURL}/jobs/${job.id}`,
                {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.token
                    },
                    body: JSON.stringify(job)
                }
            );
            const data = await rawResponse.json(); 
    dispatch({ type: EDIT_JOB_SUCCESS, payload: data});
   
} catch (error) {
    dispatch({
        type: EDIT_JOB_FAIL,
        payload: error.response && error.response.data
    });
}
};
};

//job results
export const getJobResultsAction = (id,setLoading) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_JOB_RESULTS_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(
                `${serverURL}/report/${id}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.token
                    }
                }
            );
            const data = await rawResponse.json();        
    dispatch({ type: GET_JOB_RESULTS_SUCCESS, payload: data });
   setLoading(true)
} catch (error) {
    dispatch({
        type: GET_JOB_RESULTS_FAIL,
        payload: error.response && error.response.data
    });
}
};
}