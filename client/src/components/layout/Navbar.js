import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render() {
		return (
			<nav className="topnav navbar navbar-expand-lg navbar-light bg-white fixed-top">
				<div className="container">
					<Link className="navbar-brand" to="./"><strong>MERN CMS</strong></Link>
					<button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="navbar-collapse collapse" id="navbarColor02">
						<ul className="navbar-nav mr-auto d-flex align-items-center">
							<li className="nav-item">
								<a className="nav-link" href="./about">About <span className="sr-only">(current)</span></a>
							</li>
						</ul>

						<ul className="navbar-nav ml-auto d-flex align-items-center">
							<li className="nav-item highlight">
								<Link className="nav-link" to="/register">Sign Up</Link>
							</li>
							<li className="nav-item highlight">
								<Link className="nav-link" to="/login">Login</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

export default Navbar;