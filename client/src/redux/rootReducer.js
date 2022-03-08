import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./reducers/user";
import jobsReducer from "./reducers/jobs";
import jobReducer from "./reducers/job";
import examReducer from './reducers/exam'
import choosenExamReducer from './reducers/exam'

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["sidebar"]
};

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobsReducer,
  job: jobReducer,
  exam:examReducer,
  choosenExam:choosenExamReducer
});

export default persistReducer(persistConfig, rootReducer);
