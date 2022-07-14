import {
    GET_JOBS_REQUEST,
    GET_JOBS_SUCCESS,
    GET_JOBS_FAIL,
    GET_RECRUITER_JOBS_REQUEST,
    GET_RECRUITER_JOBS_SUCCESS,
    GET_RECRUITER_JOBS_FAIL,
    CREATE_JOB_REQUEST,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_FAIL,
} from "../types/index";

const jobsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_JOBS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case GET_JOBS_SUCCESS:
            console.log( 'redux',action.payload)
            return  action.payload;

        case GET_JOBS_FAIL:
            return {
                error: action.payload,
                loading: false
            };
        case GET_RECRUITER_JOBS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case GET_RECRUITER_JOBS_SUCCESS:
            console.log( 'redux rec',action.payload)
            return  action.payload;

        case GET_RECRUITER_JOBS_FAIL:
            return {
                error: action.payload,
                loading: false
            };
        case CREATE_JOB_REQUEST:
            return {
                loading: true
            };
        case CREATE_JOB_SUCCESS:
            return state;

        case CREATE_JOB_FAIL:
            return {
                error: action.payload,
                loading: false
            };
         
        default:
            return state;
    }
};
export default jobsReducer;
