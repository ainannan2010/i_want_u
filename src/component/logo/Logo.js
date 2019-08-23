import React from 'react';
import './Logo.css';
import logoImg from '../../image/logo.png';

class Logo extends React.Component {
  render() {
    return (
      <div className="LogoWrapper">
        <img
          className="logoStyle"
          src={logoImg}
          alt=""
        />
      </div>
    );
  }
}

export default Logo;
