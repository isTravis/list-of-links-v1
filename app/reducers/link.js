import {
	CREATE_LINK_LOAD,
	CREATE_LINK_SUCCESS,
	CREATE_LINK_FAIL,
} from '../actions/link';

const defaultState = {
	loading: false,
	error: undefined,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case CREATE_LINK_LOAD: 	
		return {
			loading: true,
			error: undefined
		};

	case CREATE_LINK_SUCCESS: 	
		return {
			loading: false,
			error: undefined
		};

	case CREATE_LINK_FAIL: 	
		return {
			loading: false,
			error: action.error
		};

	default:
		return state;
	}
}
