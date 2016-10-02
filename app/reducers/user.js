import {
	GET_USER_LOAD,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
} from '../actions/user';

import {
	UPDATE_LASTREAD_LOAD,
	UPDATE_LASTREAD_SUCCESS,
	UPDATE_LASTREAD_FAIL,
} from '../actions/follow';

const defaultState = {
	loading: false,
	error: undefined,
	userData: {},
	setLastRead: false,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case GET_USER_LOAD:
		return {
			...state,
			loading: true,
			error: false,
			setLastRead: false,
			userData: {},
		};

	case GET_USER_SUCCESS:
		return {
			...state,
			loading: false,
			error: false,
			userData: action.result
		};

	case GET_USER_FAIL:
		return {
			...state,
			loading: false,
			error: action.error,
			userData: null,
		};
	case UPDATE_LASTREAD_LOAD:
	case UPDATE_LASTREAD_SUCCESS:
		return {
			...state,
			setLastRead: true
		};
	case UPDATE_LASTREAD_FAIL:
		return {
			...state,
			setLastRead: false
		};

	default:
		return state;
	}
}
