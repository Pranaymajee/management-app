import React from 'react'
import './Header.css';
// import hrlogo from './images/highradius-logo.png';

const Header = () => {
  return (
    <div className='header'>
        <div className='logo-box'>
            <img className='abclogo' src={require("./images/abc-logo.png")} alt="" />
            <h2 className='logo-text'>ABC Product</h2>
        </div>
        <img className='hrlogo' src={require("./images/highradius-logo.png")} alt="" />
    </div>
  )
}

export default Header;