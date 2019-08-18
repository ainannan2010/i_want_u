import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/userReducer'

@withRouter
@connect(
  null,
  { loadData }
)
class AuthRoute extends React.Component {
  state = {
    publicList: ['./login', '/register']
  }
  _hasLogined = () => {
    const { publicList } = this.state;
    const { pathname } = this.props.location;
    
    if(publicList.includes(pathname)) {
      return null;
    }
  }
  componentDidMount() {
    this._hasLogined();
    // 判断用户是否登陆
    axios.get('/user/info').then(res => {
      if(res.status === 200) {
        if (res.data.code === 0) {
          this.props.loadData(res.data.data);
        } else {
          this.props.history.push('/login');
        }
      }
    })
  }
  render() {
    return (
      <div className="wrapper" />
    );
  }
}

export default AuthRoute;
