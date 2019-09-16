
export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentState = {}
  let currentListeners = []
  // 获取数据
  function getState() {
    return currentState
  }
  // 发布订阅
  function subscribe(listener) {
    currentListeners.push(listener)
  }
  // 派发事件
  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach(v => v())
    return action
  }
  dispatch({ type: '@initstate/react-wzyn-redux' })
  return { getState, subscribe, dispatch }
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch;
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const middlewareChain = middlewares.map(middleware => middleware(midApi));
    dispatch = compose(...middlewareChain)(store.dispatch)
    // dispatch = middlewares(midApi)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}

export function compose(...funcs) {
  if (!funcs.length) {
    return arg => arg
  }
  if(funcs.lengh === 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}

export function bindActionCreators(creators, dispatch) {
  // let bound = {}
  // Object.keys(creators).forEach(
  //   v => {
  //     let creator = creators[v]
  //     bound[v] = bindActionCreator(creator, dispatch)
  //   }
  // )
  // return bound
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch);
    return ret
  }, {})
}
function bindActionCreator(creators, dispatch) {
  return (...args) => dispatch(creators(...args))
}
