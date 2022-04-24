
import {GET_TASKS_REQUEST,GET_TASKS_SUCCESS,GET_TASKS_FAIL} from "../types/index";
const serverURL = "http://localhost:5000";

//get all tasks
export const getTasksAction = (id) => {
    const JobId = id
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_TASKS_REQUEST,
                
            });
            const { userInfo } = getState().user;
            console.log(userInfo.token);
            console.log('tessssst',JobId)
            const rawResponse = await fetch(
                `${serverURL}/${JobId}/allTasks`,
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
}