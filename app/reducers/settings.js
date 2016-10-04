import {
	USER_UPDATE_LOAD,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
} from '../actions/signup';

const defaultState = {
	userUpdateLoading: false,
	userUpdateError: undefined,

	apiTokenLoading: false,
	apiTokenError: undefined,

	passwordResetLoading: false,
	passwordResetError: undefined,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case USER_UPDATE_LOAD:
		return {
			userUpdateLoading: true,
			userUpdateError: undefined,
		};

	case USER_UPDATE_SUCCESS:
		return {
			userUpdateLoading: false,
			userUpdateError: undefined
		};

	case USER_UPDATE_FAIL:
		return {
			userUpdateLoading: false,
			userUpdateError: action.error,
		};

	default:
		return state;
	}
}
