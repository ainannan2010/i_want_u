import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标示已读
const MSG_READ = 'MSG_READ';

const initState = {
  chatmsg: [],
  unread: 0,
  users: {}
}

export default function chatReducer(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, users: action.payload.users, chatmsg: action.payload.msg, unread: action.payload.msg.filter(v => !v.read && v.to === action.payload.userid).length }
    case MSG_RECV:
      const n = action.payload.data.to === action.payload.userid ? 1 : 0;
      return { ...state, chatmsg: [...state.chatmsg, action.payload.data], unread: state.unread + n }
    case MSG_READ:
      return { ...state, ...action.payload }
    default:
      return { ...state }
  }
}

// 获取聊天列表
export function getMsglist() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          const userid = getState().userReducer._id;
          dispatch(getList(res.data.msg, res.data.users, userid))
        }
      }, err => console.log(err))
  }
}

function getList(msg, users, userid) {
  return { type: MSG_LIST, payload: { msg, users, userid } }
}

// 发送聊天内容
export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg });
  }
}

// 接收聊天内容
export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function (data) {
      const userid = getState().userReducer._id
      dispatch(msgRecv(data, userid));
    });
  }
}

function msgRecv(data, userid) {
  return { type: MSG_RECV, payload: { data, userid } }
}