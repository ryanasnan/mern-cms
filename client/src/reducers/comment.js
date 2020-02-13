import {
	LOADING_COMMENT,
	GET_COMMENT
}
	from '../actions/types';

const initialState = {
	data: {},
	totalCommentAndReplies: 0,
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
			let arrComments = payload;
			let totalReplies = 0;
			for (let indexCommentStory = 0; indexCommentStory < arrComments.length; indexCommentStory++) {
				for (let indexReplyComment = 0; indexReplyComment < arrComments[indexCommentStory].reply.length; indexReplyComment++) {
					totalReplies = totalReplies + 1;
				}
			}
			let totalCommentAndReplies = totalReplies + arrComments.length;

			return {
				...state,
				loading: false,
				data: payload,
				totalCommentAndReplies
			};
		default:
			return state;
	}
}