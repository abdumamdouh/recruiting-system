import {
    CHOOSE_CATEGORY_REQUEST,
    CHOOSE_CATEGORY_SUCCESS,
    CHOOSE_CATEGORY_FAIL,
    CHOOSE_TOPIC_REQUEST,
    CHOOSE_TOPIC_SUCCESS,
    CHOOSE_TOPIC_FAIL,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAIL,
    CREATE_QUESTION_FAIL,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_REQUEST
    
    
} from "../types";

const bankReducer = (state = {}, action) => {
    switch (action.type) {
        
        //choose category
        case CHOOSE_CATEGORY_REQUEST:
            return{
                ...state }

        case CHOOSE_CATEGORY_SUCCESS:
            return state.hasOwnProperty("createdQuestion")?{
                category:action.payload,
                createdQuestion:state.createdQuestion
            }     :{
                category:action.payload,
            }    

        case CHOOSE_CATEGORY_FAIL:
            return{
                error: action.payload, }   
            
            
            // choosing topic
        case CHOOSE_TOPIC_REQUEST:
           return state
           
        case CHOOSE_TOPIC_SUCCESS:
            //console.log("bank reducer: ",action.payload)
            return state.hasOwnProperty("createdQuestion")?{
                category:state.category,
                topic:action.payload,
                createdQuestion:state.createdQuestion
            }     :{
                category:state.category,
                topic:action.payload
            }    

        case CHOOSE_TOPIC_FAIL:
            return{
                error: action.payload,
            }    



            // get questions :


        case GET_QUESTIONS_REQUEST:
            return state 

        case GET_QUESTIONS_SUCCESS:
            return state.hasOwnProperty("createdQuestion")?{
                question:action.payload,    
                category:state.category,
                topic:state.topic,
                createdQuestion:state.createdQuestion
            }     :{
                question:action.payload,    
                category:state.category,
                topic:state.topic
            }    

        case GET_QUESTIONS_FAIL:
            return{
                error: action.payload,
            } 
            
        case CREATE_QUESTION_REQUEST:
            return state 

        case CREATE_QUESTION_SUCCESS:
            console.log("from reuxxxxx",action.payload)
            return {...state,
            createdQuestion:action.payload}
            

        case CREATE_QUESTION_FAIL:
            return{
                error: action.payload,
            }     




        default:
            return {};
    }
};
export default bankReducer;