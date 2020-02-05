import React from 'react';
import { connect } from 'react-redux';
import { resetStory } from '../../actions/story';

const NormalizeReduxState = (ComposedComponent, reduxState = null) => {
	class Authenticate extends React.Component {
		constructor(props) {
			super(props);
			if (reduxState !== null && (Array.isArray(reduxState) && reduxState.length)) {
				if (reduxState.includes('story')) {
					this.props.resetStory();
				}
			}
		}
		render() {

			return (
				<ComposedComponent {...this.props} />
			);
		}
	}

	const mapStateToProps = (state) => ({
		auth: state.auth,
		story: state.story
	});

	return connect(
		mapStateToProps,
		{ resetStory }
	)(Authenticate)

}

export default NormalizeReduxState;

