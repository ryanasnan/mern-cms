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
import NormalizeReduxState from './NormalizeReduxState';

import Profile from '../profile/Profile';

const Routes = () => {
	return (
		<Fragment>
			<Switch>
				<AuthRoute exact path="/login" component={Login} />
				<AuthRoute exact path="/register" component={Register} />
				<Route exact path="/story/:slug" component={NormalizeReduxState(Story, ['story'])} />
				<Route exact path="/about" component={About} />
				<PrivateRoute exact path="/profile" component={Profile} />
				<PrivateRoute exact path="/newstory" component={NormalizeReduxState(CreateEditStory, ['story']) } />
				<PrivateRoute exact path="/editstory/:slug" component={NormalizeReduxState(CreateEditStory, ['story'])} />
				<PrivateRoute exact path="/mystory" component={NormalizeReduxState(MyStory, ['story'])} />

				<Route exact path="/authorize" component={Authorize} />
				<Route exact path="/notfound" component={NotFound} />
				<Route component={NotFound} />
			</Switch>

		</Fragment>
	);
};

export default Routes;
