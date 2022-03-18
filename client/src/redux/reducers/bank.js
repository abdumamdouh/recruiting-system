import {
    CHOOSE_CATEGORY_REQUEST,
    CHOOSE_CATEGORY_SUCCESS,
    CHOOSE_CATEGORY_FAIL,
    CHOOSE_TOPIC_REQUEST,
    CHOOSE_TOPIC_SUCCESS,
    CHOOSE_TOPIC_FAIL,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAIL
    
} from "../types";

const bankReducer = (state = {}, action) => {
    switch (action.type) {
        
        //choose category
        case CHOOSE_CATEGORY_REQUEST:
            //console.log("bank reducer: ",action.payload)

            return{
                ...state
            }

        case CHOOSE_CATEGORY_SUCCESS:
           // console.log("bank reducer: ",action.payload)
            return {
                category:action.payload,    
                ...state
            }    

        case CHOOSE_CATEGORY_FAIL:
            return{
                error: action.payload,
            }    
        case CHOOSE_TOPIC_REQUEST:
           
        console.log("reducer state",state)
            return state
        case CHOOSE_TOPIC_SUCCESS:
            console.log("bank reducer: ",action.payload)
            return {
                topic:action.payload,    
                category:state.category
            }    

        case CHOOSE_TOPIC_FAIL:
            return{
                error: action.payload,
            }    
        default:
            return state;
    }
};
export default bankReducer;