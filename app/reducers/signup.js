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
			error: undefined,
		};

	case SIGNUP_SUCCESS:
		return {
			loading: false,
			error: undefined
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
