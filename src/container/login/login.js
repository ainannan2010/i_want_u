import React from 'react';
import { connect } from 'react-redux';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/Logo';
import { loginSubmit } from '../../redux/userReducer';
import WzynHigher from '../../component/wzynHigher/WzynHigher';

@connect(
  ({ userReducer }) => ({ userReducer }),
  { loginSubmit }
)
@WzynHigher
class Login extends React.Component {

  _gotoRegisterPage = () => {
    this.props.history.push('/register')
  }

  _loginSubmit = () => {
    const { user, pwd } = this.props.state;
    this.props.loginSubmit({ user, pwd });
  }

  render() {

    const { userReducer: { msg, redirectTo } } = this.props;
    return (
      <div className="loginWapper">
        {(redirectTo && redirectTo !== '/login') ? <Redirect to={redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <div style={{ color: 'red', marginBottom: 10 }}>{msg ? msg : null}</div>
          <List>
            <InputItem
              onChange={val => this.props._handelChange('user', val)}
            >
              用户名
            </InputItem>
            <InputItem
              onChange={val => this.props._handelChange('pwd', val)}
              type='password'
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this._loginSubmit}>登陆</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this._gotoRegisterPage}>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
