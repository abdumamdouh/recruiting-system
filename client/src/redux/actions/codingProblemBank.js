import {
    GET_CODINGPROBLEMS_REQUEST,
    GET_CODINGPROBLEMS_SUCCESS,
    GET_CODINGPROBLEMS_FAIL,
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
            const rawResponse = await fetch(
                `${serverURL}/codingProblems/${pageNumber}`,
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
            dispatch({ type: GET_CODINGPROBLEMS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_CODINGPROBLEMS_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};