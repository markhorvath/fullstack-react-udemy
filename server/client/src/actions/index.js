import axios from 'axios';
import { FETCH_USER } from './types';

//took out curly braces after the => and the rerturn keyword, if an => func
//is only one return statement you don't need to included return or braces
//also got rid of the function keyword and turned to => func, then added
//async await and got rid of .then
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
}

export const submitSurvey = (values) => {
  return { type: 'submit_survey' }
}
