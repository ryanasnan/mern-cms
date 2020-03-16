import {
	LOADING_COMMENT,
	GET_COMMENT
}
	from '../actions/types';

const initialState = {
	data: {},
	totalCommentsAndReplies: 0,
	loading: true
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOADING_COMMENT:
			return {
				...state,
				loading: true
			};
		case GET_COMMENT:
			return {
				...state,
				loading: false,
				data: payload.comments,
				totalCommentsAndReplies: payload.totalCommentsAndReplies
			};
		default:
			return state;
	}
}