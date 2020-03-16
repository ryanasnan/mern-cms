import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import alert from './alert';
import story from './story';
import storyComment from './storyComment';
import storyLike from './storyLike';

export default combineReducers({
	alert,
	auth,
	errors,
	story,
	storyComment,
	storyLike
});