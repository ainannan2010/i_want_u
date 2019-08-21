import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatUserReducer';
import UserCard from '../../component/userCard/UserCard';

@connect(
  state => state,
  { getUserList }
)
class Boss extends React.Component {
  componentDidMount() {
    const type = 'boss';
    this.props.getUserList(type);
  }
  render() {
    const { chatUserReducer: { userlist } } = this.props;
    return (
      <div className="wapper">
        <UserCard userlist={userlist} />
      </div>
    );
  }
}

export default Boss;
