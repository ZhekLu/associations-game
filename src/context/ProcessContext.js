import React, {createContext, useState} from 'react';

export const ProcessContext = createContext({
  userSelect: undefined,
  setUserSelect: undefined,
  opponentSelect: undefined,
  setOpponentSelect: undefined,
  currentSelectedCard: undefined,
  setCurrentSelectedCard: undefined,
});

export const ProcessProvider = ({children}) => {
  const [userSelect, setUserSelect] = useState(false);
  const [opponentSelect, setOpponentSelect] = useState(false);
  const [currentSelectedCard, setCurrentSelectedCard] = useState(undefined);

  const contextValue = {
    userSelect, setUserSelect,
    opponentSelect, setOpponentSelect,
    currentSelectedCard, setCurrentSelectedCard,
  };

  return <ProcessContext.Provider value={contextValue}>
    {children}
  </ProcessContext.Provider>;
};
