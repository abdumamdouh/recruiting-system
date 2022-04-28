import {
    CHOOSE_TOPIC_REQUEST,
    CHOOSE_TOPIC_SUCCESS,
    CHOOSE_TOPIC_FAIL,
    CHOOSE_SUBTOPIC_REQUEST,
    CHOOSE_SUBTOPIC_SUCCESS,
    CHOOSE_SUBTOPIC_FAIL,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAIL
} from "../types/index";
import axios from "axios";

const serverURL = "http://localhost:5000";
export const getTopic = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: CHOOSE_TOPIC_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            //console.log(userInfo.token);
            //console.log(userData)
            const rawResponse = await fetch(`${serverURL}/topics`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                }
            });
            const data = await rawResponse.json();

            dispatch({ type: CHOOSE_TOPIC_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: CHOOSE_TOPIC_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};

export const getSubtopic = (topic, setView) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: CHOOSE_SUBTOPIC_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            //console.log(userInfo.token);
            //console.log(userData)
            const rawResponse = await fetch(`${serverURL}/subtopics/${topic}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                }
            });
            const data = await rawResponse.json();

            dispatch({ type: CHOOSE_SUBTOPIC_SUCCESS, payload: data });
            setView(topic);
        } catch (error) {
            dispatch({
                type: CHOOSE_SUBTOPIC_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};

export const getQuestions = (subtopic, view, setSubtopic) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_QUESTIONS_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            // console.log(userInfo.token);
            //console.log(userData)
            const rawResponse = await fetch(
                `${serverURL}/questions/${view}/${subtopic}`,
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

            dispatch({ type: GET_QUESTIONS_SUCCESS, payload: data });
            setSubtopic(subtopic);
        } catch (error) {
            dispatch({
                type: GET_QUESTIONS_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};
