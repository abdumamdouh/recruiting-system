import {
    CHOOSE_CATEGORY_REQUEST,
    CHOOSE_CATEGORY_SUCCESS,
    CHOOSE_CATEGORY_FAIL,
    CHOOSE_TOPIC_REQUEST,
    CHOOSE_TOPIC_SUCCESS,
    CHOOSE_TOPIC_FAIL

} from "../types/index";



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
