import './Game.css';
import React from 'react';
import GameSet from '../components/GameSet';
import GamePanel from '../components/GamePanel';

export default function Game() {
  return (
    <main className='container'>
      <GameSet/>
      <GamePanel/>
    </main>
  );
}
