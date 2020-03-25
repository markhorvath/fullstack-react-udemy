import { combineReducers } from 'redux';
import authReducer from './authReducer';

//some thought should go into naming the keys here, so 'auth' for authReducer
export default combineReducers({
  auth: authReducer
});
