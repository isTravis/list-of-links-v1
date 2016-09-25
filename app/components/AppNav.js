import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const AppNav = React.createClass({
	propTypes: {
		loginData: PropTypes.object,
	},

	render() {
		const user = this.props.loginData || {};
		return (
			<div className="appnav-container">
				<Link to="/">Home</Link>
				<p>{user.name} | {user.username}</p>
			</div>
		);
	}

});

export default AppNav;
