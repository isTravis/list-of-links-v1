import {
	LOGIN_LOAD,
	LOGIN_SUCCESS,
	LOGIN_FAIL,

} from '../actions/login';

const defaultState = {
	loading: false,
	error: undefined,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case LOGIN_LOAD:
		return {
			loading: true,
			error: false,
		};

	case LOGIN_SUCCESS:
		return {
			loading: false,
			error: false
		};

	case LOGIN_FAIL:
		return {
			loading: false,
			error: action.error,
		};

	default:
		return state;
	}
}
