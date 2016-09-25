import {
	GET_USER_LOAD,
	GET_USER_SUCCESS,
	GET_USER_FAIL,

	CREATE_LINK_LOAD,
	CREATE_LINK_SUCCESS,
	CREATE_LINK_FAIL,
} from '../actions/user';

const defaultState = {
	loading: false,
	error: undefined,
	userData: {},
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case GET_USER_LOAD:
		return {
			...state,
			loading: true,
			error: false,
		};

	case GET_USER_SUCCESS:
		return {
			loading: false,
			error: false,
			userData: action.result
		};

	case GET_USER_FAIL:
		return {
			loading: false,
			error: action.error,
			userData: {},
		};

	case CREATE_LINK_SUCCESS: 
		const userData = state.userData || {};
		const links = userData.links || [];
		links.push(action.result);
		return {
			...state,
			userData: {
				...userData,
				links: links,
			}
		}

	default:
		return state;
	}
}
