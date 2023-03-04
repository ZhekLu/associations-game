import React from 'react';
import picture from '../images/rose-grass-400x400.jpg';
import selectIcon from '../images/check.png';
import removeIcon from '../images/cross.png';

export default function GameCard() {
  return (<article className='game-card col-lg-2 col-md-2 col-sm-2 col-xs-5'>
    <div className='card-cover'>
      <div className='card-front'>
        <img className='card-image' src={picture} alt='card'/>
        <h4 className='card-content'>Content</h4>
      </div>
      <div className='card-back'>
        <button className='icon-button'>
          <img src={removeIcon} alt='Remove card'/>
        </button>
        <button className='icon-button'>
          <img src={selectIcon} alt='Select card'/>
        </button>
      </div>
    </div>
  </article>);
}
