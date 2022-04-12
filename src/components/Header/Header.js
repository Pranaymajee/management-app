import React from 'react'
import './Header.css';
import abc from "./images/abc.svg";
// import hrlogo from './images/highradius-logo.png';

const Header = () => {
  return (
    <div className='header'>
        <img className='abclogo' src={abc} alt="" />
        <img className='hrlogo' src={require("./images/highradius-logo.png")} alt="" />
    </div>
  )
}

export default Header;