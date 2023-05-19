import './Game.css';
import React, {useContext, useEffect} from 'react';
import GameSet from '../components/GameSet';
import GamePanel from '../components/GamePanel';
import {GameContext} from '../context/GameContext';
import {ProcessContext} from '../context/ProcessContext';
import {WaitingComponent} from './Waiting';

export default function Game() {
  const {gameInfo} = useContext(GameContext);
  const {
    userSelect,
    opponentSelect,
    setUserSelect,
    setOpponentSelect,
  } = useContext(ProcessContext);
  useEffect(() => {
    if (gameInfo.select_1) {
            gameInfo.isCurrentUserOwner ? setUserSelect(true) : setOpponentSelect(true);
    }
    if (gameInfo.select_2) {
            gameInfo.isCurrentUserOwner ? setOpponentSelect(true) : setUserSelect(true);
    }
  }, []);
  return (
    <main className='container'>
      {userSelect && !opponentSelect && <WaitingComponent/>}
      <GameSet/>
      <GamePanel/>
    </main>
  );
}
