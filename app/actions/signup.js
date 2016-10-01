export const SIGNUP_LOAD = 'SIGNUP_LOAD';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export function signup(username, name, email, password, image) {
	return (dispatch) => {
		dispatch({ type: SIGNUP_LOAD });

		return clientFetch('/api/user', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				name: name,
				email: email,
				password: password,
				image: image
			})
		})
		.then((result) => {
			dispatch({ type: SIGNUP_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: SIGNUP_FAIL, error });
		});
	};
}
