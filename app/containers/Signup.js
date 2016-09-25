import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';

let styles;

export const SignUp = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		query: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			username: '',
			name: '',
			password: '',
			image: '',
		};
	},

	usernameChange: function(evt) {
		this.setState({ username: evt.target.value.toLowerCase() });
	},
	
	nameChange: function(evt) {
		this.setState({ name: evt.target.value });
	},

	passwordChange: function(evt) {
		this.setState({ password: evt.target.value });
	},

	handleSubmit: function(evt) {
		evt.preventDefault();
		console.log(this.state.username, this.state.name, this.state.password, this.state.image);
		// this.props.dispatch(signup(this.state.username, this.state.password));
	},

	render() {
		const isLoading = null; // this.props.appData && this.props.appData.get('loading');
		const errorMessage = null; // this.props.appData && this.props.appData.get('error');
		const redirectRoute = null; // this.props.query && this.props.query.redirect;
		const redirectQuery = null; // redirectRoute ? '?redirect=' + redirectRoute : '';

		return (
			<div>
				<Helmet title={'Sign Up'} />
				

				<h1>Sign Up</h1>

				<form onSubmit={this.handleSubmit}>

					<div>
						<label style={styles.label} htmlFor={'username'}>Username</label>
						<input id={'username'} name={'username'} type="text" style={styles.input} value={this.state.username} onChange={this.usernameChange} />
					</div>

					<div>
						<label style={styles.label} htmlFor={'name'}>Name</label>
						<input id={'name'} name={'name'} type="name" style={styles.input} value={this.state.name} onChange={this.nameChange} />
					</div>

					<div>
						<label style={styles.label} htmlFor={'password'}>Password</label>
						<input id={'password'} name={'password'} type="password" style={styles.input} value={this.state.password} onChange={this.passwordChange} />
					</div>

					<button name={'sign up'} className={'button'} onClick={this.handleSubmit}>
						Sign Up
					</button>

					<div style={styles.loaderContainer}>{isLoading}</div>

					<div style={styles.errorMessage}>{errorMessage}</div>

				</form>

				<Link to={'/signup' + redirectQuery}>
					Have an Account? Click to Login.
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

export default connect(mapStateToProps)(SignUp);

styles = {

};