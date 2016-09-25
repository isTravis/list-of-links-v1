import {
	LOGIN_DATA_LOAD,
	LOGIN_DATA_SUCCESS,
	LOGIN_DATA_FAIL,
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
	CREATE_LINK_SUCCESS
} from '../actions/link';

import {
	CREATE_FOLLOW_SUCCESS,
	UPDATE_LASTREAD_LOAD,
	DESTROY_FOLLOW_SUCCESS
} from '../actions/follow';

const defaultState = {
	loading: false,
	error: undefined,
	loginData: {},
};

// const fakeLoginDataResult = {
// 	loginData: {
// 		username: 'fakey',
// 		name: 'Fakey Tumilton',
// 		links: ['link1', 'link2', 'link3'],
// 		image: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p160x160/10276981_628004617267919_5968026421592426472_n.jpg?oh=c29641ac97c594ca313e4c6e09eea437&oe=583E111E',
// 	},
// 	following: [
// 		{
// 			username: 'smultz',
// 			name: 'Johnny Smultz',
// 			links: ['link1', 'link2', 'link3'],
// 			image: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p160x160/10616514_10154614323650567_4667292038453201949_n.jpg?oh=d21d44b9c720c12a167af432a47614b5&oe=584335D1',
// 		},
// 		{
// 			username: 'mcfulter',
// 			name: 'Dana McFurter',
// 			links: ['link1', 'link2', 'link3'],
// 			image: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c27.0.160.160/p160x160/12190797_10206396092915505_4757657023356165951_n.jpg?oh=835eae90d4de0796b4f9f6dcef2f189e&oe=58855E96',
// 		},
// 	],
// };

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		
	case LOGIN_DATA_LOAD:
		return {
			...state,
			loading: true,
		};

	case LOGIN_DATA_SUCCESS:
		return {
			loading: false,
			error: false, 
			loginData: action.result || {}
			// user: action.result,
			// ...action.result,
		};

	case LOGIN_DATA_FAIL:
	case LOGIN_FAIL:
		return {
			...state,
			loading: false,
			error: action.error,
			loginData: {},
			// following: []
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
		const loginData = state.loginData || {};
		const links = loginData.links || [];
		links.push(action.result);
		return {
			...state,
			loginData: {
				...loginData,
				links: links,
			}
		};

	case CREATE_FOLLOW_SUCCESS: 
		const newFollowing = state.loginData.following || [];
		newFollowing.push(action.result);
		// console.log(action.result);
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

	default:
		return state;
	}
}
