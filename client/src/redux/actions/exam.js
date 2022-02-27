import {
    CREATE_EXAM_REQUEST,
    CREATE_EXAM_SUCCESS,
    CREATE_EXAM_FAIL
} from "../types/index";
import axios from "axios";
const serverURL = "http://localhost:5000";
export const createExamAction = (jobId,topic,questions) => {
    let mcq={jobId:jobId,topic:topic,questions:questions}
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