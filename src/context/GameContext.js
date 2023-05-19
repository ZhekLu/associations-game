import React, {createContext, useContext, useState} from 'react';

export const GameContext = createContext({
  gameID: undefined,
  setGameID: undefined,
  gameSet: undefined,
  setGameSet: undefined,
  gameInfo: {
    user_1: undefined,
    user_2: undefined,
    select_1: undefined,
    select_2: undefined,
    isNew: undefined,
    isExists: undefined,
    isCurrentUserOwner: undefined,
  },
  setGameInfo: undefined,
  gameIsReady: undefined,
  setGameIsReady: undefined,
});

export const GameProvider = ({children}) => {
  const [gameID, setGameID] = useState(undefined);
  const [gameSet, setGameSet] = useState(undefined);
  const [gameIsReady, setGameIsReady] = useState(false);
  const [gameInfo, setGameInfo] = useState({
    user_1: undefined,
    user_2: undefined,
    select_1: undefined,
    select_2: undefined,
    isNew: undefined,
    isExists: undefined,
    isCurrentUserOwner: undefined,
  });

  const contextValue = {
    gameID, setGameID,
    gameSet, setGameSet,
    gameInfo, setGameInfo,
    gameIsReady, setGameIsReady,
  };

  return <GameContext.Provider value={contextValue}>
    {children}
  </GameContext.Provider>;
};

export const dropGameFromContext = (setGameID, setGameSet, setGameInfo, setGameIsReady) => {
  setGameID(undefined);
  setGameSet(undefined);
  setGameInfo({
    user_1: undefined,
    user_2: undefined,
    select_1: undefined,
    select_2: undefined,
    isNew: undefined,
    isExists: undefined,
    isCurrentUserOwner: undefined,
  });
  setGameIsReady(undefined);
};
