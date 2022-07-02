import {
    GET_JOB_RESULTS_REQUEST,
    GET_JOB_RESULTS_SUCCESS,
    GET_JOB_RESULTS_FAIL,
} from "../types";

const resultsReducer = (state = {}, action) => {
    switch (action.type) {
     
            case GET_JOB_RESULTS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case GET_JOB_RESULTS_SUCCESS:
            console.log( 'redux RESULT',action.payload)
            return  action.payload;

        case GET_JOB_RESULTS_FAIL:
            return {
                error: action.payload,
                loading: false
            };
       
        default:
            return state;
    }
};
export default resultsReducer;