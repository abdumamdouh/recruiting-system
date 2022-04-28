import {
    CREATE_EXAM_REQUEST,
    CREATE_EXAM_SUCCESS,
    CREATE_EXAM_FAIL,
    GET_EXAMS_REQUEST,
    GET_EXAMS_SUCCESS,
    GET_EXAMS_FAIL,
    PICK_EXAM_REQUEST,
    PICK_EXAM_SUCCESS,
    PICK_EXAM_FAIL,
    GET_JOB_EXAMS_REQUEST,
    GET_JOB_EXAMS_SUCCESS,
    GET_JOB_EXAMS_FAIL,
    ASSIGN_TASK_TO_APPLICANTS_REQUEST,
    ASSIGN_TASK_TO_APPLICANTS_SUCCESS,
    ASSIGN_TASK_TO_APPLICANTS_FAIL,
    CREATE_QUESTION_FAIL,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_REQUEST
} from "../types/index";
import { getCategory, getTopic } from "./bank";
const serverURL = "http://localhost:5000";
export const createExamAction = (
    jobId,
    title,
    questions,
    isPrivate,
    showSuccessMessage
) => {
    let mcq = {
        jobId: jobId,
        title: title,
        questions: questions,
        isPrivate: isPrivate
    };
    console.log(mcq);
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: CREATE_EXAM_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(`${serverURL}/uploadMCQ`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                },
                body: JSON.stringify(mcq)
            });
            const data = await rawResponse;
            dispatch({ type: CREATE_EXAM_SUCCESS, payload: data });
            console.log("status", data.status);
            if (data.status !== 400) {
                showSuccessMessage();
            }
        } catch (error) {
            dispatch({
                type: CREATE_EXAM_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};

export const getExamsAction = (pageNumber) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_EXAMS_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(
                `${serverURL}/getAllMCQs/${pageNumber}`,
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
};
//pick exam from available exams

export const pickExamAction = (
    jobId,
    MCQId,
    startDate,
    expiryDate,
    duration,
    showSuccessMessage
) => {
    let mcq = {
        jobId: jobId,
        MCQId: MCQId,
        startDate: startDate,
        expiryDate: expiryDate,
        duration: duration
    };
    console.log(mcq);
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: PICK_EXAM_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(`${serverURL}/pickMCQ`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                },
                body: JSON.stringify(mcq)
            });
            const data = await rawResponse;
            dispatch({ type: PICK_EXAM_SUCCESS, payload: data });
            if (data.status !== 400) {
                showSuccessMessage();
            }
        } catch (error) {
            dispatch({
                type: PICK_EXAM_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};

//get available exams for certain job
export const getJobExamsAction = (jobId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_JOB_EXAMS_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(
                `${serverURL}/getAllTasks/${jobId}`,
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
            dispatch({ type: GET_JOB_EXAMS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_JOB_EXAMS_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};

export const assignExamAction = (
    jobId,
    id,
    selectionModel,
    showSuccessMessage
) => {
    let MCQ = { jobId: jobId, MCQ: { MCQId: id, applicants: selectionModel } };
    console.log(MCQ);
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ASSIGN_TASK_TO_APPLICANTS_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(`${serverURL}/assignTasks`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                },
                body: JSON.stringify(MCQ)
            });
            const data = await rawResponse;
            if (data.status !== 400) {
                showSuccessMessage();
            }
            dispatch({
                type: ASSIGN_TASK_TO_APPLICANTS_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: ASSIGN_TASK_TO_APPLICANTS_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};

//ADD QUESTION

export const createQuestion = (
    question,
    chooseSubtopic,
    chooseQuestions,
    selectedQuestions,
    setSelectedQuestions
) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: CREATE_QUESTION_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            const rawResponse = await fetch(`${serverURL}/createQuestion`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                },
                body: JSON.stringify(question)
            });
            const data = await rawResponse.json();

            dispatch({ type: CREATE_QUESTION_SUCCESS, payload: data });
            dispatch(getTopic());
            chooseSubtopic();
            chooseQuestions();
            setSelectedQuestions(selectedQuestions.concat([data]));
        } catch (error) {
            dispatch({
                type: CREATE_QUESTION_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};
