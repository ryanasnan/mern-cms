import axios from 'axios';
import { isObjectEmpty, serializeObjToQueryString } from '../utils/helper';
import { setAlert } from './alert';
import { setErrors } from './error';

import {
	STORY_LOADING,
	GET_STORY,
	RESET_STORY
}
	from './types';

// Get All Stories
export const getStories = (objParams = null) => async (dispatch) => {
	const stateOption = 'stories';
	dispatch(setStoryLoading(stateOption));
	try {
		let queryString = '';
		if (objParams) {
			queryString = serializeObjToQueryString(objParams);
		}

		const res = await axios.get(`/api/story?${queryString}`);
		dispatch({
			type: GET_STORY,
			payload: res.data,
			stateOption: stateOption
		});

	} catch (error) {
		dispatch({
			type: GET_STORY,
			payload: null,
			stateOption: stateOption
		});
	}
}

// Get Story from User 
export const getUserStories = (objParams = null, userId) => async (dispatch) => {
	const stateOption = 'stories';
	dispatch(setStoryLoading(stateOption));
	try {
		let queryString = '';
		if (objParams) {
			queryString = serializeObjToQueryString(objParams);
		}

		const res = await axios.get(`/api/user/${userId}/story?${queryString}`);
		dispatch({
			type: GET_STORY,
			payload: res.data,
			stateOption: stateOption
		});

	} catch (error) {
		dispatch({
			type: GET_STORY,
			payload: null,
			stateOption: stateOption
		});
	}
}

// Get Story by Id
export const getStory = (id, history) => async (dispatch) => {
	dispatch(setStoryLoading());
	try {
		const res = await axios.get(`/api/story/${id}`);
		dispatch({
			type: GET_STORY,
			payload: res.results
		});
	} catch (error) {
		dispatch(setAlert('The story does not exist', 'danger'));
		history.push('/notfound');

		dispatch({
			type: GET_STORY,
			payload: null
		});
	}
}

// Get Story by Slug
export const getStoryBySlug = (slug, history) => async (dispatch) => {
	const stateOption = 'story';
	dispatch(setStoryLoading(stateOption));
	try {
		const res = await axios.get(`/api/story/slug/${slug}`);

		dispatch({
			type: GET_STORY,
			payload: res.data,
			stateOption: stateOption
		});
	} catch (error) {
		dispatch(setAlert('The story does not exist', 'danger'));
		history.push('/notfound');

		dispatch({
			type: GET_STORY,
			payload: null,
			stateOption: stateOption
		});
	}
}


export const getRandomStory = () => async (dispatch) => {
	const stateOption = 'randomStory';
	dispatch(setStoryLoading(stateOption));
	try {
		const res = await axios.get('/api/randomstory');
		
		dispatch({
			type: GET_STORY,
			payload: res.data,
			stateOption: stateOption
		})
	} catch (err) {
		dispatch({
			type: GET_STORY,
			payload: null,
			stateOption: stateOption
		})
	}
}

// Create story
export const createStory = (storyData, history) => async (dispatch) => {
	const stateOption = 'story';
	const config = {     
		headers: { 'content-type': 'multipart/form-data' }
	}
	dispatch(setStoryLoading(stateOption));
	try {
		await axios.post('/api/story', storyData, config);

		await history.push('/mystory');
		await dispatch(setAlert('Your story has successfully published', 'info'));
	} catch (err) {
		console.log(err.response);
		const errors = err.response.data.error;
		if (errors) {
			const inputError = !isObjectEmpty(errors.details) ? errors.details : {};
			dispatch(setErrors(inputError));

			const message = errors.message ? errors.message : "";
			dispatch(setAlert(message, 'danger'));
		}
	}
}

// Update story
export const updateStory = (id, storyData, hasNewImage=false, history) => async (dispatch) => {
	const stateOption = 'story';
	let queryString = '';
	if(hasNewImage) {
		queryString = `has_new_image=${hasNewImage}`;
	}	
	dispatch(setStoryLoading(stateOption));
	try {
		await axios.put(`/api/story/${id}?${queryString}`, storyData);

		await history.push('/mystory');
		await dispatch(setAlert('Your story has successfully updated', 'info'));
	} catch (err) {
		const errors = err.response.data.error;
		if (errors) {
			const inputError = !isObjectEmpty(errors.details) ? errors.details : {};
			dispatch(setErrors(inputError));

			const message = errors.message ? errors.message : "";
			dispatch(setAlert(message, 'danger'));
		}
	}
}

// Delete story
export const deleteStory = (id) => async (dispatch) => {
	const stateOption = 'story';
	dispatch(setStoryLoading(stateOption));
	try {
		await axios.delete(`/api/story/${id}`);
	} catch (err) {
		const errors = err.response.data.error;
		if (errors) {
			const inputError = !isObjectEmpty(errors.details) ? errors.details : {};
			dispatch(setErrors(inputError));

			const message = errors.message ? errors.message : "";
			dispatch(setAlert(message, 'danger'));
		}
	}
}

// Set loading state
export const setStoryLoading = (stateOption) => {
	return {
		type: STORY_LOADING,
		stateOption: stateOption
	};
};

// Reset story state
export const resetStory = () => {
	return {
		type: RESET_STORY
	}
}