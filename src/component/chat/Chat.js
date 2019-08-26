import React from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsglist, sendMsg, recvMsg, readMsg } from '../../redux/chatReducer';
import { getChatId } from '../../util';
@connect(
  state => state,
  { getMsglist, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
  state = {
    text: '',
    emoji: '😀 😫 😘 😍 😘 🥰 😂 🥳 😝 🤭 😱 😥 😯 🙁 😎 🤯 😴 😖 😈 🐮 🙈 🐪 🦜 🐳 🐠 🐙 🐸 🐇 🍉 🍇 🍌 🍒 🥜 🍆 🌶️ 🌻 🌞 🍱 💩 🏁 🇧🇭 🇧🇯 🇨🇳'.split(' ').filter(v => v).map(i => ({ text: i })),
    isShowEmoji: false
  }
  componentDidMount() {
    if (!this.props.chatReducer.chatmsg.length) {
      this.props.getMsglist();
      this.props.recvMsg();
    }
  }
  componentWillUnmount() {
    const { user } = this.props.match.params;
    // 更新已读信息
    this.props.readMsg(user)
  }
  _handleFixedCarousel = () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }
  _submit = () => {
    const { userReducer, match } = this.props;
    const from = userReducer._id;
    const to = match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({ text: '' })
  }
  _showEmoji = () => {
    this.setState({ isShowEmoji: !this.state.isShowEmoji });
    this._handleFixedCarousel();
  }

  _selectedEmoji = (v) => {
    const { text } = this.state;
    this.setState({ text: text + v.text });
  }

  render() {
    const { chatReducer: { chatmsg, users }, match, userReducer } = this.props;
    const { emoji, isShowEmoji } = this.state;
    const otherID = match.params.user;
    if (!users[otherID]) return null;
    const chatid = getChatId(userReducer._id, otherID);
    const chatmsgs = chatmsg.filter(v => v.chatid === chatid);
    return (
      <div id="chat-page">
        <NavBar
          mode='dark'
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[otherID].name}
        </NavBar>
        {
          chatmsgs.map((v, i) => {
            const avatar = require(`../../image/${users[v.from].avatar}.png`)
            return (
              <List key={i}>
                {
                  v.from === otherID ?
                    <List.Item thumb={avatar} >{v.content}</List.Item>
                    :
                    <List.Item
                      className="chat-me"
                      extra={<img src={avatar} />}
                    >{v.content}</List.Item>
                }
              </List>
            )
          })
        }
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => this.setState({ text: v })}
              extra={
                <div>
                  <span onClick={this._showEmoji}>😀</span>
                  <span onClick={this._submit}>发送</span>
                </div>
              }
            />
          </List>
          {
            isShowEmoji ?
              <Grid
                data={emoji}
                columnNum={9}
                isCarousel={true}
                carouselMaxRow={3}
                onClick={this._selectedEmoji}
              />
              : null
          }

        </div>
      </div>
    );
  }
}

export default Chat;
