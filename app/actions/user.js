export const GET_USER_LOAD = 'GET_USER_LOAD';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';

export function getUser(username) {
	return (dispatch) => {
		dispatch({ type: GET_USER_LOAD });

		return clientFetch('/api/user/' + username)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			dispatch({ type: GET_USER_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: GET_USER_FAIL, error });
		});
	};
}
