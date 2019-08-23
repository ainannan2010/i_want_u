import React from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
const { Header, Body } = Card;
@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  _handleClick = (v) => {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    const { userlist } = this.props;
    return (
      <div className="wapper">
        <WingBlank>
          <WhiteSpace />
          {
            userlist.reverse().map((item, index) => (
              <Card
                key={index}
                onClick={() => this._handleClick(item)}
              >
                {
                  item.avatar ? <Header
                    title={item.user}
                    thumb={require(`../../image/${item.avatar}.png`)}
                    extra={<span>{item.title}</span>}
                    thumbStyle={{ height: 40, width: 40 }}
                  /> : null
                }
                <Body>
                  {item.company ? <div>公司名称: {item.company}</div> : null}
                  {item.desc ? item.desc.split('\n').map((v, i) => <div key={i}>{v}</div>) : null}
                  {item.money ? <div>薪资: {item.money}</div> : null}
                </Body>
              </Card>
            ))
          }
        </WingBlank>
      </div>
    );
  }
}

export default UserCard;
