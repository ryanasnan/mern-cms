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
	dispatch(setStoryLoading());
	try {
		let queryString = '';
		if (objParams) {
			queryString = serializeObjToQueryString(objParams);
		}

		const res = await axios.get(`/api/story?${queryString}`);
		dispatch({
			type: GET_STORY,
			payload: res.data
		});

	} catch (error) {
		dispatch({
			type: GET_STORY,
			payload: null
		});
	}
}

// Get Story from User 
export const getUserStories = (objParams = null, userId) => async (dispatch) => {
	dispatch(setStoryLoading());
	try {
		let queryString = '';
		if (objParams) {
			queryString = serializeObjToQueryString(objParams);
		}

		const res = await axios.get(`/api/user/${userId}/story?${queryString}`);
		dispatch({
			type: GET_STORY,
			payload: res.data
		});

	} catch (error) {
		dispatch({
			type: GET_STORY,
			payload: null
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
	dispatch(setStoryLoading());
	try {
		const res = await axios.get(`/api/story/slug/${slug}`);

		dispatch({
			type: GET_STORY,
			payload: res.data
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

// Create story
export const createStory = (storyData, history) => async (dispatch) => {
	dispatch(setStoryLoading);
	try {
		await axios.post('/api/story', storyData);

		await history.push('/mystory');
		await dispatch(setAlert('Your story has successfully published', 'info'));
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

// Update story
export const updateStory = (id, storyData, history) => async (dispatch) => {
	dispatch(setStoryLoading);
	try {
		await axios.put(`/api/story/${id}`, storyData);

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
	dispatch(setStoryLoading);
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
export const setStoryLoading = () => {
	return {
		type: STORY_LOADING
	};
};

// Reset story state
export const resetStory = () => {
	return {
		type: RESET_STORY
	}
}