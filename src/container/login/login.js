import React from 'react';
import { connect } from 'react-redux';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/Logo';
import { loginSubmit } from '../../redux/loginReducer';

@connect(
  ({ loginReducer }) => ({ loginReducer }),
  { loginSubmit }
)
class Login extends React.Component {
  state = {
    user: '',
    pwd: ''
  }
  _gotoRegisterPage = () => {
    this.props.history.push('/register')
  }

  _loginSubmit = () => {
    const { user, pwd } = this.state;
    this.props.loginSubmit({ user, pwd });
  }

  _handelChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  render() {
    const { loginReducer: { msg, redirectTo } } = this.props;
    return (
      <div className="loginWapper">
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <div style={{ color: 'red', marginBottom: 10 }}>{msg ? msg : null}</div>
          <List>
          <InputItem
              onChange={val => this._handelChange('user', val)}
            >
              用户名
            </InputItem>
            <InputItem
              onChange={val => this._handelChange('pwd', val)}
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
