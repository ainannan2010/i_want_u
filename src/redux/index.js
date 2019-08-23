import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatUserReducer from './chatUserReducer';
import chatReducer from './chatReducer';

export default combineReducers({ userReducer, chatUserReducer, chatReducer });