import {
    PICK_EXAM_REQUEST,
    PICK_EXAM_SUCCESS,
    PICK_EXAM_FAIL,
} from "../types";

const choosenExamReducer = (state = {}, action) => {
    switch (action.type) {
            case PICK_EXAM_REQUEST:
            return {
                loading: true
            };
        case PICK_EXAM_SUCCESS:
            return {...state};

        case PICK_EXAM_FAIL:
            return {
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
export default choosenExamReducer;