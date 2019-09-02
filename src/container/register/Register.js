import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/Logo';
import { registerSubmit } from '../../redux/userReducer'
import WzynHigher from '../../component/wzynHigher/WzynHigher'
const { RadioItem } = Radio;

@connect(
  ({ userReducer }) => ({ userReducer }),
  { registerSubmit }
)
@WzynHigher
class Register extends React.Component {
  componentDidMount() {
    this.props._handelChange('type', 'genius')
  }
  _registerSubmit = () => {
    const { user, pwd, repeatPwd, type } = this.props.state;
    this.props.registerSubmit({ user, pwd, repeatPwd, type });
  }
  render() {
    const { type } = this.props.state;
    const { userReducer: { msg, redirectTo } } = this.props;
    return (
      <div className="registerWapper">
        <NavBar
          mode='light'
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        ></NavBar>
        <Logo />
        {redirectTo ? <Redirect to={redirectTo} /> : null}
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
            <InputItem
              onChange={val => this.props._handelChange('repeatPwd', val)}
              type='password'
            >
              确认密码
            </InputItem>
            <RadioItem
              checked={type === 'genius'}
              onChange={() => this.props._handelChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={type === 'boss'}
              onChange={() => this.props._handelChange('type', 'boss')}
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
