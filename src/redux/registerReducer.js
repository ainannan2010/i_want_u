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
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE'

// reducer
export default function registerReducer(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, ...action.payload, isAuth: true, redirectTo: getRedirectPath(action.payload) }
    case REGISTER_FAILURE:
      return { ...state, ...action.payload, isAuth: false }
    default:
      return state;
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
        dispatch(register_success({ user, pwd, type, msg: '' }))
      } else {
        dispatch(errorMsg({ msg: res.data.msg}));
      }
    }, err => {
      console.log(err);
    }).catch(error => console.log(error))
  }
}


function register_success(data) {
  return { type: REGISTER_SUCCESS, payload: data }
}
function errorMsg(data) {
  return { type: REGISTER_FAILURE, payload: data }
}
