import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button } from 'antd-mobile';
import Login from './container/login/Login';
import Register from './container/register/Register';
import AuthRoute from './component/authRoute/AuthRoute';
import Dashboard from './component/dashboard/Dashboard';
import BossInfo from './container/bossInfo/BossInfo';
import geniusInfo from './container/geniusInfo/GeniusInfo';
import Chat from './component/chat/Chat';

export default class App extends React.Component {
  state = {
    hasError: false
  }
  componentDidCatch(err, info) {
    console.log(err)
    this.setState({
      hasError: true
    })
  }
  render() {
    const { hasError } = this.state;
    return (
      hasError ? <Error />
        :
        <div>
          <AuthRoute />
          <Switch>
            <Route path='/login' component={Login} exact />
            <Route path='/register' component={Register} exact />
            <Route path='/bossinfo' component={BossInfo} exact />
            <Route path='/geniusinfo' component={geniusInfo} exact />
            <Route path='/chat/:user' component={Chat} exact />
            <Route component={Dashboard} />
          </Switch>
        </div>
    )
  }
}

class Error extends React.Component {
  render() {
    return (
      <div className="error_page">
        <img src={require('./image/error.png')} alt="页面写下奔溃日志，溜了溜了！" />
        <Button onClick={() => this.props.location.history.push('www.baidu.com')}>回到首页</Button>
      </div>
    )
  }
}