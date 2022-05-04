import {

    GET_CODINGPROBLEMS_REQUEST,
    GET_CODINGPROBLEMS_SUCCESS,
    GET_CODINGPROBLEMS_FAIL,
    GET_PROBLEM_BY_ID_REQUEST,
    GET_PROBLEM_BY_ID_SUCCESS,
    GET_PROBLEM_BY_ID_FAIL,
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



        case GET_PROBLEM_BY_ID_REQUEST:
            return {
                loading: true,
                ...state
            };
        case GET_PROBLEM_BY_ID_SUCCESS:
            console.log( 'redux',action.payload)
            return  {Count:state.Count,
                codingProblems:state.codingProblems,
                codingProblem:action.payload};

        case GET_PROBLEM_BY_ID_FAIL:
            return {
                error: action.payload,
                loading: false
            };    
       
        default:
            return state;
    }
};
export default codingProblemsReducer;