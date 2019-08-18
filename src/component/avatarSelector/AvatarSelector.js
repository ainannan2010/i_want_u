import React from 'react';
// import { connect } from 'react-redux';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
  static propTypes = {
    onSelectedAvatar: PropTypes.func.isRequired,
  }
  state = {
    avatarString: 'boy,girl,man,woman,mouse,bull,tiger,rabbit,dragon,snake,horse,goat,monkey,chichen,dog,pig,lion,hippo,dolphin,null',
    iconElt: {}
  }
  _handleClick = (elt) => {
    this.setState({ iconElt: elt });
    this.props.onSelectedAvatar('avatar', elt.text)
  }

  render() {
    const { avatarString, iconElt } = this.state;
    const avatarList = avatarString.split(',').map(v => ({
      icon: require(`../../image/${v}.png`),
      text: v
    }))
    const gridHeader = iconElt.icon ?
      <div style={{ display: 'flex', alginItem: 'center', height: 20 }}>
        <span>已选择头像</span>
        <img style={{ width: 20, marginLeft: 5  }} src={iconElt.icon} alt="" />
      </div>
      : '请选择头像';

    return (
      <div className="wapper">
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={e => this._handleClick(e)}
          />
        </List>

      </div>
    );
  }
}

export default AvatarSelector;
