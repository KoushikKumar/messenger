import { combineReducers } from 'redux';

import userReducer from './user_reducer.js';

const rootReducer = combineReducers({
  user:userReducer
});

export default rootReducer;
