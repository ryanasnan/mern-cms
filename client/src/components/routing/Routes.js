import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Story from '../layout/Story';
import NotFound from '../layout/NotFound';
import About from '../layout/About';

const Routes = () => {
	return (
		<Fragment>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/story" component={Story} />
				<Route exact path="/about" component={About} />
				
				<Route component={NotFound} />
			</Switch>

		</Fragment>
	);
};

export default Routes;
