import React, {useContext, useEffect, useState} from 'react';
import './Menu.css';
import {ProcessContext} from '../context/ProcessContext';
import {GameContext} from '../context/GameContext';
import getGames from '../google/sheets/store';

export function Waiting() {
  return (
    <div className='overlay game-overlay'>
      <section className='menu-body col-lg-4 col-md-4 col-sm-6 col-xs-12'>
        <h1>Waiting for your teammate...</h1>
        <div className="loader"></div>
      </section>
    </div>
  );
}

export function WaitingComponent() {
  const {opponentSelect, setOpponentSelect} = useContext(ProcessContext);
  const {gameID, gameInfo, setGameInfo} = useContext(GameContext);
  const [delay, setDelay] = useState(10000);

  useEffect(() => {
    const checkOpponentSelection = async () => {
      try {
        console.log('Trying to fetch data from opponent...');
        const games = await getGames();
        const game = games[gameID];
        const selection = gameInfo.isCurrentUserOwner ? game?.select_2 : game?.select_1;
        if (selection) {
          setGameInfo((prev) => ({
            ...prev,
            user_1: game.user_1,
            user_2: game.user_2,
            select_1: game.select_1,
            select_2: game.select_2,
          }));
          setOpponentSelect(true);
        } else {
          console.log('Delay, ms', delay);
          setTimeout(checkOpponentSelection, delay);
          setDelay((prev) => (prev < 80000 ? prev * 2 : 10000));
        }
      } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
      }
    };

    // Start checking for picture selection
    if (!opponentSelect) {
      checkOpponentSelection();
    }
  }, []);

  return opponentSelect ? <></> : <Waiting/>;
}
