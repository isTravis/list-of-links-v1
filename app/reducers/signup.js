import {
	SIGNUP_LOAD,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
} from '../actions/signup';

const defaultState = {
	loading: false,
	error: undefined,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case SIGNUP_LOAD:
		return {
			loading: true,
			error: false,
		};

	case SIGNUP_SUCCESS:
		return {
			loading: false,
			error: false
		};

	case SIGNUP_FAIL:
		return {
			loading: false,
			error: action.error,
		};

	default:
		return state;
	}
}
