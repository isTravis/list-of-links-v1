export const LOGIN_DATA_LOAD = 'LOGIN_DATA_LOAD';
export const LOGIN_DATA_SUCCESS = 'LOGIN_DATA_SUCCESS';
export const LOGIN_DATA_FAIL = 'LOGIN_DATA_FAIL';

export const GET_RECENT_LOAD = 'GET_RECENT_LOAD';
export const GET_RECENT_SUCCESS = 'GET_RECENT_SUCCESS';
export const GET_RECENT_FAIL = 'GET_RECENT_FAIL';

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

export function getRecent() {
	return (dispatch) => {
		dispatch({ type: GET_RECENT_LOAD });

		return clientFetch('/api/recent')
		.then((result) => {
			dispatch({ type: GET_RECENT_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: GET_RECENT_FAIL, error });
		});
	};
}
