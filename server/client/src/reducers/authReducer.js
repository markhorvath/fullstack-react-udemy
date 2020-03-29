import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    //return action.payload || false, whenever using JS, an emptry sting is interpreted as falsy value
    //action.payload was returning an emptry string if it didnt find current user, so we Added
    //this || false as a way to make sure the value 'false' is returned instead of ''
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
