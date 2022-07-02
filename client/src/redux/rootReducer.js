import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./reducers/user";
import jobsReducer from "./reducers/jobs";
import jobReducer from "./reducers/job";
import examReducer from './reducers/exam'
import choosenExamReducer from './reducers/exam'
import uploadedExamReducer from "./reducers/uploadedExams";
import assignedExamReducer from "./reducers/assignedExams";
import bankReducer from "./reducers/bank";
import taskReducer from "./reducers/task";
import taskSubmissionReducer from "./reducers/taskSubmission"; 
import MarksReducer from "./reducers/Mark"; 
import codingProblemsReducer from './reducers/codingProblemBank'
import resultsReducer from "./reducers/results"
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
  choosenExam:choosenExamReducer,
  uploadedExams: uploadedExamReducer,
  assignedEXam: assignedExamReducer,
  bank:bankReducer,
  tasks: taskReducer,
  taskSubmissions: taskSubmissionReducer,
  marks:MarksReducer,
  codingProblems:codingProblemsReducer,
  results: resultsReducer,
});

export default persistReducer(persistConfig, rootReducer);
