import {
    GET_CODINGPROBLEMS_REQUEST,
    GET_CODINGPROBLEMS_SUCCESS,
    GET_CODINGPROBLEMS_FAIL,
    GET_PROBLEM_BY_ID_REQUEST,
    GET_PROBLEM_BY_ID_SUCCESS,
    GET_PROBLEM_BY_ID_FAIL,
    CHOOSE_CODING_PROBLEM_REQUEST,
    CHOOSE_CODING_PROBLEM_SUCCESS,
    CHOOSE_CODING_PROBLEM_FAIL
} from "../types/index";

const serverURL = "http://localhost:5000";


export const getCodingProblemsAction = (pageNumber) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_CODINGPROBLEMS_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const body = {pageNumber: pageNumber}
            const rawResponse = await fetch(
                `${serverURL}/codingProblems`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.token
                    },
                    body: JSON.stringify(body)
                
                }
            );
            const data = await rawResponse.json();
            dispatch({ type: GET_CODINGPROBLEMS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_CODINGPROBLEMS_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};




export const getCodingProblemByIdAction = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_PROBLEM_BY_ID_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(
                `${serverURL}/getFullCodingProblem/${id}`,
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
            dispatch({ type: GET_PROBLEM_BY_ID_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_PROBLEM_BY_ID_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};




export const chooseProblemAction = (
    jobId,
    codingProblemId,
    startDate,
    expiryDate,
    duration,
    showSuccessMessage
) => {
    let problem = {
        jobId: jobId,
        codingProblemId: codingProblemId,
        startDate: startDate,
        deadline: expiryDate,
        duration: duration
    };
    console.log(problem);
    return async (dispatch, getState) => {
        try {
            dispatch({
                type:CHOOSE_CODING_PROBLEM_REQUEST                ,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(`${serverURL}/chooseCodingProblem`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                },
                body: JSON.stringify(problem)
            });
            const data = await rawResponse;
            dispatch({ type: CHOOSE_CODING_PROBLEM_SUCCESS, payload: data });
            if (data.status !== 400) {
                showSuccessMessage();
            }
        } catch (error) {
            dispatch({
                type: CHOOSE_CODING_PROBLEM_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};
