import React from 'react';
import logo from '../images/logo.png';

export default function Logo() {
  return (
    <button className='logo col-lg-6 col-md-6 col-sm-2 col-xs-3'>
      <img src={logo} alt='logo'/>
    </button>
  );
}
