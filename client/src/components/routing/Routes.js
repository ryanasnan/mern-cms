import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Story from '../story/Story';
import NotFound from '../layout/NotFound';
import About from '../layout/About';
import CreateEditStory from '../story/CreateEditStory';
import MyStory from '../story/MyStory';
import Authorize from '../layout/Authorize';

import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import Profile from '../profile/Profile';

const Routes = () => {
	return (
		<Fragment>
			<Switch>
				<AuthRoute exact path="/login" component={Login} />
				<AuthRoute exact path="/register" component={Register} />
				<Route exact path="/story" component={Story} />
				<Route exact path="/about" component={About} />
				<PrivateRoute exact path="/profile" component={Profile} />
				<PrivateRoute exact path="/newstory" component={CreateEditStory} />
				<PrivateRoute exact path="/mystory" component={MyStory} />

				<Route exact path="/authorize" component={Authorize} />
				<Route component={NotFound} />
			</Switch>

		</Fragment>
	);
};

export default Routes;
