import './Game.css';
import React, {useContext, useEffect, useState} from 'react';
import GameSet from '../components/GameSet';
import GamePanel from '../components/GamePanel';
import {GameContext} from '../context/GameContext';
import {ProcessContext} from '../context/ProcessContext';
import {WaitingComponent} from './Waiting';
import {updateGame} from '../google/sheets/game';
import {getUser} from '../google/auth/user';

export default function Game() {
  const {gameID, gameSet, gameInfo, setGameInfo} = useContext(GameContext);
  const {
    userSelect,
    opponentSelect,
    setUserSelect,
    setOpponentSelect,
  } = useContext(ProcessContext);
  const [isRecovered, setIsRecovered] = useState(undefined);

  useEffect(() => {
    const userSelectIsSet =
            !!(gameInfo.isCurrentUserOwner && gameInfo.select_1 ||
                !gameInfo.isCurrentUserOwner && gameInfo.select_2);
    const opponentSelectIsSet =
            !!(gameInfo.isCurrentUserOwner && gameInfo.select_2 ||
                !gameInfo.isCurrentUserOwner && gameInfo.select_1);
    setUserSelect(userSelectIsSet);
    setIsRecovered(userSelectIsSet);
    setOpponentSelect(opponentSelectIsSet);
  }, []);

  useEffect(() => {
    if (isRecovered === false && userSelect) {
      const user = getUser();
      const updatedUserInfo = gameInfo.isCurrentUserOwner ?
                {user_1: user.email} :
                {user_2: user.email};
      updateGame(gameID, gameSet, {...gameInfo, ...updatedUserInfo}).then(
          () => console.log('Game is updated.'),
      );
      setGameInfo((prev) => ({
        ...prev,
        updatedUserInfo,
      }));
    }
  }, [userSelect, isRecovered]);

  return (
    <main className='container'>
      {userSelect && !opponentSelect && <WaitingComponent/>}
      <GameSet/>
      <GamePanel/>
    </main>
  );
}
