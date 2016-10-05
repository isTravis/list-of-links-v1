export const CREATE_LINK_LOAD = 'CREATE_LINK_LOAD';
export const CREATE_LINK_SUCCESS = 'CREATE_LINK_SUCCESS';
export const CREATE_LINK_FAIL = 'CREATE_LINK_FAIL';

export const EDIT_LINK_LOAD = 'EDIT_LINK_LOAD';
export const EDIT_LINK_SUCCESS = 'EDIT_LINK_SUCCESS';
export const EDIT_LINK_FAIL = 'EDIT_LINK_FAIL';

export const DESTROY_LINK_LOAD = 'DESTROY_LINK_LOAD';
export const DESTROY_LINK_SUCCESS = 'DESTROY_LINK_SUCCESS';
export const DESTROY_LINK_FAIL = 'DESTROY_LINK_FAIL';

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
				description: description,
				url: link,
			})
		})
		.then((result) => {
			dispatch({ type: CREATE_LINK_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: CREATE_LINK_FAIL, error });
		});
	};
}

export function editLink(id, description, link) {
	return (dispatch) => {
		dispatch({ type: EDIT_LINK_LOAD });

		return clientFetch('/api/link/' + id, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				description: description,
				url: link,
			})
		})
		.then((result) => {
			dispatch({ type: EDIT_LINK_SUCCESS, result, id: id, description: description, url: link });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: EDIT_LINK_FAIL, error });
		});
	};
}

export function destroyLink(id) {
	return (dispatch) => {
		dispatch({ type: DESTROY_LINK_LOAD });

		return clientFetch('/api/link/' + id, {
			method: 'DELETE'
		})
		.then((result) => {
			dispatch({ type: DESTROY_LINK_SUCCESS, result, id: id });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: DESTROY_LINK_FAIL, error });
		});
	};
}
