const arrayThunk = ({ dispatch, getState }) => next => action => {
  // 如果是函数就执行一下，参数是dispatch 和 getState
  if (Array.isArray(action)) {
    return action.map(v => dispatch(v))
  }
  // 默认什么都没干
  return next(action)
}
export default arrayThunk

