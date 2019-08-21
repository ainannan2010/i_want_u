import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { Redirect } from 'react-router-dom';
import { logoutSubmit } from '../../redux/userReducer';
const { Item } = List;
const { Brief } = Item;
@connect(
  state => state,
  { logoutSubmit }
)
class User extends React.Component {
  logout = () => {
    Modal.alert('注销', '您确定退出吗？', [
      { text: '取消', onPress: () => { } },
      {
        text: '确认', onPress: () => {
          browserCookie.erase('userId');
          this.props.logoutSubmit()
        }
      }
    ])
  }
  render() {
    const { userReducer } = this.props;
    const { user, avatar, company, desc, type, title, money, redirectTo } = userReducer;
    return (
      user ?
        <div className="wapper">
          <Result
            img={<img src={require(`../../image/${avatar}.png`)} style={{ width: 40 }} alt="" />}
            title={user}
            message={type === 'boss' ? company : null}
          />
          <List renderHeader={() => '简介'}>
            <Item multipleLine>
              {title}
              {desc ? desc.split('\n').map((v, i) => <Brief key={i}>{v}</Brief>) : null}
              {money ? <Brief>薪资：{money}</Brief> : null}
            </Item>
          </List>
          <WhiteSpace />
          <List>
            <Item onClick={this.logout}>退出登陆</Item>
          </List>
        </div> : <Redirect to={redirectTo} />
    );
  }
}

export default User;
