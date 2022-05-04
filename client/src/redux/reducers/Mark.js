import {
    SET_TASK_MARK_REQUEST,
    SET_TASK_MARK_SUCCESS,
    SET_TASK_MARK_FAIL
} from "../types";

const MarksReducer = (state = {}, action) => {
    switch (action.type) {
            case SET_TASK_MARK_REQUEST:
            return {
                loading: true,
                ...state
            };
        case SET_TASK_MARK_SUCCESS:
            console.log( 'redux',action.payload)
            return  action.payload;

        case  SET_TASK_MARK_FAIL:
        
            return {
                error: action.payload,
                loading: false
            };
       
        default:
            return state;
    }
};
export default MarksReducer;