import React from 'react';
import Proptypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
@connect(
  state => state
)
@withRouter
class NavlinkBar extends React.Component {
  static propTypes = {
    data: Proptypes.array.isRequired
  }
  render() {
    const { pathname } = this.props.location;
    const { data, chatReducer: { unread } } = this.props;
    const navList = data.filter(v => v.isShow);
    return (
      <div className="wrapper">
        <TabBar>
          {
            navList.map((item) => (
              <TabBar.Item
                badge={item.path === '/msg' ? unread : 0}
                title={item.text}
                key={item.title}
                icon={{
                  uri: require(`../../image/tabbar/${item.icon}.png`)
                }}
                selectedIcon={{
                  uri: require(`../../image/tabbar/${item.icon}-active.png`)
                }}
                selected={pathname === item.path}
                onPress={() => this.props.history.push(item.path)}
              >
              </TabBar.Item>
            ))
          }
        </TabBar>
      </div>
    );
  }
}

export default NavlinkBar;
