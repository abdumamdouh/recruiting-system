import {
  REGISTER_APPLICANT_REQUEST,
  REGISTER_APPLICANT_SUCCESS,
  REGISTER_APPLICANT_FAIL,
  REGISTER_RECRUITER_REQUEST,
  REGISTER_RECRUITER_SUCCESS,
  REGISTER_RECRUITER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_APPLICANT_REQUEST,
  UPDATE_APPLICANT_SUCCESS,
  UPDATE_APPLICANT_FAIL,
  UPDATE_RECRUITER_REQUEST,
  UPDATE_RECRUITER_SUCCESS,
  UPDATE_RECRUITER_FAIL,
} from "../types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    //REGISTER_APPLICANT reducers
    case REGISTER_APPLICANT_REQUEST:
      return {
        loading: true
      };
    case REGISTER_APPLICANT_SUCCESS:
      return {
        userInfo: action.payload
      };
    case REGISTER_APPLICANT_FAIL:
      return {
        error: action.payload,
        loading: false
      };

    //REGISTER_APPLICANT reducers
    case REGISTER_RECRUITER_REQUEST:
      return {
        loading: true
      };
    case REGISTER_RECRUITER_SUCCESS:
      return {
        userInfo: action.payload
      };
    case REGISTER_RECRUITER_FAIL:
      return {
        error: action.payload,
        loading: false
      };

      //LOGIN
    case LOGIN_REQUEST:
      return {
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        userInfo: action.payload
      };
    case LOGIN_FAIL:
      return {
        error: action.payload
      };
    
      case LOGOUT:
      return {};

       //UPDATE_APPLICANT reducers
       case UPDATE_APPLICANT_REQUEST:
       return {
           loading: true
       };
   case UPDATE_APPLICANT_SUCCESS:
       return {
           userInfo: action.payload
       };
   case UPDATE_APPLICANT_FAIL:
       return {
           error: action.payload,
           loading: false
       };

   //UPDATE RECRUITER reducers
   case UPDATE_RECRUITER_REQUEST:
       return {
           loading: true
       };
   case UPDATE_RECRUITER_SUCCESS:
       return {
           userInfo: action.payload
       };
   case UPDATE_RECRUITER_FAIL:
       return {
           error: action.payload,
           loading: false
       };
    default:
      return state;
  }
};

export default userReducer;
