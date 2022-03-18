import {
    CHOOSE_CATEGORY_REQUEST,
    CHOOSE_CATEGORY_SUCCESS,
    CHOOSE_CATEGORY_FAIL,
    CHOOSE_TOPIC_REQUEST,
    CHOOSE_TOPIC_SUCCESS,
    CHOOSE_TOPIC_FAIL,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAIL

} from "../types/index";
import axios from "axios";


const serverURL = "http://localhost:5000";
export const getCategory = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: CHOOSE_CATEGORY_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            //console.log(userInfo.token);
           //console.log(userData)
            const rawResponse = await fetch(
                `${serverURL}/categories`,
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


    dispatch({ type: CHOOSE_CATEGORY_SUCCESS, payload:data });
} catch (error) {
    dispatch({
        type: CHOOSE_CATEGORY_FAIL,
        payload: error.response && error.response.data
    });
}
};
};



export const getTopic = (category,setView) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: CHOOSE_TOPIC_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            //console.log(userInfo.token);
           //console.log(userData)
            const rawResponse = await fetch(
                `${serverURL}/topics/${category}`,
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


    dispatch({ type: CHOOSE_TOPIC_SUCCESS, payload:data });
    setView(category);
} catch (error) {
    dispatch({
        type: CHOOSE_TOPIC_FAIL,
        payload: error.response && error.response.data
    });
}
};
};





export const getQuestions = (topic,setTopic) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_QUESTIONS_REQUEST,
                loading: true
            });
            const { userInfo } = getState().user;
            //console.log(userInfo.token);
           //console.log(userData)
            const rawResponse = await fetch(
                `${serverURL}/questions/${topic}`,
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


    dispatch({ type: GET_QUESTIONS_SUCCESS, payload:data });
    setTopic(topic);
} catch (error) {
    dispatch({
        type: GET_QUESTIONS_FAIL,
        payload: error.response && error.response.data
    });
}
};
};

