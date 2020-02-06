import React, { Component } from 'react';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import Editor from 'react-medium-editor';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';
import { createStory, getStoryBySlug, updateStory } from '../../actions/story';
import validateStoryInput from '../../validation/story';
import { isObjectEmpty, isNullOrEmptyObject } from '../../utils/helper';

class CreateEditStory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			text: '',
			storySlug: '',
			errors: {}
		}
		this.props.clearAlert();
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let stateObj = {};

		// props story data will be null if in create mode, otherwise will be object
		// if the props story empty object, page will be redirected to notfound page 

		if (!isNullOrEmptyObject(nextProps.story.story.data)) {
			if (nextProps.auth.user._id !== nextProps.story.story.data.results.user._id) {
				nextProps.history.push('/authorize');
				nextProps.setAlert('You not owner of this resource', 'secondary');
			}

			if (prevState.title === '' && prevState.text === '') {
				stateObj = {
					...stateObj,
					title: nextProps.story.story.data.results.title,
					text: nextProps.story.story.data.results.text
				}

			}
		}

		if (!isObjectEmpty(nextProps.match.params)) {
			stateObj = {
				...stateObj,
				storySlug: nextProps.match.params.slug
			}
		}

		if ((prevState.storySlug) && nextProps.story.story.data == null) {
			nextProps.history.push('/notfound');
			nextProps.setAlert('The resource not found', 'secondary');
		}

		if (nextProps.errors) {
			stateObj = { ...stateObj, errors: nextProps.errors };
		}
		return stateObj;
	}

	handleEditorChange = (text) => {
		this.setState({ text: text });
	}

	handleTitleChange = (e) => {
		this.setState({ title: e.target.value })
	}

	onSubmit = e => {
		e.preventDefault();

		let storyId;
		if (!isNullOrEmptyObject(this.props.story.story.data)) {
			storyId = this.props.story.story.data.results._id;
		}

		const storyData = {
			title: this.state.title,
			text: this.state.text
		};

		const { errors, isValid } = validateStoryInput(storyData);
		// check input validation
		if (!isValid) {
			this.props.setErrors(errors);
			this.props.setAlert('Error Input Validation', 'danger');
		} else {
			if (typeof storyId !== 'undefined') {
				this.props.updateStory(storyId, storyData, this.props.history);
			}
			else {
				this.props.createStory(storyData, this.props.history);
			}
		}

	}

	loadStory(slug) {
		this.props.getStoryBySlug(slug, this.props.history);
	}

	componentDidMount() {
		const { storySlug } = this.state;
		if (storySlug !== '') {
			this.loadStory(storySlug);
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="row increase-min-height">
				<div className="col-md-12">
					<form onSubmit={this.onSubmit}>
						<div className="text-center">
							<button className="btn btn-secondary">Add Image</button>
							<button type="submit" className="btn btn-primary ml-4">{!this.state.storySlug ? 'Publish' : 'Submit'}</button>
						</div>
						<div className="row">
							{/* image preview, PS: the image can be minimize */}
						</div>
						<div className="row">
							<div className="col-md-12">
								<input placeholder="Title" onChange={this.handleTitleChange} className="input-title-story" value={this.state.title} />
								{errors && <div className="invalid-feedback-story">{errors.title}</div>}

								<Editor
									text={this.state.text}
									onChange={this.handleEditorChange}
									data-placeholder={this.state.text ? '' : `Write Your Story`}
								/>
								{errors && <div className="invalid-feedback-story">{errors.text}</div>}
							</div>
						</div>

					</form>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	story: state.story
});

export default connect(mapStateToProps, { createStory, getStoryBySlug, updateStory, setAlert, clearAlert, setErrors, clearErrors })(withRouter(CreateEditStory));