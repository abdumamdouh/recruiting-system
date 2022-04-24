import {
    GET_TASKS_REQUEST,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAIL,
} from "../types";

const taskReducer = (state = {}, action) => {
    switch (action.type) {
     
            case GET_TASKS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case GET_TASKS_SUCCESS:
            console.log( 'redux',action.payload)
            return  action.payload;

        case GET_TASKS_FAIL:
            return {
                error: action.payload,
                loading: false
            };
       
        default:
            return state;
    }
};
export default taskReducer;