import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/Logo';
import { registerSubmit } from '../../redux/userReducer'
const { RadioItem } = Radio;

@connect(
  ({ userReducer }) => ({ userReducer }),
  { registerSubmit }
)
class Register extends React.Component {

  state = {
    user: '',
    pwd: '',
    repeatPwd: '',
    type: 'genius'
  }
  _gotoRegisterPage = () => {

  }
  _handelChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }
  _registerSubmit = () => {
    const { user, pwd, repeatPwd, type } = this.state;
    this.props.registerSubmit({ user, pwd, repeatPwd, type });
  }
  render() {
    const { type } = this.state;
    const { userReducer: { msg, redirectTo } } = this.props;
    return (
      <div className="registerWapper">
        <Logo />
        {redirectTo ? <Redirect to={redirectTo} /> : null}
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
            <InputItem
              onChange={val => this._handelChange('repeatPwd', val)}
              type='password'
            >
              确认密码
            </InputItem>
            <RadioItem
              checked={type === 'genius'}
              onChange={() => this._handelChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={type === 'boss'}
              onChange={() => this._handelChange('type', 'boss')}
            >
              BOSS
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this._registerSubmit}>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
