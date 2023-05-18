import React, {useContext} from 'react';
import Logo from './Logo';
import notSelectedPicture from '../images/unknown.jpg';
import copyIcon from '../images/copy-icon.png';
import selectIcon from '../images/select-icon.png';
import {GameContext} from '../context/GameContext';

export default function GamePanel() {
  const {gameID} = useContext(GameContext);

  return (
    <nav className='panel col-lg-3 col-md-3 col-sm-12 col-xs-12'>
      <Logo/>
      {/* Selected card view*/}
      <article
        className='game-card selected col-lg-6 col-md-6 col-sm-2'
      >
        <img className='card-image'
          src={notSelectedPicture}
          alt='selected-card'
        />
        <h4 className='card-content'>Content</h4>
      </article>

      {/* Control buttons*/}
      <section className='panel-buttons col-lg-6 col-md-6 col-sm-3 col-xs-3'>
        <button className='icon-button' onClick={() => {
          navigator.clipboard.writeText(gameID)
              .then(() => console.log('Copied!'));
        }}>
          <img src={copyIcon} alt='copy'/>
        </button>
        <button className='icon-button'>
          <img src={selectIcon} alt='select'/>
        </button>
      </section>

      {/* Game code*/}
      <section className='game-code col-lg-6 col-md-6 col-sm-3 col-xs-3'>
        <code>{gameID}</code>
      </section>
    </nav>
  );
}
