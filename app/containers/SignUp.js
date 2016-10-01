import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { signup } from '../actions/signup';
import { logout } from '../actions/login';
import ImageCropper from '../components/ImageCropper';

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
			email: '',
			password: '',
			userImageFile: null,
			userImageURL: undefined,
			userImagePreview: undefined,
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
	
	nameChange: function(evt) {
		this.setState({ name: evt.target.value });
	},

	emailChange: function(evt) {
		this.setState({ email: evt.target.value });
	},

	passwordChange: function(evt) {
		this.setState({ password: evt.target.value });
	},

	handleFileSelect: function(evt) {
		if (evt.target.files.length) {
			this.setState({ userImageFile: evt.target.files[0] });
		}
	},

	cancelImageUpload: function() {
		this.setState({ userImageFile: null });
		document.getElementById('userImage').value = null;
	},

	userImageUploaded: function(url, preview) {
		console.log(url);
		this.setState({ 
			userImageFile: null, 
			userImageURL: url,
			userImagePreview: preview 
		});
		document.getElementById('userImage').value = null;	
		
	},

	handleSubmit: function(evt) {
		evt.preventDefault();
		this.props.dispatch(signup(this.state.username, this.state.name, this.state.email, this.state.password, this.state.userImageURL));
	},

	handleLogout: function() {
		this.props.dispatch(logout());
	},

	render() {
		const isLoading = null; // this.props.appData && this.props.appData.get('loading');
		const errorMessage = null; // this.props.appData && this.props.appData.get('error');
		const redirectRoute = null; // this.props.query && this.props.query.redirect;
		const redirectQuery = null; // redirectRoute ? '?redirect=' + redirectRoute : '';

		const loginData = this.props.appData.loginData || {};
		if (loginData.username) {
			return (
				<div>
					<Helmet title={'Login · List of Links'} />
					<h1>Already logged in</h1>
					<p>You're alread logged in! If you'd like to sign up a new account, please first logout.</p>
					<button className={'button'} style={styles.submitButton} onClick={this.handleLogout}>Logout</button>
				</div>
			);
		}

		return (
			<div>
				<Helmet title={'Sign Up · List of Links'} />
				

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
						<label style={styles.label} htmlFor={'email'}>Email</label>
						<input id={'email'} name={'email'} type="email" style={styles.input} value={this.state.email} onChange={this.emailChange} />
					</div>

					<div>
						<label style={styles.label} htmlFor={'password'}>Password</label>
						<input id={'password'} name={'password'} type="password" style={styles.input} value={this.state.password} onChange={this.passwordChange} />
					</div>

					<div>
						<label htmlFor={'userImage'}>
							Profile Image
						</label>
						<img width="50px" src={this.state.userImagePreview} />
						<input id={'userImage'} name={'user image'} type="file" accept="image/*" onChange={this.handleFileSelect} />

					</div>

					{this.state.userImageFile &&
						<div style={styles.imageCropper}>
							<ImageCropper height={500} width={500} image={this.state.userImageFile} onCancel={this.cancelImageUpload} onUpload={this.userImageUploaded} />
						</div>
					}
					

					<button name={'sign up'} className={'button'} style={styles.submitButton} onClick={this.handleSubmit}>
						Sign Up
					</button>

					<div style={styles.loaderContainer}>{isLoading}</div>

					<div style={styles.errorMessage}>{errorMessage}</div>

				</form>

				<Link to={'/signup' + redirectQuery} className={'link'}>
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
	submitButton: {
		fontSize: '0.85em',
		padding: '.5em 1em',
		display: 'inline-block',
		margin: '1em 0em',
	},

	imageCropper: {
		height: '270px',
		width: '450px',
		border: '1px solid #ccc',
	},
};
