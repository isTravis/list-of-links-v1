import { combineReducers } from 'redux';
import app from './app';
import login from './login';
import signup from './signup';
import user from './user';

export default combineReducers({
	app,
	login,
	signup,
	user,
});
