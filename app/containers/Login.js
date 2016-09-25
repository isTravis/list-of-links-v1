import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { login, logout } from '../actions/login';

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

	handleLogout: function() {
		this.props.dispatch(logout());
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

					<button name={'login'} className={'button'} onClick={this.handleSubmit}>
						Login
					</button>

					<div style={styles.loaderContainer}>{isLoading}</div>

					<div style={styles.errorMessage}>{errorMessage}</div>

				</form>

				<Link to={'/signup' + redirectQuery}>
					Need an Account? Click to Sign Up!
				</Link>

				{this.props.appData.loginData.id &&
					<div onClick={this.handleLogout}>Logout</div>
				}

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

};
