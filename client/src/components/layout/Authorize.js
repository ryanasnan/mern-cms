import React from 'react';
import { Link } from 'react-router-dom';

const Authorize = () => {
	return (
		<div className="row increase-min-height">
			<div className="col-md-12">
				<h1 className='text-primary text-danger'>
					Authorize Error
	      		</h1>
				<p className='large'>Sorry, You can not access this process</p>
				<Link to="/">Go back on the main page</Link>
			</div>
		</div>
	);
};

export default Authorize;
