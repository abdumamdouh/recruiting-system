import {
  ASSIGN_TASK_TO_APPLICANTS_REQUEST,
  ASSIGN_TASK_TO_APPLICANTS_SUCCESS,
  ASSIGN_TASK_TO_APPLICANTS_FAIL
} from "../types";

const assignedExamReducer = (state = {}, action) => {
    switch (action.type) {
            case ASSIGN_TASK_TO_APPLICANTS_REQUEST:
            return {
                loading: true
            };
        case ASSIGN_TASK_TO_APPLICANTS_SUCCESS:
            return {...state};

        case ASSIGN_TASK_TO_APPLICANTS_FAIL:
            return {
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
export default assignedExamReducer;