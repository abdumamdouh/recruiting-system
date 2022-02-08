import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./reducers/user";
// import productsReducer from "./reducers/products";
// import sidebarReducer from "./reducers/sideBar";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["sidebar"]
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
