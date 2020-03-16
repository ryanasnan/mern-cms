import {
	LOADING_LIKE,
	GET_LIKE
}
	from '../actions/types';

const initialState = {
	data: {},
	loading: true
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOADING_LIKE:
			return {
				...state,
				loading: true
			};
		case GET_LIKE:
			return {
				...state,
				loading: false,
				data: payload
			};
		default:
			return state;
	}
}