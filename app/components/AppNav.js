import React, { PropTypes } from 'react';
import { Link } from 'react-router';

let styles;

export const AppNav = React.createClass({
	propTypes: {
		loginData: PropTypes.object,
		handleLogout: PropTypes.func,
	},

	render() {
		const user = this.props.loginData || {};
		return (
			<div style={styles.container}>
				<Link to="/">
					<img style={styles.logo} src={'../../static/logo.png'} alt={'logo'} />
				</Link>

				{user.id 
					? <div className={'showChildOnHover'} style={styles.buttons}>
						{user.name}
						<div className={'hoverChild'} style={styles.navMenu}>
							<Link to={'/' + user.username} className={'underlineOnHover'} style={styles.navMenuItem}>Profile</Link>
							<div className={'underlineOnHover'} style={styles.navMenuItem} onClick={this.props.handleLogout}>Logout</div>
						</div>
					</div>
					: <div style={styles.buttons}>
						<Link to={'/login'} className={'link'}>Login</Link>
						<span style={{ padding: '0em 1em' }} />
						<Link to={'/signup'} className={'link'}>Sign Up</Link>
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
		top: '10px',
		textAlign: 'right',
		height: '40px',
		lineHeight: '40px',
	},
	navMenu: {
		backgroundColor: '#F5F5F5',
		border: '1px solid #DDD',
		padding: '1em .25em 0em 2em',
		zIndex: 10,
		position: 'absolute',
		lineHeight: '1em',
	},
	navMenuItem: {
		cursor: 'pointer',
		paddingBottom: '.5em',
		color: 'black',
		textDecoration: 'none',
		display: 'block'
	}
};
