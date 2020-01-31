import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';
import validatePostInput from '../../validation/login';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
		this.props.clearAlert();
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.auth.isAuthenticated) {
			nextProps.history.push('/');
		}
		let stateObj = {};

		if (nextProps.errors) {
			stateObj = { ...stateObj, errors: nextProps.errors };
		}
		return stateObj;
	}

	onSubmit = e => {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		const { errors, isValid } = validatePostInput(userData);
		// check input validation
		if (!isValid) {
			this.props.setErrors(errors);
			this.props.setAlert('Error Input Validation', 'danger');
		} else {
			this.props.loginUser(userData);

		}

	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="row increase-min-height">
				<div className="col-md-12">
					<h2 className="font-weight-bold text-center">Login</h2>
					<form onSubmit={this.onSubmit}>
						<TextFieldGroup
							placeholder="Email Address"
							name="email"
							type="email"
							value={this.state.email}
							onChange={this.onChange}
							error={errors.email}
						/>

						<TextFieldGroup
							placeholder="Password"
							name="password"
							type="password"
							value={this.state.password}
							onChange={this.onChange}
							error={errors.password}
						/>
						<div className="text-center">
							<button type="submit" className="btn btn-success btn-round">Sign in</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser, setAlert, clearAlert, setErrors, clearErrors })(withRouter(Login));