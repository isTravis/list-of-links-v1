export const USER_UPDATE_LOAD = 'USER_UPDATE_LOAD';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL';

export const TOKEN_UPDATE_LOAD = 'TOKEN_UPDATE_LOAD';
export const TOKEN_UPDATE_SUCCESS = 'TOKEN_UPDATE_SUCCESS';
export const TOKEN_UPDATE_FAIL = 'TOKEN_UPDATE_FAIL';

export const PASSWORD_UPDATE_LOAD = 'PASSWORD_UPDATE_LOAD';
export const PASSWORD_UPDATE_SUCCESS = 'PASSWORD_UPDATE_SUCCESS';
export const PASSWORD_UPDATE_FAIL = 'PASSWORD_UPDATE_FAIL';

export function updateUser(username, name, email, image) {
	return (dispatch) => {
		dispatch({ type: USER_UPDATE_LOAD });

		return clientFetch('/api/user', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				name: name,
				email: email,
				image: image
			})
		})
		.then((result) => {
			dispatch({ type: USER_UPDATE_SUCCESS, result, username: username, name: name, email: email, image: image });
		})
		.catch((error) => {
			dispatch({ type: USER_UPDATE_FAIL, error });
		});
	};
}

export function updateToken() {
	return (dispatch) => {
		dispatch({ type: TOKEN_UPDATE_LOAD });

		return clientFetch('/api/token', {
			method: 'PUT'
		})
		.then((result) => {
			dispatch({ type: TOKEN_UPDATE_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: TOKEN_UPDATE_FAIL, error });
		});
	};
}

export function updatePassword(oldPassword, newPassword) {
	return (dispatch) => {
		dispatch({ type: PASSWORD_UPDATE_LOAD });

		return clientFetch('/api/password', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				oldPassword: oldPassword,
				newPassword: newPassword,
			})
		})
		.then((result) => {
			dispatch({ type: PASSWORD_UPDATE_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: PASSWORD_UPDATE_FAIL, error });
		});
	};
}
