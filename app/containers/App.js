import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { login, getRecent } from '../actions/app';
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
				dispatch(login()),
				dispatch(getRecent())
			]);
		}
	},

	handleLogout: function() {
		this.props.dispatch(logout());
	},

	render() {
		return (
			<div>
				<Helmet 
					title="List of Links"  
					meta={[
						{ name: 'description', content: 'A simple tool for collecting and sharing a list of links' },
						{ property: 'og:title', content: 'List of Links' },
						{ property: 'og:type', content: 'website' },
						{ property: 'og:description', content: 'A simple tool for collecting and sharing a list of links' },
						{ property: 'og:url', content: 'https://www.listoflinks.co/' },
						{ property: 'og:image', content: 'https://www.listoflinks.co/static/logo.png' },
						{ property: 'og:image:url', content: 'https://www.listoflinks.co/static/logo.png' },
						{ property: 'og:image:width', content: '500' },
						{ name: 'twitter:card', content: 'summary' },
						{ name: 'twitter:site', content: '@listoflinks' },
						{ name: 'twitter:title', content: 'List of Links' },
						{ name: 'twitter:description', content: 'A simple tool for collecting and sharing a list of links' },
						{ name: 'twitter:image', content: 'https://www.listoflinks.co/static/logo.png' },
						{ name: 'twitter:image:alt', content: 'Logo for List of Links' }
					]} />
				<AppNav loginData={this.props.appData.loginData} handleLogout={this.handleLogout} />
				<div style={{ minHeight: 'calc(100vh - 75px)' }}>{this.props.children}</div>
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

