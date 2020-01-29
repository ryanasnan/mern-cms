import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Routes from './components/routing/Routes';
import Stories from './components/layout/Stories';

import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<Navbar />
				<div className="container mt-5">
					<Switch>
						<Route exact path="/" component={Stories} />
						<Route component={Routes} />
					</Switch>
				</div>
				<div className="container mt-3 mb-3">
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App;