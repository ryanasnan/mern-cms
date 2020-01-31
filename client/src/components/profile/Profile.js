import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.props.clearAlert();
		this.props.clearErrors();

	}
	
	render() {
		return (
			<div className="row increase-min-height justify-content-center">
				<div className="col-md-8">
					<div className="row mt-4 mb-4 justify-content-center profile">
						<div className="col-md-8 user-info">
							<div className="top-user-info">
								<span className="mr-2">My Name</span>
								<span><Link className="btn btn-primary btn-sm btn-lightblue" to="#">Edit</Link></span>
								<span><Link className="btn btn-primary btn-sm btn-danger" to="#">Delete</Link></span>
							</div>
							<div className="mt-3">
								mailku@mail.com
							</div>
							<div className="mt-3">
								Biography
							</div>
						</div>
						<div className="col-md4 photo">
							<img alt="#" className="rounded-circle shadow" width="150" src="https://www.w3schools.com/howto/img_avatar.png" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { setAlert, clearAlert, setErrors, clearErrors })(withRouter(Profile));