export const LOGIN_LOAD = 'LOGIN_LOAD';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOGOUT_LOAD = 'LOGOUT_LOAD';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export function login(username, password) {
	return (dispatch) => {
		dispatch({ type: LOGIN_LOAD });

		return clientFetch('/api/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password,
			})
		})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			dispatch({ type: LOGIN_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: LOGIN_FAIL, error });
		});
	}
}

export function logout() {
	return (dispatch) => {
		dispatch({ type: LOGOUT_LOAD });

		return clientFetch('/api/logout')
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			dispatch({ type: LOGOUT_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: LOGOUT_FAIL, error });
		});
	}
}
