import axios from 'axios';
import { getRedirectPath } from '../util';
const initState = {
  isAuth: false,
  user: '',
  pwd: '',
  repeatPwd: '',
  type: '',
  msg: '',
  redirectTo: ''
}
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOAD_DATA = 'LOAD_DATA'
// reducer
export default function loginReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, isAuth: true, redirectTo: getRedirectPath(action.payload) }
    case LOGIN_FAILURE:
      return { ...state, ...action.payload, isAuth: false }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

export function loginSubmit(props) {
  const { user, pwd } = props;
  if (!user || !pwd ) {
    return errorMsg({ msg: '用户名和密码必须输入' });
  }

  return dispatch => {
    axios.post('user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(login_success(res.data.data))
      } else {
        dispatch(errorMsg({ msg: res.data.msg}));
      }
    }, err => {
      console.log(err);
    }).catch(error => console.log(error))
  }
}

function login_success(data) {
  return { type: LOGIN_SUCCESS, payload: data }
}

function errorMsg(data) {
  return { type: LOGIN_FAILURE, payload: data }
}

export function loadData(data) {
  return { type: LOAD_DATA, payload: data }
}
