import React, { Component } from 'react';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import Editor from 'react-medium-editor';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';

class CreateEditStory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
		this.props.clearAlert();
		this.props.clearErrors();
	}

	render() {
		return (
			<div className="row increase-min-height">
				<div className="col-md-12">
					<div className="text-right">
						<button className="btn btn-secondary">Add Image</button>
						<button className="btn btn-primary ml-4">Publish</button>
					</div>
					<div className="row">
						<div className="col-md-12">
							<input placeholder="Title" className="input-title-story" />
							<Editor
								text={this.state.text}
								onChange={this.handleChange}
								data-placeholder="Write Your Story"
							/>

						</div>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { setAlert, clearAlert, setErrors, clearErrors })(withRouter(CreateEditStory));