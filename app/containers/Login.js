import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import SHA3 from 'crypto-js/sha3';
import encHex from 'crypto-js/enc-hex';
import { login, logout } from '../actions/login';
import ButtonLoader from '../components/ButtonLoader';

let styles;

export const Login = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		loginData: PropTypes.object,
		query: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			username: '',
			password: ''
		};
	},

	componentWillReceiveProps(nextProps) {
		// If there is a new ID in loginData, login was a sucess, so redirect
		const oldID = this.props.appData.loginData.id;
		const newID = nextProps.appData.loginData.id;
		if (newID && oldID !== newID) {
			// new ID exists and is not the same as oldusername
			// const redirectRoute = this.props.query && this.props.query.redirect;
			// this.props.dispatch(push(redirectRoute || '/'));
			browserHistory.push('/');
		}
	},

	usernameChange: function(evt) {
		this.setState({ username: evt.target.value.toLowerCase().trim() });
	},
	passwordChange: function(evt) {
		this.setState({ password: evt.target.value });
	},

	handleSubmit: function(evt) {
		evt.preventDefault();
		// console.log(this.state.username, this.state.password);
		this.props.dispatch(login(this.state.username, SHA3(this.state.password).toString(encHex)));
	},

	handleLogout: function() {
		this.props.dispatch(logout());
	},

	render() {
		// const isLoading = this.props.loginData.loading; // this.props.appData && this.props.appData.get('loading');
		const errorMessage = null; // this.props.appData && this.props.appData.get('error');
		const redirectRoute = null; // this.props.query && this.props.query.redirect;
		const redirectQuery = ''; // redirectRoute ? '?redirect=' + redirectRoute : '';

		const loginData = this.props.appData.loginData || {};
		if (loginData.username) {
			return (
				<div>
					<Helmet title={'Login · List of Links'} />
					<h1>Already logged in</h1>
					<p>You're alread logged in! If you'd like to login with a different account, please first logout.</p>
					<button className={'button'} style={styles.submitButton} onClick={this.handleLogout}>
						Logout
						<ButtonLoader isLoading={this.props.loginData.logoutLoading} />
					</button>
				</div>
			);
		}

		return (
			<div>
				<Helmet title={'Login · List of Links'} />
				

				<h1>Login</h1>

				<form onSubmit={this.handleSubmit}>

					<div>
						<label style={styles.label} htmlFor={'username'}>Username</label>
						<input id={'username'} name={'username'} type="text" style={styles.input} value={this.state.username} onChange={this.usernameChange} />
					</div>

					<div>
						<label style={styles.label} htmlFor={'password'}>Password</label>
						<input id={'password'} name={'password'} type="password" style={styles.input} value={this.state.password} onChange={this.passwordChange} />
					</div>

					<button name={'login'} className={'button'} style={styles.submitButton} onClick={this.handleSubmit}>
						Login
						<ButtonLoader isLoading={this.props.loginData.loginLoading} />
					</button>

					{this.props.loginData.error &&
						<div style={styles.errorMessage}>Username or Password incorrect</div>	
					}
					

				</form>

				<Link to={'/signup' + redirectQuery} className={'link'}>
					Need an Account? Click to Sign Up!
				</Link>

			</div>

		);
	}
});

function mapStateToProps(state) {
	return {
		appData: state.app,
		loginData: state.login,
	};
}

export default connect(mapStateToProps)(Login);

styles = {
	submitButton: {
		fontSize: '0.85em',
		padding: '.5em 1em',
		display: 'inline-block',
		margin: '1em 0em',
	},
	errorMessage: {
		display: 'inline-block',
		padding: '0em 2em',
		position: 'relative',
		top: '2px',
		color: '#E05151',
	},
};
