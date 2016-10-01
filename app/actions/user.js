export const GET_USER_LOAD = 'GET_USER_LOAD';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';

export const CREATE_LINK_LOAD = 'CREATE_LINK_LOAD';
export const CREATE_LINK_SUCCESS = 'CREATE_LINK_SUCCESS';
export const CREATE_LINK_FAIL = 'CREATE_LINK_FAIL';

export function getUser(username) {
	return (dispatch) => {
		dispatch({ type: GET_USER_LOAD });

		return clientFetch('/api/user/' + username)
		.then((result) => {
			dispatch({ type: GET_USER_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: GET_USER_FAIL, error });
		});
	};
}

export function createLink(description, link) {
	return (dispatch) => {
		dispatch({ type: CREATE_LINK_LOAD });

		return clientFetch('/api/link', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: description,
				url: link,
			})
		})
		.then((result) => {
			dispatch({ type: CREATE_LINK_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: CREATE_LINK_FAIL, error });
		});
	};
}
