import {
    GET_JOBS_REQUEST,
    GET_JOBS_SUCCESS,
    GET_JOBS_FAIL,
    CREATE_JOB_REQUEST,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_FAIL,
    GET_JOB_BY_ID_REQUEST,
    GET_JOB_BY_ID_SUCCESS,
    GET_JOB_BY_ID_FAIL,
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
        // //get job by id
        // case GET_JOB_BY_ID_REQUEST:
        //     return {
        //         loading: true,
        //         ...state
        //     };
        // case GET_JOB_BY_ID_SUCCESS:
        //     return  action.payload;

        // case GET_JOB_BY_ID_FAIL:
        //     return {
        //         error: action.payload,
        //         loading: false
        //     };    
        default:
            return state;
    }
};
export default jobsReducer;
