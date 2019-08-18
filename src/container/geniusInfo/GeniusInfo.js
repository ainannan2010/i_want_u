import React from 'react';
import { connect } from 'react-redux';
import { NavBar, InputItem, TextareaItem, Button, List } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../../component/avatarSelector/AvatarSelector'
import { update } from '../../redux/userReducer'

@connect(
  ({ userReducer }) => ({ userReducer }),
  { update }
)
class GeniusInfo extends React.Component {
  state = {}

  _handelChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }
  _update = () => {
    this.props.update(this.state);
  }
  render() {
    const { userReducer: {redirectTo} } = this.props;
    return (
      <div className="wapper">
        {redirectTo ? <Redirect to={redirectTo}></Redirect>: null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <List>
          <AvatarSelector
            onSelectedAvatar={this._handelChange}
          />
          <InputItem onChange={e => this._handelChange('title', e)}>求职岗位</InputItem>
          {/* <InputItem onChange={e => this._handelChange('money', e)}>职位薪资</InputItem> */}
          <TextareaItem
            onChange={e => this._handelChange('desc', e)}
            rows={3}
            autoheihgt="true"
            title='个人简介'
          />
          <Button type='primary' onClick={this._update}>保存</Button>
        </List>

      </div>
    );
  }
}

export default GeniusInfo;
