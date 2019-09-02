import React from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
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
    isShowEmoji: false,
    isSend: false
  }
  contentRef = React.createRef()
  componentDidMount() {
    if (!this.props.chatReducer.chatmsg.length) {
      this.props.getMsglist();
      this.props.recvMsg();
    }
    // this.handleScroll()
  }
  handleScroll = () => {
    const dom = this.contentRef.current;

    if (dom.scrollHeight > dom.clientHeight) {
      setTimeout(function () {
        dom.scrollTop = dom.scrollHeight;
      }, 100);
    }

    setTimeout(function () {
      //设置滚动条到最底部
      dom.scrollTop = dom.scrollHeight;
    }, 500);
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
    if (this.state.text) {
      if (this.state.text.trim()) {
        this.props.sendMsg({ from, to, msg });
        this.setState({ text: '', isSend: false })
      } else {
        this.setState({ text: '', isSend: false })
      }
    }
    this.handleScroll()
  }

  _showEmoji = () => {
    this.setState({ isShowEmoji: !this.state.isShowEmoji });
    this._handleFixedCarousel();
    this.handleScroll();
  }

  _handleChange = (v, w) => {
    if (v) {
      this.setState({ text: v, isSend: true })
    } else {
      this.setState({ text: v, isSend: false })
    }
  }

  _selectedEmoji = (v) => {
    const { text } = this.state;
    this.setState({ text: text + v.text });
  }

  render() {
    const { chatReducer: { chatmsg, users }, match, userReducer } = this.props;
    const { emoji, isShowEmoji, isSend } = this.state;
    const otherID = match.params.user;
    if (!users[otherID]) return null;
    const chatid = getChatId(userReducer._id, otherID);
    const chatmsgs = chatmsg.filter(v => v.chatid === chatid);
    const styles = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
    return (
      <div id="chat-page" style={styles}>
        <NavBar
          mode='dark'
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[otherID].name}
        </NavBar>
        <div
          style={{ flex: 1, overflow: 'auto' }}
          ref={this.contentRef}
        >
          <QueueAnim
            delay={100}
            type="top"
          >
            {
              chatmsgs.map((v, i) => {
                const avatar = require(`../../image/${users[v.from].avatar}.png`)
                return (
                  <List key={v._id}>
                    {
                      v.from === otherID ?
                        <List.Item thumb={avatar} wrap={true}>{v.content}</List.Item>
                        :
                        <List.Item
                          className="chat-me"
                          extra={<img src={avatar} alt="" />}
                          wrap={true}
                        >{v.content}</List.Item>
                    }
                  </List>
                )
              })
            }
          </QueueAnim>
        </div>
        <div>
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={this._handleChange}
              ref={e => this.aaaref = e}
              extra={
                <div>
                  <span onClick={this._showEmoji}>😀</span>
                  <span onClick={this._submit} style={isSend ? { color: 'black' } : { color: '#aaa' }}>发送</span>
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
