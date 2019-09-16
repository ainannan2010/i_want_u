const thunk = ({ dispatch, getState }) => next => action => {
  // 如果是函数就执行一下，参数是dispatch 和 getState
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  // 默认什么都没干
  return next(action)
}

export default thunk

