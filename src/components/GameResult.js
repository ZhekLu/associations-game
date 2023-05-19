import React, {useState} from 'react';
import PropTypes from 'prop-types';

import winImage from '../images/success-icon.png';
import loseImage from '../images/lose-icon.png';
import {CleanContexts} from '../context/manager';

export default function GameResult({isWin}) {
  const [backToMenu, setBackToMenu] = useState(false);
  const header = isWin ? 'Great!' : 'Ooops';
  const content = isWin ?
        'It seems that you easily guess people\'s thoughts' :
        'You don\'t guess, but you\'ll definitely make it next time';
  if (backToMenu) {
    return <CleanContexts/>;
  }
  return (
    <section
      className='gallery game-result col-lg-9 col-md-9 col-sm-12 col-xs-12'
    >
      <section className='menu-body col-lg-4 col-md-4 col-sm-6 col-xs-12'>
        <img className=''
          src={isWin ? winImage : loseImage}
          alt='game-result'
        />
        <h1>{header}</h1>
        <p className='menu-body-text'>{content}</p>
        <button
          className='menu-button'
          onClick={() => setBackToMenu(true)}
        > Back to menu
        </button>
      </section>
    </section>
  );
}

GameResult.propTypes = {
  isWin: PropTypes.bool.isRequired,
};
