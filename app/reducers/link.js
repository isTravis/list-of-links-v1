import {
	CREATE_LINK_LOAD,
	CREATE_LINK_SUCCESS,
	CREATE_LINK_FAIL,
} from '../actions/link';

const defaultState = {
	loading: false,
	error: undefined,
	addedLink: undefined,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case CREATE_LINK_LOAD: 	
		return {
			loading: true,
			error: undefined,
			addedLink: undefined,
		};

	case CREATE_LINK_SUCCESS: 	
		return {
			loading: false,
			error: undefined,
			addedLink: action.result,
		};

	case CREATE_LINK_FAIL: 	
		return {
			loading: false,
			error: action.error,
			addedLink: undefined,
		};

	default:
		return state;
	}
}
