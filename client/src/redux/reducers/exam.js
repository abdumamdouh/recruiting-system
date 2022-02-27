import {
    CREATE_EXAM_REQUEST,
    CREATE_EXAM_SUCCESS,
    CREATE_EXAM_FAIL
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
         
        default:
            return state;
    }
};
export default examReducer;