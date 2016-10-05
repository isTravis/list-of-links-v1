import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import SHA3 from 'crypto-js/sha3';
import encHex from 'crypto-js/enc-hex';
import { updateUser, updateToken, updatePassword } from '../actions/settings';
import NoMatch from '../containers/NoMatch';
import ImageCropper from '../components/ImageCropper';
import ButtonLoader from '../components/ButtonLoader';

let styles;

export const SignUp = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		settingsData: PropTypes.object,
		loginData: PropTypes.object,
		query: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			username: '',
			name: '',
			email: '',
			userImageFile: null,
			userImageURL: undefined,
			userImagePreview: undefined,
			userUpdateError: undefined,

			oldPassword: '',
			newPassword: '',
			passwordUpdateError: undefined,
		};
	},

	componentWillMount() {
		const initUserData = this.props.appData.loginData || {};
		this.setState({
			username: initUserData.username,
			name: initUserData.name,
			email: initUserData.email,
			userImagePreview: initUserData.image,
			userImageURL: initUserData.image,
			apiToken: initUserData.apiToken,
		});
	},

	componentWillReceiveProps(nextProps) {
		if (this.props.settingsData.passwordUpdateLoading && !nextProps.settingsData.passwordUpdateLoading && !nextProps.settingsData.passwordUpdateError) {
			this.setState({ oldPassword: '', newPassword: '' });
		}
	},
	
	usernameChange: function(evt) {
		this.setState({ username: evt.target.value.toLowerCase().trim() });
	},
	
	nameChange: function(evt) {
		this.setState({ name: evt.target.value });
	},

	emailChange: function(evt) {
		this.setState({ email: evt.target.value });
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
		this.setState({ 
			userImageFile: null, 
			userImageURL: url,
			userImagePreview: preview 
		});
		document.getElementById('userImage').value = null;	
		
	},

	handleUserUpdate: function(evt) {
		evt.preventDefault();
		if (!this.state.username) { return this.setState({ userUpdateError: 'Username is required' }); }
		if (!this.state.name) { return this.setState({ userUpdateError: 'Name is required' }); }
		if (!this.state.email) { return this.setState({ userUpdateError: 'Email is required' }); }
		if (!this.state.userImageURL) { return this.setState({ userUpdateError: 'Profile image is required' }); }

		this.props.dispatch(updateUser(this.state.username, this.state.name, this.state.email, this.state.userImageURL));
		return this.setState({ userUpdateError: undefined });
	},

	handleResetAPIToken: function(evt) {
		evt.preventDefault();
		this.props.dispatch(updateToken());
	},

	oldPasswordChange: function(evt) {
		this.setState({ oldPassword: evt.target.value });
	},

	newPasswordChange: function(evt) {
		this.setState({ newPassword: evt.target.value });
	},

	handlePasswordUpdate: function(evt) {
		evt.preventDefault();
		if (!this.state.oldPassword) { return this.setState({ passwordUpdateError: 'Old password is required' }); }
		if (!this.state.newPassword) { return this.setState({ passwordUpdateError: 'New password is required' }); }

		const oldPassword = SHA3(this.state.oldPassword).toString(encHex);
		const newPassword = SHA3(this.state.newPassword).toString(encHex);
		this.props.dispatch(updatePassword(oldPassword, newPassword));
		return this.setState({ passwordUpdateError: undefined });
	},


	render() {
		// const isLoading = this.props.signupData.loading; // this.props.appData && this.props.appData.get('loading');
		// const errorMessage = this.props.settingsData.error || this.state.error;

		const loginData = this.props.appData.loginData || {};
		if (!loginData.id) {
			return <NoMatch />;
		}

		return (
			<div>
				<Helmet title={'Settings · List of Links'} />
				

				<h1>Settings</h1>

				<form onSubmit={this.handleSubmit}>

					<div>
						<label style={styles.label} htmlFor={'username'}>Username</label>
						<input id={'username'} name={'username'} type="text" style={styles.input} value={this.state.username} onChange={this.usernameChange} />
					</div>

					<div>
						<label style={styles.label} htmlFor={'name'}>Name</label>
						<input id={'name'} name={'name'} type="text" style={styles.input} value={this.state.name} onChange={this.nameChange} />
					</div>

					<div>
						<label style={styles.label} htmlFor={'email'}>Email</label>
						<input id={'email'} name={'email'} type="email" style={styles.input} value={this.state.email} onChange={this.emailChange} />
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
					

					<button name={'sign up'} className={'button'} style={styles.submitButton} onClick={this.handleUserUpdate}>
						Update
						<ButtonLoader isLoading={this.props.settingsData.userUpdateLoading} />
					</button>

					<div style={styles.errorMessage}>{this.state.userUpdateError || this.props.settingsData.userUpdateError}</div>

				</form>


				<h1>Change Password</h1>
				<form>
					<div>
						<label htmlFor={'password'} style={styles.inputLabelWide}>Current Password</label>
						<input id={'password'} name={'password'} type="password" value={this.state.oldPassword} onChange={this.oldPasswordChange} />
					</div>	

					<div>
						<label htmlFor={'password'} style={styles.inputLabelWide}>New Password</label>
						<input id={'password'} name={'password'} type="password" value={this.state.newPassword} onChange={this.newPasswordChange} />
					</div>	

					<button name={'apiToken'} className={'button'} style={styles.submitButton} onClick={this.handlePasswordUpdate}>
						Set new Password
						<ButtonLoader isLoading={this.props.settingsData.passwordUpdateLoading} />
					</button>

					<div style={styles.errorMessage}>{this.state.passwordUpdateError || this.props.settingsData.passwordUpdateError}</div>
				</form>

				<h1>API Token</h1>

				<input type="text" style={styles.disabledInput} disabled onChange={()=>{}} value={this.props.appData.loginData.apiToken} />
				<button name={'apiToken'} className={'button'} style={styles.submitButton} onClick={this.handleResetAPIToken}>
					Request new API token
					<ButtonLoader isLoading={this.props.settingsData.apiTokenLoading} />
				</button>

				<div style={styles.errorMessage}>{this.props.settingsData.apiTokenError}</div>
				
			</div>

		);
	}
});

function mapStateToProps(state) {
	return {
		appData: state.app,
		settingsData: state.settings,
		loginData: state.login,
	};
}

export default connect(mapStateToProps)(SignUp);

styles = {
	inputLabelWide: {
		width: '150px',
	},
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
	errorMessage: {
		display: 'inline-block',
		padding: '0em 2em',
		position: 'relative',
		top: '2px',
		color: '#E05151',
	},
	disabledInput: {
		display: 'block',
		padding: '.25em 1em',
		backgroundColor: 'transparent',
		fontSize: '1em',
	},
};
