import React, {useState} from 'react';
import logo from '../images/logo.png';
import {CleanContexts} from '../context/manager';

export default function Logo() {
  const [backToMenu, setBackToMenu] = useState(false);

  if (backToMenu) {
    return <CleanContexts/>;
  }
  return (
    <button
      className='logo col-lg-6 col-md-6 col-sm-2 col-xs-3'
      onClick={() => setBackToMenu(true)}
    >
      <img src={logo} alt='logo'/>
    </button>
  );
}
