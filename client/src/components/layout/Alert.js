import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isObjectEmpty } from '../../utils/helper';

class Alert extends Component {
	constructor(props) {
		super();
		this.state = {
			alert: {}
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let stateObj = {};

		if (nextProps.alert) {
			stateObj = { ...stateObj, alert: nextProps.alert };
		}
		return stateObj;
	}

	render() {
		const { alert } = this.state;

		return (!isObjectEmpty(alert) &&
			<div className="row">
				<div className="col-md-12">
					<div className={`alert alert-${alert.type} text-center shadow-lg`}>
						<i className="fas fa-bullhorn"></i> {alert.message} <button type="button" className="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	alert: state.alert
});

export default connect(mapStateToProps)(Alert);