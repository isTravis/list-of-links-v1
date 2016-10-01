export const LOGIN_DATA_LOAD = 'LOGIN_DATA_LOAD';
export const LOGIN_DATA_SUCCESS = 'LOGIN_DATA_SUCCESS';
export const LOGIN_DATA_FAIL = 'LOGIN_DATA_FAIL';

export function login() {
	return (dispatch) => {
		dispatch({ type: LOGIN_DATA_LOAD });

		return clientFetch('/api/login')
		.then((result) => {
			dispatch({ type: LOGIN_DATA_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: LOGIN_DATA_FAIL, error });
		});
	};
}
