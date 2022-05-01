import {

    GET_CODINGPROBLEMS_REQUEST,
    GET_CODINGPROBLEMS_SUCCESS,
    GET_CODINGPROBLEMS_FAIL,
} from "../types";

const codingProblemsReducer = (state = {}, action) => {
    switch (action.type) {
       
        case GET_CODINGPROBLEMS_REQUEST:
        return {
            loading: true,
            ...state
        };
        case GET_CODINGPROBLEMS_SUCCESS:
            console.log( 'redux',action.payload)
            return  action.payload;

        case GET_CODINGPROBLEMS_FAIL:
            return {
                error: action.payload,
                loading: false
            };
       
        default:
            return state;
    }
};
export default codingProblemsReducer;