import {
    GET_JOB_EXAMS_REQUEST,
    GET_JOB_EXAMS_SUCCESS,
    GET_JOB_EXAMS_FAIL
} from "../types";

const uploadedExamReducer = (state = {}, action) => {
    switch (action.type) {
            case GET_JOB_EXAMS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case GET_JOB_EXAMS_SUCCESS:
            return action.payload;

        case GET_JOB_EXAMS_FAIL:
            return {
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
export default uploadedExamReducer;