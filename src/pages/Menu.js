import React from 'react';
import './Menu.css';

export default function Menu() {
  return (
    <div className='overlay'>
      <section className='menu-body col-lg-4 col-md-4 col-sm-6 col-xs-12'>
        <h1>Select option</h1>
        <button className='menu-button'>New Game</button>
        <button className='menu-button'>Join Game</button>
        <input type='text' required/>
        <h1>Select Set</h1>
        <div className='select-set'>
          <button className='select-set-button'>Set 1</button>
          <button className='select-set-button'>Set 2</button>
          <button className='select-set-button'>Set 3</button>
          <button className='select-set-button'>Set 4</button>
          <button className='select-set-button'>Set 5</button>
          <button className='select-set-button'>Set 6</button>
          <button className='select-set-button'>Set 7</button>
        </div>
      </section>
    </div>
  );
}
