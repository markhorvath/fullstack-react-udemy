import { combineReducers } from 'redux';
//he imported it as reduxForm because just using the default name (reducer)
//might be confusing
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

//some thought should go into naming the keys here, so 'auth' for authReducer
//redux-form has to be assigned to a special key which is 'form'
export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
