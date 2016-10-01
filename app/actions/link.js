export const CREATE_LINK_LOAD = 'CREATE_LINK_LOAD';
export const CREATE_LINK_SUCCESS = 'CREATE_LINK_SUCCESS';
export const CREATE_LINK_FAIL = 'CREATE_LINK_FAIL';

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
