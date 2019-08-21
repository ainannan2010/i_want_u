import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatUserReducer from './chatUserReducer';

export default combineReducers({ userReducer, chatUserReducer });