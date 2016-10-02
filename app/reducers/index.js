import { combineReducers } from 'redux';
import app from './app';
import follow from './follow';
import link from './link';
import login from './login';
import search from './search';
import signup from './signup';
import user from './user';

export default combineReducers({
	app,
	follow,
	link,
	login,
	search,
	signup,
	user,
});
