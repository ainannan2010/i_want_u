import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatUserReducer';
import UserCard from '../../component/userCard/UserCard';
@connect(
  state => state,
  { getUserList }
)
class Genius extends React.Component {
  componentDidMount() {
    const type = 'genius';
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

export default Genius;
