import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(
  state => state
)
class Msg extends React.Component {
  getLast = arr => arr[arr.length - 1];

  render() {
    const { chatReducer: { chatmsg, users }, userReducer } = this.props;
    const msgGroup = {}
    chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup)
      .sort((a, b) => {
        const a_last = this.getLast(a).create_time;
        const b_last = this.getLast(b).create_time;
        return b_last - a_last;
      });
    const userid = userReducer._id;
    if (!userid && !users[userid]) return null;
    return (
      <div className="wrapper">
        <List>
          {
            chatList.map((item, i) => {
              const lastItem = this.getLast(item);
              const name = users[lastItem.from].name;
              const avatar = require(`../../image/${users[lastItem.from].avatar}.png`);
              const unreadNum = item.filter(v => !v.read && v.to === userid).length;
              const goId = lastItem.from === userid ? lastItem.to : lastItem.from
              return (
                <List.Item
                  key={i}
                  thumb={avatar}
                  extra={<Badge text={unreadNum}></Badge>}
                  arrow="horizontal"
                  onClick={() => this.props.history.push(`/chat/${goId}`)}
                >
                  {lastItem.content}
                  <List.Item.Brief style={{ fontSize: 14 }}>{name}</List.Item.Brief>
                </List.Item>
              )
            })
          }
        </List>
      </div>
    );
  }
}

export default Msg;
