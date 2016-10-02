export const SEARCH_LOAD = 'SEARCH_LOAD';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAIL = 'SEARCH_FAIL';

export function search(string) {
	return (dispatch) => {
		dispatch({ type: SEARCH_LOAD });

		if (!string) {
			return dispatch({type: SEARCH_SUCCESS, result: []});
		}
		
		return clientFetch('/api/search/' + string)
		.then((result) => {
			dispatch({ type: SEARCH_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: SEARCH_FAIL, error });
		});
	};
}
