import './Game.css';
import React from 'react';
import GameSet from '../components/GameSet';

export default function Game() {
  return (
    <main className='container'>
      <GameSet/>
      <section className='panel col-lg-3 col-md-3 col-sm-12 col-xs-12'>
                Panel
      </section>
    </main>
  );
}
