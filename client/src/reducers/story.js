import {
	STORY_LOADING,
	GET_STORY,
	RESET_STORY
}
	from '../actions/types';

const initialState = {
	data: {},
	loading: true
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case STORY_LOADING:
			return {
				...state,
				loading: true
			}
		case GET_STORY:
			return {
				...state,
				data: payload,
				loading: false
			}
		case RESET_STORY:
			return initialState;
		default:
			return state;
	}
}