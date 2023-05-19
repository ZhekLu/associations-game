import React, {useContext, useEffect} from 'react';
import {dropGameFromContext, GameContext} from './GameContext';
import {dropGameProcess, ProcessContext} from './ProcessContext';

export const CleanContexts = () => {
  const {setGameIsReady} = useContext(GameContext);
  const {setUserSelect, setUserVoice, setOpponentSelect, setCurrentSelectedCard} = useContext(ProcessContext);
  useEffect(() => {
    setGameIsReady(false);
    dropGameProcess(setUserSelect, setUserVoice, setOpponentSelect, setCurrentSelectedCard);
  });

  return <></>;
};
