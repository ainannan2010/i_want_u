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
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const REGISTER_FAILURE = 'REGISTER_FAILURE'
const LOAD_DATA = 'LOAD_DATA';
const UPDATE_DATA = 'UPDATE_DATA';
// reducer
export default function userReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, ...action.payload, redirectTo: getRedirectPath(action.payload) }
    case LOGIN_FAILURE:
      return { ...state, ...action.payload, isAuth: false }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    case REGISTER_FAILURE:
      return { ...state, ...action.payload, isAuth: false }
    case UPDATE_DATA:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

export function loginSubmit(props) {
  const { user, pwd } = props;
  if (!user || !pwd) {
    return errorMsg({ msg: '用户名和密码必须输入' });
  }

  return dispatch => {
    axios.post('user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg({ msg: res.data.msg }));
      }
    }, err => {
      console.log(err);
    }).catch(error => console.log(error))
  }
}

export function registerSubmit(props) {
  const { user, pwd, repeatPwd, type } = props;
  if (!user || !pwd || !type) {
    return errorMsg({ msg: '用户名和密码必须输入' });
  }
  if (pwd !== repeatPwd) {
    return errorMsg({ msg: '密码和确认密码不同' });
  }
  return dispatch => {
    axios.post('user/register', { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, type, msg: '' }))
      } else {
        dispatch(errorMsg({ msg: res.data.msg }));
      }
    }, err => {
      console.log(err);
    }).catch(error => console.log(error))
  }
}


export function update(data) {
  return dispatch => {
    axios.post('user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg({ msg: res.data.msg }));
        }
      }, err => {
        console.log(err);
      }).catch(error => console.log(error))
  }
}

function authSuccess(res) {
  const { pwd, ...data } = res;
  return { type: AUTH_SUCCESS, payload: data }
}

function errorMsg(data) {
  return { type: LOGIN_FAILURE, payload: data }
}

export function loadData(data) {
  return { type: LOAD_DATA, payload: data }
}

