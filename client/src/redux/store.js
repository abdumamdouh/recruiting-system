import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from "./middleware/logger";

import rootReducer from './rootReducer';

const middleware = [thunk,logger];
//local storage 
// const userAuthFromStorage = localStorage.getItem('userAuthData')
//   ? JSON.parse(localStorage.getItem('userAuthData'))
//   : null;
// const initialState = {
//user => user reducer
//   user: { userInfo: userAuthFromStorage },
// };
export const store = createStore(
  rootReducer,
  //initialState for local storage
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
