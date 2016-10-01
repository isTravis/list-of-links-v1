import {
	LOGIN_LOAD,
	LOGIN_SUCCESS,
	LOGIN_FAIL,

	LOGOUT_LOAD,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
} from '../actions/login';

const defaultState = {
	loginLoading: false,
	logoutLoading: false,
	error: undefined,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case LOGIN_LOAD:
		return {
			loginLoading: true,
			error: false,
		};

	case LOGIN_SUCCESS:
		return {
			loginLoading: false,
			error: false
		};

	case LOGIN_FAIL:
		return {
			loginLoading: false,
			error: action.error,
		};

	case LOGOUT_LOAD:
		return {
			logoutLoading: true,
			error: false,
		};

	case LOGOUT_SUCCESS:
		return {
			logoutLoading: false,
			error: false
		};

	case LOGOUT_FAIL:
		return {
			logoutLoading: false,
			error: action.error,
		};

	default:
		return state;
	}
}
