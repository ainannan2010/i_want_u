import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from './react-wzyn-redux';
// react-redux
// connect 负责链接组件， 给到redux里的数据，放到组件的属性里
// 1. 接受一个组件，把state里的一些数据放进去，返回一个新的组件
// 2.数据变化时，能够通知组件
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    // constructor(props, context) {
    //   super(props, context)
    //   this.state = {
    //     props: {}
    //   }
    // }
    state = {
      props: {}
    }
    componentDidMount() {
      const { store } = this.context;
      this.update();
      store.subscribe(() => this.update())
    }

    update() {
      const { store } = this.context;
      const stateProps = mapStateToProps(store.getState());
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps,
        }
      })
    }

    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
    
  }
}
// Provider, 把store放到context里，所有的子元素可以直接取到store
export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  getChildContext() {
    return { store: this.store }
  }

  render() {
    return this.props.children
  }
}