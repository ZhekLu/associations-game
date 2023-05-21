import React from 'react';
import PropTypes from 'prop-types';

import winImage from '../images/success-icon.png';
import loseImage from '../images/lose-icon.png';
import {backToMenu} from '../services/navigation';

export default function GameResult({isWin}) {
  const header = isWin ? 'Great!' : 'Ooops';
  const content = isWin ?
        'It seems that you easily guess people\'s thoughts' :
        'You don\'t guess, but you\'ll definitely make it next time';
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
          onClick={() => {
            backToMenu();
          }}
        > Back to menu
        </button>
      </section>
    </section>
  );
}

GameResult.propTypes = {
  isWin: PropTypes.bool.isRequired,
};
