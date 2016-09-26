import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { login } from '../actions/login';

let styles;

export const Login = React.createClass({
	propTypes: {
		appData: PropTypes.object,
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
		this.setState({ username: evt.target.value.toLowerCase() });
	},
	passwordChange: function(evt) {
		this.setState({ password: evt.target.value });
	},

	handleSubmit: function(evt) {
		evt.preventDefault();
		// console.log(this.state.username, this.state.password);
		this.props.dispatch(login(this.state.username, this.state.password));
	},

	render() {
		const isLoading = null; // this.props.appData && this.props.appData.get('loading');
		const errorMessage = null; // this.props.appData && this.props.appData.get('error');
		const redirectRoute = null; // this.props.query && this.props.query.redirect;
		const redirectQuery = null; // redirectRoute ? '?redirect=' + redirectRoute : '';

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
					</button>

					<div style={styles.loaderContainer}>{isLoading}</div>

					<div style={styles.errorMessage}>{errorMessage}</div>

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
		appData: state.app
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
};
