export const UPDATE_USER_LOAD = 'UPDATE_USER_LOAD';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export function updateUser(username, name, email, image) {
	return (dispatch) => {
		dispatch({ type: UPDATE_USER_LOAD });

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
			dispatch({ type: UPDATE_USER_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: UPDATE_USER_FAIL, error });
		});
	};
}
