import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signup } from '../actions/signup';
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

	render() {
		const isLoading = null; // this.props.appData && this.props.appData.get('loading');
		const errorMessage = null; // this.props.appData && this.props.appData.get('error');
		const redirectRoute = null; // this.props.query && this.props.query.redirect;
		const redirectQuery = null; // redirectRoute ? '?redirect=' + redirectRoute : '';

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
	// imageCropperWrapper: {
	// 	height: '100vh',
	// 	width: '100vw',
	// 	backgroundColor: 'rgba(255,255,255,0.75)',
	// 	position: 'fixed',
	// 	top: 0,
	// 	left: 0,
	// 	transition: '.1s linear opacity',
	// 	display: 'flex',
	// 	justifyContent: 'center',
	// },
	imageCropper: {
		height: '270px',
		width: '450px',
		// alignSelf: 'center',
		// backgroundColor: 'white',
		// boxShadow: '0px 0px 10px #808284',
		border: '1px solid #ccc',
		// '@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
		// 	width: '100%',
		// 	height: 'auto',
		// 	left: 0,
		// },
	},
};
