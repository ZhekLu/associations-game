import React, {useContext, useEffect, useState} from 'react';
import GameCard from './GameCard';
import {GameContext} from '../context/GameContext';

export default function GameSet() {
  const [cards, setCards] = useState([]);
  const {gameID, gameSet, gameInfo, setGameInfo} = useContext(GameContext);

  useEffect(() => {
    const cardsList = Array.from({length: 20}, (_, index) => (
      <GameCard
        gameID={gameID}
        setID={gameSet}
        cardID={index + 1}
        selectCard={selectCard}
        key={index + 1}
      />
    ));
    setCards(cardsList);
  }, [gameID, gameSet]);

  const selectCard = (cardID) => {
    const selectionInfo = {};
    if (gameInfo.isCurrentUserOwner) {
      selectionInfo.select_1 = cardID;
    } else {
      selectionInfo.select_2 = cardID;
    }
    setGameInfo((prev) => ({
      ...prev,
      ...selectionInfo,
    }));
  };

  return (
    <section className='gallery col-lg-9 col-md-9 col-sm-12 col-xs-12'>
      <div className='row'>
        {cards}
      </div>
    </section>
  );
}
