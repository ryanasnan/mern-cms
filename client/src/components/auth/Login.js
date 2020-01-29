import React, { Component } from 'react';

class Login extends Component {
	render() {

		return (
			<div className="row increase-min-height">
				<div className="col-md-12">
					<form>
						<div className="form-group">
							<input type="email" className="form-control" placeholder="Enter email" />
						</div>
						<div className="form-group">
							<input type="password" className="form-control" placeholder="Password" />
						</div>
						<div className="text-center">
							<button type="submit" className="btn btn-success btn-round">Sign in</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Login;