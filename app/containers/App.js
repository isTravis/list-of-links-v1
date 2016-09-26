import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { login } from '../actions/app';
import AppNav from '../components/AppNav';
import AppFooter from '../components/AppFooter';
import { logout } from '../actions/login';

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

	handleLogout: function() {
		this.props.dispatch(logout());
	},

	render() {
		return (
			<div>
				<Helmet title="List of Links" />
				<AppNav loginData={this.props.appData.loginData} handleLogout={this.handleLogout} />
				<div style={{ minHeight: 'calc(100vh - 50px' }}>{this.props.children}</div>
				<AppFooter />
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

