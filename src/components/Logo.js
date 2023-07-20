import React from 'react';
import logo from '../images/logo.png';
import {backToMenu} from '../services/navigation';

export default function Logo() {
  return (
    <button
      className='logo col-lg-6 col-md-6 col-sm-2 col-xs-3'
      onClick={() => backToMenu()}
    >
      <img src={logo} alt='logo'/>
    </button>
  );
}
