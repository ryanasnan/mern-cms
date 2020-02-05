import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Stories from './components/story/Stories';
import Alert from './components/layout/Alert';

import Routes from './components/routing/Routes';
import NormalizeReduxState from './components/routing/NormalizeReduxState';

import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import { logout, loadUser } from './actions/auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add(fas);

if (localStorage.jwtToken) {
	const decoded = jwt_decode(localStorage.jwtToken);

	// // Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logout());
		// Redirect to login
		window.location.href = '/login';
	}
}
store.dispatch(loadUser());

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Navbar />
					<div className="container mt-5">
						<Alert />
						<Switch>
							<Route exact path="/" component={NormalizeReduxState(Stories, ['story'])} />
							<Route component={Routes} />
						</Switch>
					</div>
					<div className="container mt-3 mb-3">
						<Footer />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App;