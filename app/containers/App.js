import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { login } from '../actions/app';
import AppNav from '../components/AppNav';

if (process.env.NODE_ENV !== 'production') {
	require('../../static/style.css');
}

export const App = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		children: PropTypes.object,
		dispatch: PropTypes.func,
	},

	statics: {
		readyOnActions: function(dispatch) {
			return Promise.all([
				dispatch(login())
			]);
		}
	},

	componentDidMount() {
	// 	// Need to check here so that getLoginData doesn't make a fetch twice
	// 	App.readyOnActions(this.props.dispatch);
	// this.props.dispatch(login());
	},

	render() {
		return (
			<div>
				<Helmet title="List of Links" />
				<AppNav loginData={this.props.appData.loginData} />
				{this.props.children}
			</div>
		);
	},

});

function mapStateToProps(state) {
	return {
		appData: state.app
	};
}

export default connect(mapStateToProps)(App);

