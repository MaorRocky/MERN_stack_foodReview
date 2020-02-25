import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import resturant from './resturant';
export default combineReducers({
  alert,
  auth,
  profile,
  post,
  resturant
});
