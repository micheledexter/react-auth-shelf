import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import item from './itemReducer';

const store = combineReducers({
  user,
  login,
  item,
});

export default store;
