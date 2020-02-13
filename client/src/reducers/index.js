import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import alert from './alert';
import story from './story';
import comment from './comment';

export default combineReducers({
	alert,
	auth,
	errors,
	story,
	comment
});