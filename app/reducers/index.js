import { combineReducers } from 'redux';
import app from './app';
import login from './login';
import signup from './signup';

export default combineReducers({
	app,
	login,
	signup,
});
