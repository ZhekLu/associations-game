import React from 'react';
import picture from '../images/rose-grass-400x400.jpg';

export default function GameCard() {
  return (
    <article className='game-card col-lg-2 col-md-2 col-sm-2 col-xs-5'>
      <img className='card-image' src={picture} alt='card'/>
      <h4 className='card-content'>Content</h4>
    </article>
  );
}
