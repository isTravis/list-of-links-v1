import {
	CREATE_FOLLOW_LOAD,
	CREATE_FOLLOW_SUCCESS,
	CREATE_FOLLOW_FAIL,

	DESTROY_FOLLOW_LOAD,
	DESTROY_FOLLOW_SUCCESS,
	DESTROY_FOLLOW_FAIL,
} from '../actions/follow';

const defaultState = {
	loading: false,
	error: undefined,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case CREATE_FOLLOW_LOAD: 	
		return {
			loading: true,
			error: undefined
		};

	case CREATE_FOLLOW_SUCCESS: 	
		return {
			loading: false,
			error: undefined
		};

	case CREATE_FOLLOW_FAIL: 	
		return {
			loading: false,
			error: action.error
		};

	case DESTROY_FOLLOW_LOAD: 	
		return {
			loading: true,
			error: undefined
		};

	case DESTROY_FOLLOW_SUCCESS: 	
		return {
			loading: false,
			error: undefined
		};

	case DESTROY_FOLLOW_FAIL: 	
		return {
			loading: false,
			error: action.error
		};

	default:
		return state;
	}
}
