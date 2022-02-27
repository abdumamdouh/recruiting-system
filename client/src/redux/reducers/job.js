import {
    GET_JOB_BY_ID_REQUEST,
    GET_JOB_BY_ID_SUCCESS,
    GET_JOB_BY_ID_FAIL,
    EDIT_JOB_REQUEST,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_FAIL
} from "../types/index";

const jobReducer = (state = {}, action) => {
    switch (action.type) {
        
        //get job by id
        case GET_JOB_BY_ID_REQUEST:
            return {
                loading: true,
                ...state
            };
        case GET_JOB_BY_ID_SUCCESS:
            return  action.payload;

        case GET_JOB_BY_ID_FAIL:
            return {
                error: action.payload,
                loading: false
            };    
        case EDIT_JOB_REQUEST:
        return {
            loading: true,
            ...state
        };
        case EDIT_JOB_SUCCESS:
        return  action.payload;
        case EDIT_JOB_FAIL:
        return {
            error: action.payload,
            loading: false
        };    
        default:
            return state;
    }
};
export default jobReducer;