import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
	logout = (e) => {
		e.preventDefault();
		this.props.logout(this.props.history);
	}

	render() {
		const { auth: { isAuthenticated, loading } } = this.props;

		const authLinks = (
			<Fragment>
				<ul className="navbar-nav ml-auto d-flex align-items-center input-search mr-4">
					<div className="dropdown user-profile">
						<img alt="#" className="rounded-circle shadow user-profile-dropdown" width="50" id="menu1" data-toggle="dropdown" src="https://www.w3schools.com/howto/img_avatar.png" />
						<ul className="dropdown-menu dropdown-menu-right user-profile" role="menu" aria-labelledby="menu1">
							<li role="presentation">
								<Link role="menuitem" tabIndex="-1" to="/newstory">New Story</Link>
							</li>
							<li role="presentation">
								<Link role="menuitem" tabIndex="-1" to="/mystory">My Story</Link>
							</li>
							<hr></hr>
							<li role="presentation">
								<Link role="menuitem" tabIndex="-1" to="/profile">Profile</Link>
							</li>
							<hr></hr>
							<li role="presentation">
								<Link role="menuitem" tabIndex="-1" onClick={this.logout} to="#">Logout</Link>
							</li>
						</ul>
					</div>
				</ul>

			</Fragment>

		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto d-flex align-items-center">
				<li className="nav-item highlight mt-1 mb-1">
					<Link className="nav-link" to="/register">Sign Up</Link>
				</li>
				<li className="nav-item highlight mt-1 mb-1">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
			</ul>
		);

		return (
			<nav className="topnav navbar navbar-expand-lg navbar-light bg-white fixed-top">
				<div className="container">
					<Link className="navbar-brand" to="/"><strong>MERN CMS</strong></Link>
					<button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="navbar-collapse collapse" id="navbarColor02">
						<ul className="navbar-nav mr-auto d-flex align-items-center">
							<li className="nav-item">
								<Link className="nav-link" to="/about">About <span className="sr-only">(current)</span></Link>
							</li>
						</ul>

						<ul className="navbar-nav ml-auto d-flex align-items-center input-search mr-4">
							<li style={{ width: '100%' }}>
								<input type="text" className="form-control input-round" placeholder="Search" />
							</li>
						</ul>
						{!loading && (
							<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
						)}
					</div>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(
	withRouter(Navbar)
);