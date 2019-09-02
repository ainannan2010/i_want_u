import React from 'react';
import './Logo.css';

class Logo extends React.Component {
  render() {
    return (
      <div className="LogoWrapper">
        <img
          className="logoStyle"
          src={require('../../image/logo.png')}
          alt=""
        />
      </div>
    );
  }
}

export default Logo;
