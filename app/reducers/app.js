import {
	LOGIN_DATA_LOAD,
	LOGIN_DATA_SUCCESS,
	LOGIN_DATA_FAIL,

	// GET_RECENT_LOAD,
	GET_RECENT_SUCCESS,
	// GET_RECENT_FAIL,
} from '../actions/app';

import {
	SIGNUP_SUCCESS
} from '../actions/signup';

import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
} from '../actions/login';

import {
	CREATE_LINK_SUCCESS,
	EDIT_LINK_SUCCESS,
	DESTROY_LINK_SUCCESS,
} from '../actions/link';

import {
	CREATE_FOLLOW_SUCCESS,
	UPDATE_LASTREAD_LOAD,
	DESTROY_FOLLOW_SUCCESS
} from '../actions/follow';

import {
	USER_UPDATE_SUCCESS,
	TOKEN_UPDATE_SUCCESS,
} from '../actions/settings';

const defaultState = {
	loading: false,
	error: undefined,
	loginData: {},
	recentUsers: [],
};

export default function reducer(state = defaultState, action) {
	const loginData = state.loginData || {};
	const links = loginData.links || [];

	switch (action.type) {
		
	case LOGIN_DATA_LOAD:
		return {
			...state,
			loading: true,
		};

	case LOGIN_DATA_SUCCESS:
		return {
			...state,
			loading: false,
			error: false, 
			loginData: action.result || {}
		};

	case LOGIN_DATA_FAIL:
	case LOGIN_FAIL:
		return {
			...state,
			loading: false,
			error: action.error,
			loginData: {},
		};

	case SIGNUP_SUCCESS:
	case LOGIN_SUCCESS:
		return {
			...state,
			loginData: action.result || {},
		};
	
	case LOGOUT_SUCCESS:
		return {
			...state,
			loginData: {}
		};

	case CREATE_LINK_SUCCESS: 
		links.push(action.result);
		return {
			...state,
			loginData: {
				...loginData,
				links: links,
			}
		};
	case EDIT_LINK_SUCCESS: 
		const newLinks = links.map((link)=> {
			if (link.id === action.id) {
				return {
					...link,
					description: action.description,
					url: action.url
				};
			}
			return link;
		});
		return {
			...state,
			loginData: {
				...loginData,
				links: newLinks,
			}
		};

	case DESTROY_LINK_SUCCESS: 
		const filteredLinks = links.filter((link)=> {
			return link.id !== action.id;
		});
		return {
			...state,
			loginData: {
				...loginData,
				links: filteredLinks,
			}
		};

	case CREATE_FOLLOW_SUCCESS: 
		const newFollowing = state.loginData.following || [];
		newFollowing.push(action.result);
		return {
			...state,
			loginData: {
				...state.loginData,
				following: newFollowing
			}
		};

	case UPDATE_LASTREAD_LOAD: 
		return {
			...state,
			loginData: {
				...state.loginData,
				following: state.loginData.following.map((follow) => {
					if (follow.id === action.followee) {
						return {
							...follow,
							Follow: {
								...follow.Follow,
								lastRead: new Date(action.lastRead).toISOString()
							}
						};
					}
					return follow;
				})
			}
		};

	case DESTROY_FOLLOW_SUCCESS: 
		return {
			...state,
			loginData: {
				...state.loginData,
				following: state.loginData.following.filter((follow) => {
					return follow.id !== action.followee;
				})
			}
		};

	case GET_RECENT_SUCCESS:
		return {
			...state,
			recentUsers: action.result
		};

	case USER_UPDATE_SUCCESS:
		return {
			...state,
			loginData: {
				...loginData,
				username: action.username,
				name: action.name,
				email: action.email,
				image: action.image,
			}
		};
	case TOKEN_UPDATE_SUCCESS:
		return {
			...state,
			loginData: {
				...loginData,
				apiToken: action.result.apiToken,
			}
		};

	default:
		return state;
	}
}
