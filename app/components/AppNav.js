import React, { PropTypes } from 'react';
import { Link } from 'react-router';

let styles;

export const AppNav = React.createClass({
	propTypes: {
		loginData: PropTypes.object,
	},

	render() {
		const user = this.props.loginData || {};
		return (
			<div style={styles.container}>
				<Link to="/">
					<img style={styles.logo} src={'../../static/logo.png'} alt={'logo'} />
				</Link>

				{user.id 
					? <div style={styles.buttons}>
						{user.name}
					</div>
					: <div style={styles.buttons}>
						<Link to={'/login'}>Login</Link>
						<span> | </span>
						<Link to={'/signup'}>Sign Up</Link>
					</div>
				}
				
			</div>
		);
	}

});

export default AppNav;

styles = {
	container: {
		borderBottom: '3px solid black',
		marginBottom: '1em',
		position: 'relative',
		height: '50px'
	},
	logo: {
		width: '50px',
		display: 'inline-block',
	},
	buttons: {
		position: 'absolute',
		right: '0',
		top: '20px',
	},
};
