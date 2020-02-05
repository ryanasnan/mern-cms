import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import alert from './alert';
import story from './story';

export default combineReducers({
	alert,
	auth,
	errors,
	story
});