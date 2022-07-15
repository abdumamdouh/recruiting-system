import {
    GET_TASKS_REQUEST,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAIL,
    GET_TASK_SUBMISSIONS_REQUEST,
    GET_TASK_SUBMISSIONS_SUCCESS,
    GET_TASK_SUBMISSIONS_FAIL,
    SET_TASK_MARK_REQUEST,
    SET_TASK_MARK_SUCCESS,
    SET_TASK_MARK_FAIL
} from "../types/index";
const serverURL = "http://localhost:5000";

//get all tasks
export const getTaskAction = (id, pageNumber) => {
    const JobId = id;
    console.log("pageNum", pageNumber);
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_TASKS_REQUEST
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            console.log("tessssst", JobId);
            const rawResponse = await fetch(
                `${serverURL}/${JobId}/allTasks/${pageNumber}`,

                // `${serverURL}/getAllMCQs/${pageNumber}`,
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
            dispatch({ type: GET_TASKS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_TASKS_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};
export const getTaskSubmissionsAction = (JobId, TaskId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_TASK_SUBMISSIONS_REQUEST
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            console.log("tessssst", JobId);
            const rawResponse = await fetch(
                `${serverURL}/${JobId}/${TaskId}/taskDetails`,
                // `${serverURL}/getAllMCQs/${pageNumber}`,
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
            dispatch({ type: GET_TASK_SUBMISSIONS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_TASK_SUBMISSIONS_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};

export const setTaskMarkAction = (JobId, TaskId, Marks, showSuccessMessage) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: SET_TASK_MARK_REQUEST
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);

            const body = { JobId, TaskId, Marks };

            console.log(userInfo.token);
            const rawResponse = await fetch(
                `http://localhost:5000/setTaskMark`,
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

            dispatch({ type: SET_TASK_MARK_SUCCESS, payload: "done" });

            setTimeout(() => {
                dispatch(getTaskSubmissionsAction(JobId, TaskId));
            }, 500);
            showSuccessMessage();
        } catch (error) {
            dispatch({
                type: SET_TASK_MARK_FAIL,
                payload: error.response && error.response.data
            });
        }
    };
};
