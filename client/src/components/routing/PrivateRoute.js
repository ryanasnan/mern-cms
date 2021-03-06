import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (auth.loading) {
				return <Spinner mainLoading={true} />
			}
			else {
				if (!auth.isAuthenticated) {
					return (
						<Redirect to='/authorize' />
					)
				}
				else {
					return (
						<Component {...props} />
					)
				}

			}
		}
		}
	/>
);


const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);