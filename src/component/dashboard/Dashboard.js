import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { Route } from 'react-router-dom';
import NavlinkBar from '../../component/navlink/NavlinkBar';
import Boss from '../../component/boss/Boss';
import Genius from '../../component/genius/Genius';
import User from '../../component/user/User';
import Msg from '../../component/msg/Msg';
import { getMsglist, recvMsg } from '../../redux/chatReducer';
@connect(
  state => state,
  { getMsglist, recvMsg }
)
class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.chatReducer.chatmsg.length) {
      this.props.getMsglist();
      this.props.recvMsg();
    }
  }
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
    const page = navList.find(v => v.path === pathname)
    if (!page) return null;
    return (
      <div className="wrapper">
        <div style={{ position: 'fixed', top: 0, width: '100%' }}>
          <Header data={{ navList, pathname }} />
          <QueueAnim
            type="right"
          >
            <Route key={page.path} path={page.path} component={page.component} />
          </QueueAnim>
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