import {
	USER_UPDATE_LOAD,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,

	TOKEN_UPDATE_LOAD,
	TOKEN_UPDATE_SUCCESS,
	TOKEN_UPDATE_FAIL,

	PASSWORD_UPDATE_LOAD,
	PASSWORD_UPDATE_SUCCESS,
	PASSWORD_UPDATE_FAIL,
} from '../actions/settings';

const defaultState = {
	userUpdateLoading: false,
	userUpdateError: undefined,

	apiTokenLoading: false,
	apiTokenError: undefined,

	passwordUpdateLoading: false,
	passwordUpdateError: undefined,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case USER_UPDATE_LOAD:
		return {
			...state,
			userUpdateLoading: true,
			userUpdateError: undefined,
		};

	case USER_UPDATE_SUCCESS:
		return {
			...state,
			userUpdateLoading: false,
			userUpdateError: undefined
		};

	case USER_UPDATE_FAIL:
		return {
			...state,
			userUpdateLoading: false,
			userUpdateError: action.error,
		};

	case TOKEN_UPDATE_LOAD:
		return {
			...state,
			apiTokenLoading: true,
			apiTokenError: undefined,
		};

	case TOKEN_UPDATE_SUCCESS:
		return {
			...state,
			apiTokenLoading: false,
			apiTokenError: undefined
		};

	case TOKEN_UPDATE_FAIL:
		return {
			...state,
			apiTokenLoading: false,
			apiTokenError: action.error,
		};

	case PASSWORD_UPDATE_LOAD:
		return {
			...state,
			passwordUpdateLoading: true,
			passwordUpdateError: undefined,
		};

	case PASSWORD_UPDATE_SUCCESS:
		return {
			...state,
			passwordUpdateLoading: false,
			passwordUpdateError: undefined
		};

	case PASSWORD_UPDATE_FAIL:
		return {
			...state,
			passwordUpdateLoading: false,
			passwordUpdateError: action.error,
		};

	default:
		return state;
	}
}
