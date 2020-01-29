import React, { Component } from 'react';

class Register extends Component {
	render() {

		return (
			<div className="row increase-min-height">
				<div className="col-md-12">
					<form>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Enter Name" />
						</div>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Enter email" />
							<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
						</div>
						<div className="form-group">
							<input type="password" className="form-control" placeholder="Enter Password" />
						</div>
						<div className="form-group">
							<input type="password" className="form-control" placeholder="Confirm Password" />
						</div>
						<div className="text-center">
							<button type="submit" className="btn btn-success btn-round">Register</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Register;