import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Switch, Route } from 'react-router-dom';
import NavlinkBar from '../../component/navlink/NavlinkBar';
import Boss from '../../component/boss/Boss';
import Genius from '../../component/genius/Genius';
import User from '../../component/user/User';
import Msg from '../../component/msg/Msg';

@connect(
  state => state
)
class Dashboard extends React.Component {
  render() {
    const { type } = this.props.userReducer;
    const { pathname } = this.props.location;
    const navList = [
      {
        path: '/genius',
        text: 'BOSS',
        icon: 'boss',
        title: 'BOSS列表',
        component: Boss,
        isShow: type === 'genius'
      },
      {
        path: '/boss',
        text: '牛人',
        icon: 'genius',
        title: '牛人列表',
        component: Genius,
        isShow: type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
        isShow: true
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User,
        isShow: true
      }
    ]
    return (
      <div className="wrapper">
        <div style={{ position: 'fixed', top: 0, width: '100%' }}>
          <Header data={{ navList, pathname }} />
          <Switch>
            {
              navList.map((item, index) => (<Route key={index} path={item.path} component={item.component} exact />))
            }
          </Switch>
        </div>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <NavlinkBar data={navList} />
        </div>
      </div>
    );
  }
}

export default Dashboard;

function Header(props) {
  const { data: { navList, pathname } } = props;
  const dom = navList.find(v => v.path === pathname);
  return (
    <NavBar mode="dark" >{dom ? dom.title : null}</NavBar>
  )
}