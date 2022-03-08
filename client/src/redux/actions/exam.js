import {
    CREATE_EXAM_REQUEST,
    CREATE_EXAM_SUCCESS,
    CREATE_EXAM_FAIL,
    GET_EXAMS_REQUEST,
    GET_EXAMS_SUCCESS,
    GET_EXAMS_FAIL,
    PICK_EXAM_REQUEST,
    PICK_EXAM_SUCCESS,
    PICK_EXAM_FAIL
} from "../types/index";
import axios from "axios";
const serverURL = "http://localhost:5000";
export const createExamAction = (jobId,topic,questions,privatee, expiryDate,duration) => {
    let mcq={jobId:jobId,topic:topic,questions:questions, private: privatee, expiryDate:expiryDate, duration:duration}
    console.log(mcq)
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: CREATE_EXAM_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(
                `${serverURL}/uploadMCQ`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.token
                    },
                    body: JSON.stringify(mcq)
                }
            );
            const data = await rawResponse
    dispatch({ type: CREATE_EXAM_SUCCESS, payload: data });
} catch (error) {
    dispatch({
        type: CREATE_EXAM_FAIL,
        payload: error.response && error.response.data
    });
}
};
};

export const getExamsAction = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_EXAMS_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(
                `${serverURL}/getAllMCQs`,
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
    dispatch({ type: GET_EXAMS_SUCCESS, payload: data });
   
} catch (error) {
    dispatch({
        type: GET_EXAMS_FAIL,
        payload: error.response && error.response.data
    });
}
};
}
//pick exam from available exams

export const pickExamAction = (jobId,MCQId, expiryDate,duration) => {
    let mcq={jobId:jobId, MCQId: MCQId,expiryDate:expiryDate, duration:duration}
    console.log(mcq)
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: PICK_EXAM_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(
                `${serverURL}/pickMCQ`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.token
                    },
                    body: JSON.stringify(mcq)
                }
            );
            const data = await rawResponse
    dispatch({ type: PICK_EXAM_SUCCESS, payload: data });
} catch (error) {
    dispatch({
        type: PICK_EXAM_FAIL,
        payload: error.response && error.response.data
    });
}
};
};