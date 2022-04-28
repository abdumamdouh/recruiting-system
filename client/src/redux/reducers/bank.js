import {
    CHOOSE_TOPIC_REQUEST,
    CHOOSE_TOPIC_SUCCESS,
    CHOOSE_TOPIC_FAIL,
    CHOOSE_SUBTOPIC_REQUEST,
    CHOOSE_SUBTOPIC_SUCCESS,
    CHOOSE_SUBTOPIC_FAIL,
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
        case CHOOSE_TOPIC_REQUEST:
            return {
                ...state
            };

        case CHOOSE_TOPIC_SUCCESS:
            return state.hasOwnProperty("createdQuestion")
                ? {
                      topic: action.payload,
                      createdQuestion: state.createdQuestion
                  }
                : {
                      topic: action.payload
                  };

        case CHOOSE_TOPIC_FAIL:
            return {
                error: action.payload
            };

        // choosing topic
        case CHOOSE_SUBTOPIC_REQUEST:
            return state;

        case CHOOSE_SUBTOPIC_SUCCESS:
            //console.log("bank reducer: ",action.payload)
            return state.hasOwnProperty("createdQuestion")
                ? {
                      topic: state.topic,
                      subtopic: action.payload,
                      createdQuestion: state.createdQuestion
                  }
                : {
                      topic: state.topic,
                      subtopic: action.payload
                  };

        case CHOOSE_SUBTOPIC_FAIL:
            return {
                error: action.payload
            };

        // get questions :

        case GET_QUESTIONS_REQUEST:
            return state;

        case GET_QUESTIONS_SUCCESS:
            return state.hasOwnProperty("createdQuestion")
                ? {
                      question: action.payload,
                      topic: state.topic,
                      subtopic: state.subtopic,
                      createdQuestion: state.createdQuestion
                  }
                : {
                      question: action.payload,
                      topic: state.topic,
                      subtopic: state.subtopic
                  };

        case GET_QUESTIONS_FAIL:
            return {
                error: action.payload
            };

        case CREATE_QUESTION_REQUEST:
            return state;

        case CREATE_QUESTION_SUCCESS:
            console.log("from reuxxxxx", action.payload);
            return { ...state, createdQuestion: action.payload };

        case CREATE_QUESTION_FAIL:
            return {
                error: action.payload
            };

        default:
            return {};
    }
};
export default bankReducer;
