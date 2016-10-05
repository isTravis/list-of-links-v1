export const CREATE_FOLLOW_LOAD = 'CREATE_FOLLOW_LOAD';
export const CREATE_FOLLOW_SUCCESS = 'CREATE_FOLLOW_SUCCESS';
export const CREATE_FOLLOW_FAIL = 'CREATE_FOLLOW_FAIL';

export const UPDATE_LASTREAD_LOAD = 'UPDATE_LASTREAD_LOAD';
export const UPDATE_LASTREAD_SUCCESS = 'UPDATE_LASTREAD_SUCCESS';
export const UPDATE_LASTREAD_FAIL = 'UPDATE_LASTREAD_FAIL';

export const DESTROY_FOLLOW_LOAD = 'DESTROY_FOLLOW_LOAD';
export const DESTROY_FOLLOW_SUCCESS = 'DESTROY_FOLLOW_SUCCESS';
export const DESTROY_FOLLOW_FAIL = 'DESTROY_FOLLOW_FAIL';

export function createFollow(follower, followee, lastRead) {
	return (dispatch) => {
		dispatch({ type: CREATE_FOLLOW_LOAD });

		return clientFetch('/api/follow', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				follower: follower,
				followee: followee,
				lastRead: lastRead,
			})
		})
		.then((result) => {
			dispatch({ type: CREATE_FOLLOW_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: CREATE_FOLLOW_FAIL, error });
		});
	};
}

export function updateLastRead(follower, followee) {
	const lastRead = Date.now();

	return (dispatch) => {
		dispatch({ type: UPDATE_LASTREAD_LOAD, follower: follower, followee: followee, lastRead: lastRead });

		return clientFetch('/api/follow', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				follower: follower,
				followee: followee,
				lastRead: lastRead,
			})
		})
		.then((result) => {
			dispatch({ type: UPDATE_LASTREAD_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: UPDATE_LASTREAD_FAIL, error });
		});
	};
}

export function destroyFollow(follower, followee) {
	return (dispatch) => {
		dispatch({ type: DESTROY_FOLLOW_LOAD });

		return clientFetch('/api/follow', {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				follower: follower,
				followee: followee,
			})
		})
		.then((result) => {
			dispatch({ type: DESTROY_FOLLOW_SUCCESS, result, follower, followee });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: DESTROY_FOLLOW_FAIL, error });
		});
	};
}
