import React, {createContext, useContext, useState} from 'react';

export const ProcessContext = createContext({
  userSelect: undefined,
  setUserSelect: undefined,
  opponentSelect: undefined,
  setOpponentSelect: undefined,
  currentSelectedCard: undefined,
  setCurrentSelectedCard: undefined,
  userVoice: undefined,
  setUserVoice: undefined,
});

export const ProcessProvider = ({children}) => {
  const [userSelect, setUserSelect] = useState(false);
  const [opponentSelect, setOpponentSelect] = useState(false);
  const [currentSelectedCard, setCurrentSelectedCard] = useState(undefined);
  const [userVoice, setUserVoice] = useState(undefined);

  const contextValue = {
    userSelect, setUserSelect,
    opponentSelect, setOpponentSelect,
    currentSelectedCard, setCurrentSelectedCard,
    userVoice, setUserVoice,
  };

  return <ProcessContext.Provider value={contextValue}>
    {children}
  </ProcessContext.Provider>;
};


export const dropGameProcess = (setUserSelect, setUserVoice, setOpponentSelect, setCurrentSelectedCard) => {
  setUserSelect(undefined);
  setUserVoice(undefined);
  setOpponentSelect(undefined);
  setCurrentSelectedCard(undefined);
};
