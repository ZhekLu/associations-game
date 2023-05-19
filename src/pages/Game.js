import './Game.css';
import React, {useContext, useEffect, useState} from 'react';
import GameSet from '../components/GameSet';
import GamePanel from '../components/GamePanel';
import {GameContext} from '../context/GameContext';
import {ProcessContext} from '../context/ProcessContext';
import {WaitingComponent} from './Waiting';
import {updateGame} from '../google/sheets/game';
import {getUser} from '../google/auth/user';
import GameResult from '../components/GameResult';

export default function Game() {
  const {gameID, gameSet, gameInfo, setGameInfo} = useContext(GameContext);
  const {
    userSelect,
    opponentSelect,
    setUserSelect,
    setOpponentSelect,
    userVoice,
  } = useContext(ProcessContext);

  const [isRecovered, setIsRecovered] = useState(undefined);
  const [gameResult, setGameResult] = useState(
      {ended: false, win: undefined},
  );

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

  useEffect(() => {
    // check if user is won
    if (userVoice) {
      const opponentChoice = Number(gameInfo.isCurrentUserOwner ?
                gameInfo.select_2 :
                gameInfo.select_1);
      console.log('Check win', gameInfo, opponentChoice, userVoice);
      setGameResult({ended: true, win: userVoice === opponentChoice});
    }
  }, [userVoice]);

  return (
    <main className='container'>
      {userSelect && !opponentSelect && <WaitingComponent/>}
      {gameResult.ended ? <GameResult isWin={gameResult.win}/> : <GameSet/>}
      <GamePanel/>
    </main>
  );
}
