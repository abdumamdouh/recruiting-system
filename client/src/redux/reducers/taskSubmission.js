import {
    GET_TASK_SUBMISSIONS_REQUEST,
    GET_TASK_SUBMISSIONS_SUCCESS,
    GET_TASK_SUBMISSIONS_FAIL
} from "../types";

const taskSubmissionReducer = (state = {}, action) => {
    switch (action.type) {
            case GET_TASK_SUBMISSIONS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case GET_TASK_SUBMISSIONS_SUCCESS:
            console.log( 'redux',action.payload)
            return  action.payload;

        case  GET_TASK_SUBMISSIONS_FAIL:
            return {
                error: action.payload,
                loading: false
            };
       
        default:
            return state;
    }
};
export default taskSubmissionReducer;