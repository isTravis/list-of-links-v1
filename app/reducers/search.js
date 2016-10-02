import {
	SEARCH_LOAD,
	SEARCH_SUCCESS,
	SEARCH_FAIL,
} from '../actions/search';

const defaultState = {
	loading: false,
	error: undefined,
	searchResults: [],
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case SEARCH_LOAD:
		return {
			loading: true,
			error: undefined,
			searchResults: state.searchResults
		};

	case SEARCH_SUCCESS:
		return {
			loading: false,
			error: undefined,
			searchResults: action.result,
		};

	case SEARCH_FAIL:
		return {
			loading: false,
			error: action.error,
			searchResults: state.searchResults
		};

	default:
		return state;
	}
}
