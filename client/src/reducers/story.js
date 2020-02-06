import {
	STORY_LOADING,
	GET_STORY,
	RESET_STORY
}
	from '../actions/types';

const initialState = {
	stories: {
		data: {},
		loading: true
	},
	story: {
		data: {},
		loading: true
	},
	popularStories: {
		data: {},
		loading: true
	},
	randomStory: {
		data: {},
		loading: true
	},
	relatedStories: {
		data: {},
		loading: true
	},
};

export default function (state = initialState, action) {
	const { type, payload, stateOption } = action;

	if (state[stateOption] !== 'undefined') {

		let objState = { ...state };

		switch (type) {
			case STORY_LOADING:
				objState[stateOption] = {
					...objState[stateOption],
					loading: true
				};
				return objState;
			case GET_STORY:
				objState[stateOption] = {
					data: payload,
					loading: false
				};
				return objState;
			case RESET_STORY:
				return initialState;
			default:
				return state;
		}

	}

}