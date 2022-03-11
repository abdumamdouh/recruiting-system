import {
    CREATE_EXAM_REQUEST,
    CREATE_EXAM_SUCCESS,
    CREATE_EXAM_FAIL,
    GET_EXAMS_REQUEST,
    GET_EXAMS_SUCCESS,
    GET_EXAMS_FAIL,
} from "../types";

const examReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_EXAM_REQUEST:
            return {
                loading: true
            };
        case CREATE_EXAM_SUCCESS:
            return state;

        case CREATE_EXAM_FAIL:
            return {
                error: action.payload,
                loading: false
            };
            case GET_EXAMS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case GET_EXAMS_SUCCESS:
            console.log( 'redux',action.payload)
            return  action.payload;

        case GET_EXAMS_FAIL:
            return {
                error: action.payload,
                loading: false
            };
       
        default:
            return state;
    }
};
export default examReducer;