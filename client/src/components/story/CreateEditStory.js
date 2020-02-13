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
			picture: {
				newInputSingleFile: {},
				previewURL: '',
				showPreview: false
			},
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

			if (prevState.picture.previewURL === '' && nextProps.story.story.data.results.picture !== '') {
				stateObj = {
					...stateObj,
					picture: {
						...prevState.picture,
						previewURL: `/${nextProps.story.story.data.results.picture.directoryPath}/${nextProps.story.story.data.results.picture.fileName}`,
						showPreview: true
					}
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

		let storyData = {
			title: this.state.title,
			text: this.state.text
		};

		const { errors, isValid } = validateStoryInput(storyData);
		// check input validation (the image will be validate on back end)
		if (!isValid) {
			this.props.setErrors(errors);
			this.props.setAlert('Error Input Validation', 'danger');
		} else {
			let formStory = new FormData();
			formStory.append('title', storyData.title);
			formStory.append('text', storyData.text);

			let hasNewImage = false;
			if (!isObjectEmpty(this.state.picture.newInputSingleFile)) {
				formStory.append('picture', this.state.picture.newInputSingleFile);
				hasNewImage = true;
			}

			if (typeof storyId !== 'undefined') {
				this.props.updateStory(storyId, formStory, hasNewImage, this.props.history);
			}
			else {
				this.props.createStory(formStory, this.props.history);
			}
		}
	}

	loadStory(slug) {
		this.props.getStoryBySlug(slug, this.props.history);
	}

	previewImage = (e) => {
		const file = e.target.files[0];

		if (file.type.split('/')[0] === 'image') {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = function (e) {
				this.setState({
					picture: {
						newInputSingleFile: file,
						previewURL: e.target.result,
						showPreview: true
					}
				})
			}.bind(this);
		}
		else {
			this.props.setAlert('Please Upload an Image', 'orange');
		}

	}

	componentDidMount() {
		const { storySlug } = this.state;
		if (storySlug !== '') {
			this.loadStory(storySlug);
		}
	}

	render() {
		const { errors, storySlug, picture, title, text } = this.state;

		return (
			<div className="row increase-min-height">
				<div className="col-md-12">
					<form onSubmit={this.onSubmit}>
						<div className="text-center">
							<button type="submit" className={`btn ${!storySlug ? 'btn-primary' : 'btn-secondary'}`}>{!storySlug ? 'Publish' : 'Update'}</button>
						</div>
						<div className="row mt-4 mb-4">
							<label className={`btn mb-0 preview-story ${picture.showPreview == false ? 'no-image' : ''} `} htmlFor="story-image">
								{
									picture.showPreview == false
										? 'Add Picture'
										: <img alt="" src={picture.previewURL} />
								}
							</label>
							<input type="file" id="story-image" className="image-story" name="user[image]" multiple={true} onChange={this.previewImage} />
						</div>
						<div className="row">
							<div className="col-md-12">
								<input placeholder="Title" onChange={this.handleTitleChange} className="input-title-story" value={title} />
								{errors && <div className="invalid-feedback-story">{errors.title}</div>}

								<Editor
									text={text}
									onChange={this.handleEditorChange}
									data-placeholder={text ? '' : `Write Your Story`}
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